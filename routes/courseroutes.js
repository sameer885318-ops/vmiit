import express from "express";

import {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
} from "../controllers/coursecontrolls.js";

import { protect } from "../middleware/authMiddleware.js";

import { adminOnly } from "../middleware/adminMiddleware.js";


const router = express.Router();


// ==========================================
// PUBLIC
// ==========================================

// Get all courses
router.get("/", getCourses);


// ==========================================
// COURSE ADMIN ONLY
// ==========================================

// Add course
router.post(
    "/",
    protect,
    adminOnly,
    addCourse
);


// Edit course
router.put(
    "/:id",
    protect,
    adminOnly,
    updateCourse
);


// Delete course
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCourse
);


export default router;
