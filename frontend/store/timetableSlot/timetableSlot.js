import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// create timetableslot 
export const createTimeTableSlot = createAsyncThunk(
    "timetableSlot/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/timetableSlots/create', data, {
                withCredentials: true
            });

            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    timeTableSlot: [],
    error: null,
    status: "idle"
}


const timeTableSLotSLice = createSlice({
    name: "timetableSlot",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTimeTableSlot.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(createTimeTableSlot.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.timeTableSlot.push(action.payload)
        })
        .addCase(createTimeTableSlot.rejected, (state, action) => {
            state.status = 'rejected',
            state.error = action.payload
        })
    }
}
)


export const { clearError } = timeTableSLotSLice.actions;
export default timeTableSLotSLice.reducer;