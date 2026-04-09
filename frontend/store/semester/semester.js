import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create semester 
export const createSemester = createAsyncThunk(
    "semester/create",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axios.post(`http://localhost:8000/api/v1/semesters/create`, data, { withCredentials: true });

            console.log(response.data.data);

            return response.data.data.createdSemester
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get semesters 
export const getSemesters = createAsyncThunk(
    "semester/getSemesters",
    async ({ departmentId, page, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/semesters/getAllSemester/${departmentId}`, {
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

// update semester 
export const updateSemester = createAsyncThunk(
    "semester/update",
    async ({ semesterId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/semesters/update/${semesterId}`, data, {
                withCredentials: true
            });

            console.log(response.data.data);

            return response.data.data.updatedSemester
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete semester 
export const deleteSemester = createAsyncThunk(
    "semester/delete",
    async (semesterId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/semesters/delete/${semesterId}`, { withCredentials: true });

            return semesterId
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }

    }
)

// get semesters without pagination data
export const getAllSemesters = createAsyncThunk(
    "semester/getAll",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/semesters/semesters/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);
            return response.data.data.allSemesters
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


const initialState = {
    semesters: [],
    error: null,
    status: "idle",
    totalSemesters: 0,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
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
            .addCase(createSemester.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createSemester.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.semesters.findIndex(t => t._id === action.payload._id);

                if (index !== -1) {
                    state.semesters[index] = action.payload
                } else {
                    state.semesters.push(action.payload)
                }
            })
            .addCase(createSemester.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getSemesters.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getSemesters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.semesters = action.payload.semestersInDept;
                state.totalSemesters = action.payload.totalSemestersInDept;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage

            })
            .addCase(getSemesters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(updateSemester.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updateSemester.fulfilled, (state, action) => {
                state.status = 'succeed';
                const updateData = action.payload;
                state.semesters = state.semesters.map((sem) => sem._id === updateData._id ? updateData : sem);
            })
            .addCase(updateSemester.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(deleteSemester.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteSemester.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const id = action.payload;
                state.semesters = state.semesters.filter((sem) => sem._id !== id)
            })
            .addCase(deleteSemester.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllSemesters.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllSemesters.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.semesters = action.payload
            })
            .addCase(getAllSemesters.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })

    }
}
)

export const { clearError } = semesterSlice.actions;
export default semesterSlice.reducer;