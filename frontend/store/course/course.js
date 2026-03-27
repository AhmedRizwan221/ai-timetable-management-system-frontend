import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create course
export const createCourse = createAsyncThunk(
    "course/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/courses/create', data, {
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

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all courses in dept 
export const getAllCoursesInDept = createAsyncThunk(
    "course/getallCourse",
    async (deptId, { rejectWithValue }) => {
        try {
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/courses/all-courses/${deptId}`, {
                withCredentials: true
            });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all courses in faculty
export const getAllCoursesInFaculty = createAsyncThunk(
    "course/getallCoursesInFaculty",
    async (facultyId, { rejectWithValue }) => {
        try {
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/courses/faculty/${facultyId}/courses`, {
                withCredentials: true
            });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete course 
export const deleteCourse = createAsyncThunk(
    "course/delete",
    async (courseId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/courses/delete/${courseId}`, { withCredentials: true });

            return courseId
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


const initialState = {
    courses: [],
    totalCourses: null,
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
                    state.courses.push(action.payload.createdCourse)
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
                    state.courses = action.payload.courses
                state.totalCourses = action.payload.totalCourses
            })
            .addCase(getAllCoursesInDept.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(deleteCourse.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const id = action.payload;
                state.courses = state.courses.filter((course) => course._id !== id)
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllCoursesInFaculty.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllCoursesInFaculty.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.courses = action.payload.courses
                state.totalCourses = action.payload.totalCourses
            })
            .addCase(getAllCoursesInFaculty.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
    }
})


export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;