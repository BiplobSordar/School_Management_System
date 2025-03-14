import app from './app.js'
// import pool from "./src/config/database.js";

const PORT = process.env.PORT || 5000;




app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
