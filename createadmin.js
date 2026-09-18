import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Admin from "./models/Admis.js";


const mongoURI =
    "mongodb+srv://vmiitadmin:Vmiit123456@cluster0.vnc8vcu.mongodb.net/vmiit?appName=Cluster0";


const createAdmin = async () => {

    try {

        await mongoose.connect(mongoURI);

        console.log("MongoDB connected");


        const email = "admin@vmiit.com";
        const password = "Admin@12345";


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const admin = await Admin.findOneAndUpdate(

            { email },

            {
                name: "VMIIT Admin",
                email: email,
                password: hashedPassword,
                role: "course_admin",
                isActive: true
            },

            {
                new: true,
                upsert: true
            }

        );


        console.log("Admin ready successfully");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Role:", admin.role);


        await mongoose.disconnect();

        process.exit(0);


    } catch (error) {

        console.error(
            "Admin Error:",
            error.message
        );

        process.exit(1);

    }

};


createAdmin();
