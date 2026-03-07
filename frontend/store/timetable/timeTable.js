import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create time table 
export const createTimeTable = createAsyncThunk(
    "timetable/create",
    async ({ batchId, semesterId, sectionId }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/timetables/create',
                { batchId, semesterId, sectionId },
                { withCredentials: true }
            );
            // console.log(response.data.data);
            return response.data.data._id

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get departments All timetables 
export const getDeptallTimeTables = createAsyncThunk(
    "timetable/all-timetables",
    async (deptId, { rejectWithValue }) => {
        console.log("dept Id", deptId);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/${deptId}`, {
                withCredentials: true
            });
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)



const initialState = {
    timeTables: [],
    error: null,
    status: "idle"
}

const timetableSlice = createSlice({
    name: "timetable",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDeptallTimeTables.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(getDeptallTimeTables.fulfilled, (state, action) => {
                state.status = 'Succeeded',
                    state.timeTables = action.payload
            })
            .addCase(getDeptallTimeTables.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
          
    }
})


export const { clearError } = timetableSlice.actions;
export default timetableSlice.reducer;