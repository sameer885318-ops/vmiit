import Course from "../models/Course.js";


// ==========================================
// GET ALL COURSES
// ==========================================

const getCourses = async (req, res) => {

    try {

        const courses = await Course.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            courses
        });

    } catch (error) {

        console.error("Get Courses Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get courses"
        });

    }

};


// ==========================================
// ADD COURSE
// ==========================================

const addCourse = async (req, res) => {

    try {

        const {
            title,
            description,
            duration,
            fee,
            image
        } = req.body;


        if (
            !title ||
            !description ||
            !duration ||
            fee === undefined
        ) {

            return res.status(400).json({
                success: false,
                message: "Title, description, duration and fee are required"
            });

        }


        const course = await Course.create({
            title,
            description,
            duration,
            fee,
            image: image || ""
        });


        res.status(201).json({
            success: true,
            message: "Course added successfully",
            course
        });


    } catch (error) {

        console.error("Add Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add course"
        });

    }

};


// ==========================================
// UPDATE COURSE
// ==========================================

const updateCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found"
            });

        }


        res.json({
            success: true,
            message: "Course updated successfully",
            course
        });


    } catch (error) {

        console.error("Update Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update course"
        });

    }

};


// ==========================================
// DELETE COURSE
// ==========================================

const deleteCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndDelete(
            req.params.id
        );


        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found"
            });

        }


        res.json({
            success: true,
            message: "Course deleted successfully"
        });


    } catch (error) {

        console.error("Delete Course Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete course"
        });

    }

};


// ==========================================
// EXPORT
// ==========================================

export {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse
};
