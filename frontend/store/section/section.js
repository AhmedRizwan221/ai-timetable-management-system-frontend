import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create section 
export const createSection = createAsyncThunk(
    "section/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/sections/create`, data, { withCredentials: true });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get sections 
export const getSections = createAsyncThunk(
    "section/getSections",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/sections/get-all-sections/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
const initialState = {
    sections: [],
    error: null,
    status: "idle"
}

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSections.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getSections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sections = action.payload
            })
            .addCase(getSections.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = sectionSlice.actions;
export default sectionSlice.reducer;