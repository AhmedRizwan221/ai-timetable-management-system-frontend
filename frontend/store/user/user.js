import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create faculty
export const createFaculty = createAsyncThunk(
    "user/createFaculty",
    async(facultyData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/faculties/create', facultyData, {
                withCredentials: true
            });
            console.log(response);

            return response.data.data;
        } catch (error) {
             return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch deans 
export const getDeans = createAsyncThunk(
    "user/deans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/deans',
                { withCredentials: true }
            );
            // console.log(response);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


const initialState = {
    deans: [],
    chairman: [],
    teacher: [],
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDeans.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDeans.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.deans = action.payload
            })
            .addCase(getDeans.rejected, (state, action) => {
                state.status = 'Failed',
                state.error = action.payload
            })
    }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;