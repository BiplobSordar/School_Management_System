import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";


// Routes imported here 
import authRoute from "./src/routes/authRoute.js";
import adminRoute from "./src/routes/adminRoute.js";
import cookieParser from "cookie-parser";
import isAuthenticated from "./src/middlewears/isAuthenticated.js";
import isAdmin from "./src/middlewears/isAdmin.js";
import isUserExist from "./src/middlewears/isUserExist.js";





dotenv.config();
const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true
  }

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser())



app.use('/api/v1/auth',authRoute)
app.use('/api/v1/admin',isAuthenticated,isAdmin,isUserExist,adminRoute)

app.get("/", (req, res) => res.send("Welcome to the SMS API"));

export default app;
