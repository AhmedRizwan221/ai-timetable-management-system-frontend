import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create batch 
export const createBatch = createAsyncThunk(
    "batch/create",
    async (data, { rejectWithValue }) => {
        // console.log("data for batch", data);
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/batches/create`, data, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get batches in dept 
export const getBatches = createAsyncThunk(
    "batch/getBatches",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/batches/allBatches/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.batches
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete batch
export const deleteBatch = createAsyncThunk(
    "batch/delete",
    async (batchId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/batches/delete/${deptId}`, {
                withCredentials: true
            });

            return batchId;
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
            .addCase(createBatch.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createBatch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.batches.push(action.payload)
            })
            .addCase(createBatch.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
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
            .addCase(deleteBatch.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteBatch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.batches = state.batches.filter((batch) => (
                    batch._id !== action.payload)
                )
            })
            .addCase(deleteBatch.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = batchSlice.actions;
export default batchSlice.reducer;