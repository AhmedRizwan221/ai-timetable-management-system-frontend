import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create course
export const createCourse = createAsyncThunk(
    "course/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/courses/create`, data, {
                withCredentials: true
            });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
// get all courses in semester 
export const getAllCourses = createAsyncThunk(
    "course/getall",
    async (semesterId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/courses/allCourses/${semesterId}`, {
                withCredentials: true
            });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all courses in dept 
export const getAllCoursesInDept = createAsyncThunk(
    "course/getall",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/courses/allCourses/${deptId}`, {
                withCredentials: true
            });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)



const initialState = {
    courses: [],
    error: null,
    status: "idle"
}


const courseSlice = createSlice({
    name: "courseSlice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourse.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.courses.push(action.payload)
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllCourses.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.courses = action.payload.courses
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllCoursesInDept.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllCoursesInDept.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.courses = action.payload
            })
            .addCase(getAllCoursesInDept.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
    }
})


export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;