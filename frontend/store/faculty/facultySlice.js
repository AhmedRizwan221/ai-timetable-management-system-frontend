import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create faculty
export const facultyCreate = createAsyncThunk(
    "faculties/create",
    async (facultyData, { rejectWithValue }) => {
        // console.log(facultyData);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/faculties/create', facultyData, {
                withCredentials: true
            });
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch all faculties 
export const fetchFaculties = createAsyncThunk(
    "faculties/all-faculties",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/faculties/all-faculties',
                {
                    params: {
                        page,
                        limit,
                        sortBy: "createdAt",
                        sortType: "desc"
                    }
                }, {
                withCredentials: true
            })
            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const facultyUpdate = createAsyncThunk(
    "faculties/update",
    async ({ facultyId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/faculties/update/${facultyId}`, data, {
                withCredentials: true
            });

            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete faculty
export const deleteFaculty = createAsyncThunk(
    "faculties/delete",
    async (facultyId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/faculties/delete/${facultyId}`, { withCredentials: true });

            return facultyId

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    faculties: [],
    status: 'idle',
    error: null,
    loading: false,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
}

const facultySlice = createSlice({
    name: "facultySlice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(facultyCreate.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(facultyCreate.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.faculties.push(action.payload)
            })
            .addCase(facultyCreate.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(fetchFaculties.pending, (state) => {
                state.status = "loading";
                state.loading = true
            })
            .addCase(fetchFaculties.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loading = false;
                state.faculties = action.payload.faculties;  // store data here

                  // pagination data 
                state.totalPages = action.payload.pagination.totalPages;
                state.currentPage = action.payload.pagination.currentPage;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage;
                state.limit = action.payload.pagination.limit
            })
            .addCase(fetchFaculties.rejected, (state, action) => {
                state.status = "failed";
                state.loading = false;
                state.error = action.payload.faculties;


            })
            .addCase(facultyUpdate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(facultyUpdate.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedData = action.payload;
                state.faculties = state.faculties.map((item) => item._id === updatedData ? updatedData : item);

            })
            .addCase(facultyUpdate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteFaculty.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteFaculty.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const id = action.payload;
                state.faculties = state.faculties.filter((faculty) => faculty._id !== id)
            })
            .addCase(deleteFaculty.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
    }
})

export const { clearError } = facultySlice.actions;

export default facultySlice.reducer