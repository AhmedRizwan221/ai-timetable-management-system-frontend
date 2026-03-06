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

const initialState = {
    faculties: [],
    status: 'idle',
    error: null
}

const facultySlice = createSlice({
    name: "facultySlice",
    initialState,
    reducers: {
        // createFaculty: (state, action) => {
        //     state.faculties.push(action.payload.faculty)
        // },
        deleteFaculty: (state, action) => {
            state.faculties = state.faculties.filter((fact) => fact._id !== action.payload.facultyId)
        },
        updateFaculty: (state, action) => {
            const index = state.faculties.findIndex(
                (fact) => fact._id === action.payload._id
            );

            if (index !== -1) {
                state.faculties[index] = action.payload;
            }
        },
    },

    extraReducers: (builder) => {
        builder
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
            .addCase(facultyCreate.pending, (state) => {
                state.status = "loading";
            })
            .addCase(facultyCreate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.faculties.push(action.payload);
            })
            .addCase(facultyCreate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
})

export const {  deleteFaculty, updateFaculty } = facultySlice.actions;

export default facultySlice.reducer