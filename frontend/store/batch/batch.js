import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create semester 
export const createBatch = createAsyncThunk(
    "batch/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/batches/create`, data, { withCredentials: true });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get semesters 
export const getBatches = createAsyncThunk(
    "batch/getBatches",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/batches/allBatches/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
const initialState = {
    batches: [],
    error: null,
    status: "idle"
}

const batchSlice = createSlice({
    name: "batch",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBatches.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getBatches.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.batches = action.payload
            })
            .addCase(getBatches.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = batchSlice.actions;
export default batchSlice.reducer;