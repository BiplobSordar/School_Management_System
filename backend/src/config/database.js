import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// pool.connect()
//   .then(() => console.log("✅ Connected to PostgreSQL") ,pool.release())
//   .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

// export default pool;



export const query = async (querytext, queryvalue) => {
  const db = await pool.connect();  // Use await to get the client

  try {
    const result = await db.query(querytext, queryvalue);  // Fixed typo in `resutl` to `result`
    return result;
  } catch (error) {
    console.error("Database query error", { query: querytext, params: queryvalue });  // Fixed reference to querytext and queryvalue
    throw error;
  } finally {
    db.release();  // Release the connection after the query is done
  }
};
