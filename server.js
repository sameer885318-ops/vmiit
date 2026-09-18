import dotenv from "dotenv";

dotenv.config();


import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authroutes.js";
import courseRoutes from "./routes/courseroutes.js";


const app = express();

const PORT = process.env.PORT || 3000;


// ==========================================
// DATABASE
// ==========================================

await connectDB();


// ==========================================
// __dirname
// ==========================================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// PUBLIC
// ==========================================

const publicPath = path.join(
    __dirname,
    "public"
);

app.use(express.static(publicPath));


// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/courses",
    courseRoutes
);


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            publicPath,
            "index.html"
        )
    );

});


// ==========================================
// LOGIN
// ==========================================

app.get("/login", (req, res) => {

    res.sendFile(
        path.join(
            publicPath,
            "login.html"
        )
    );

});


// ==========================================
// ADMIN
// ==========================================

app.get("/admin", (req, res) => {

    res.sendFile(
        path.join(
            publicPath,
            "admin.html"
        )
    );

});


// ==========================================
// TEST
// ==========================================

app.get("/api/test", (req, res) => {

    res.json({
        success: true,
        message: "VMIIT server is working"
    });

});


// ==========================================
// 404
// ==========================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});


// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});
