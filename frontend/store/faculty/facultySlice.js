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
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/faculties/all-faculties', {
                withCredentials: true
            })
            // console.log(response);
            return response.data.data.faculties
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
            await axios.delete(`http://localhost:8000/api/v1/faculties/delete/${facultyId}`, {withCredentials: true});

            return facultyId

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    faculties: [],
    status: 'idle',
    error: null
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
            })
            .addCase(fetchFaculties.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.faculties = action.payload;  // store data here
            })
            .addCase(fetchFaculties.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
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