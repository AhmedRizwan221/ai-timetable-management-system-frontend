import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectmongoDB from "./DB/connection.js";
import authRoute from "./routes/authRoute.js";
import deptRoute from "./routes/deptRoutes.js";
import teacherRoute from "./routes/teacherRoute.js";
import timetableRoute from "./routes/timeTableRoute.js";

dotenv.config({
    path:"./.env"
});

const app = express();

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

// mongoDB connection 
connectmongoDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Database is connected on the PORT ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed !!", error);
})
