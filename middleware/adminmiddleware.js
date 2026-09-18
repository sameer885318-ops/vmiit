const adminOnly = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({
            success: false,
            message: "Please login first"
        });

    }


    if (req.user.role !== "course_admin") {

        return res.status(403).json({
            success: false,
            message: "Access denied. Course Admin only."
        });

    }


    next();

};


export {
    adminOnly
};
