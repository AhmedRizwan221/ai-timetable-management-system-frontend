import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./dept/departmentSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        department: departmentReducer,
    }
})