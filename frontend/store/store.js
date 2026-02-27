import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./dept/departmentSlice";
import facultyReducer from "./faculty/facultySlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        department: departmentReducer,
        faculty: facultyReducer
    }
})