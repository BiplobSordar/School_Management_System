const isAdmin = (req, res, next) => {
    try {
        if (!req.id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // await userExis

        if (req.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        next();
    } catch (error) {
       return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export default isAdmin