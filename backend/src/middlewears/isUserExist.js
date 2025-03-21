import { query } from "../config/database.js"; // Ensure you import your database connection

 const isUserExist = async (req, res, next) => {
    try {
        const { id:userId } = req; // Ensure userId is extracted from req (modify as needed)
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required", success: false });
        }

        const { rows } = await query(`SELECT * FROM users WHERE id = $1`, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User Not Found", success: false });
        }

        console.log(rows[0],'thsi is the adimn user')
        req.user = rows[0]; // Attach user data to req.user
        next(); // Proceed to next middleware or route handler

    } catch (error) {
        console.error("Error fetching user details:", error);
      return  res.status(500).json({ message: "Internal Server Error" });
    }
};


export default isUserExist