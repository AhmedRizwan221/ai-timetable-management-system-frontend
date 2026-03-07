import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./dept/departmentSlice";
import facultyReducer from "./faculty/facultySlice";
import userReducer from "./user/user";
import timetableReducer from "./timetable/timeTable";
import semesterReducer from "./semester/semester";
import batchReducer from "./batch/batch";
import sectionReducer from "./section/section";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        department: departmentReducer,
        faculty: facultyReducer,
        user: userReducer,
        timetable: timetableReducer,
        semester: semesterReducer,
        batch: batchReducer,
        section: sectionReducer
    }
})