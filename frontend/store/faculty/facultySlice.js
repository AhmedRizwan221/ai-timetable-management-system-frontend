import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create faculty
export const facultyCreate = createAsyncThunk(
    "faculties/create",
    async (facultyData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/faculties/create', facultyData, {
                withCredentials: true
            })
            return response.data.data.faculties;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const fetchFaculties = createAsyncThunk(
    "faculties"
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
        createFaculty: (action, payload) => {
            state.faculties.push(action.payload.faculty)
        },
        deleteFaculty: (action, payload) => {
            state.faculties = state.faculties.filter((fact) => fact.id !== action.payload.facultyId)
        },
        updateFaculty: (action, payload) => {
            
        }
    }
})