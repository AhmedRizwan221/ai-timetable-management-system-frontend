import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import authRoute from "./routes/authRoute.js";
import deptRoute from "./routes/deptRoutes.js";
import teacherRoute from "./routes/teacherRoute.js";
import timetableRoute from "./routes/timeTableRoute.js";


const app = express();
app.use(cookieParser())

// Middleware
app.use(cors());
app.use(express.json());

// auth routes 
app.use('/auth', authRoute);

// department route
app.use('/department', deptRoute);

// teacher ROute
app.use('/teacher', teacherRoute);

// time table route
app.use('/timetable', timetableRoute);

app.use('/user', authRoute);

export {app};