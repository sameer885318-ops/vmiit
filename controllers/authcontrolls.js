import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admis.js";


// ==========================================
// ADMIN LOGIN
// ==========================================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Check email and password
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }


        // Find admin
        const admin = await Admin.findOne({
            email: email.toLowerCase().trim()
        });


        // Admin not found
        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // Check active status
        if (!admin.isActive) {

            return res.status(403).json({
                success: false,
                message: "Admin account is inactive"
            });

        }


        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );


        if (!isPasswordCorrect) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // Create JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Login success
        res.json({
            success: true,
            message: "Login successful",

            token,

            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });


    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ==========================================
// EXPORT
// ==========================================

export {
    login
};
