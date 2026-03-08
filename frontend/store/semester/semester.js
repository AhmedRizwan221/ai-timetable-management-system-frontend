import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create semester 
export const createSemester = createAsyncThunk(
    "semester/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/semesters/create`, data, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get semesters 
export const getSemesters = createAsyncThunk(
    "semester/getSemesters",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/semesters/getAllSemester/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.findAllSemesters
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
const initialState = {
    semesters: [],
    error: null,
    status: "idle"
}

const semesterSlice = createSlice({
    name: "semester",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSemesters.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getSemesters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.semesters = action.payload
            })
            .addCase(getSemesters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = semesterSlice.actions;
export default semesterSlice.reducer;