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
    async ({ deptId, page, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/batches/allBatches/${deptId}`, {
                params: {
                    page,
                    limit,
                    sortBy: "createdAt",
                    sortType: "desc"
                },
                withCredentials: true
            });

            // console.log(response.data.data);
            return response.data.data
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
            await axios.delete(`http://localhost:8000/api/v1/batches/delete/${batchId}`, {
                withCredentials: true
            });

            return batchId;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// update batch
export const updateBatch = createAsyncThunk(
    "batch/update",
    async ({ batchId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/batches/update/${batchId}`, data, {
                withCredentials: true
            });

            // console.log(response.data.data);

            return response.data.data.updatedBatch
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const allBatches = createAsyncThunk(
     "batch/allBatches",
     async(deptId, {rejectWithValue}) => {
        // console.log(deptId);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/batches/${deptId}/batches`, {
                withCredentials: true
            });
            // console.log(response.data.data);
            return response.data.data.allBatches
        } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
        }
     }
)


const initialState = {
    batches: [],
    error: null,
    status: "idle",
    totalBatches: 0,
    loading: false,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
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
                state.status = 'pending',
                state.loading = true
            })
            .addCase(getBatches.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false;
                state.batches = action.payload.batchesInDept;
                state.totalBatches = action.payload.totalBatchesInDept;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(getBatches.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
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
            .addCase(updateBatch.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updateBatch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updateBatch = action.payload;
                state.batches = state.batches.map((batch) => batch._id === updateBatch._id ? updateBatch : batch)
            })
            .addCase(updateBatch.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
              .addCase(allBatches.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(allBatches.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.batches = action.payload
            })
            .addCase(allBatches.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = batchSlice.actions;
export default batchSlice.reducer;