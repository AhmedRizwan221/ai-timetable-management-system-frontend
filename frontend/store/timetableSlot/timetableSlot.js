import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// create timetableslot 
export const createTimeTableSlot = createAsyncThunk(
    "timetableSlot/create",
    async (data, { rejectWithValue }) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/timetableSlots/create', data, {
                withCredentials: true
            });

            console.log(response.data.data);
            return response.data.data.createdSlot
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all time table slots
export const getAllTimeTableSlot = createAsyncThunk(
    "timetableSlot/getallSLots",
    async ({ deptId, page, limit }, { rejectWithValue }) => {
        // console.log(deptId, page, limit);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetableSlots/${deptId}/timetables`, {
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

export const deleteTimeTableSlot = createAsyncThunk(
    "timetableSlot/deleteSlot",
    async (timetableSlotId, { rejectWithValue }) => {
        try {
            console.log(timetableSlotId);
            await axios.delete(`http://localhost:8000/api/v1/timetableSlots/delete/${timetableSlotId}`, {
                withCredentials: true
            });

            return timetableSlotId
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateTimeTableSlot = createAsyncThunk(
    "timetableSlot/updateSlot",
    async ({ timetableSlotId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/timetableSlots/update${timetableSlotId}`, data, { withCredentials: true });

            console.log(response.data.data);

            return response.data.data.findTimetableSLot
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all time table slots
export const getFacultyAllTimeTableSlots = createAsyncThunk(
    "timetableSlot/getFacultySlots",
    async (facultyId, { rejectWithValue }) => {
        // console.log(facultyId);
        try {
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/timetableSlots/${facultyId}/timetableSlots`, {
                withCredentials: true
            });

            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all timeTable slots without pagination
export const getAllSlots = createAsyncThunk(
    "timetableSlot/all",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetableSlots/allSlots/${deptId}`, {
                withCredentials: true
            });

            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// guest user slots 
export const allSlotsInUni = createAsyncThunk(
    "timetableSlot/allSlots",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/timetableSlots/guestUser/timetableSlots');

            // console.log(response.data.data);
            return response.data.data.guestUserAllSlots
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    timeTableSlot: [],
    totalSlots: null,
    timeTables: [],
    error: null,
    status: "idle",
    loading: false,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
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
                state.status = 'Succeeded';

                const index = state.timeTableSlot.findIndex(t => t._id === action.payload._id);

                if (index !== -1) {
                    // If it exists, update it in place
                    state.timeTableSlot[index] = action.payload;
                } else {
                    // If it's truly a brand new timetable, add it
                    state.timeTableSlot.push(action.payload);
                }
            })
            .addCase(createTimeTableSlot.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllTimeTableSlot.pending, (state) => {
                state.status = 'pending',
                    state.loading = true
            })
            .addCase(getAllTimeTableSlot.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.loading = false,
                    state.timeTableSlot = action.payload.timetableSlot;
                state.timeTables = action.payload.timetables;
                state.totalSlots = action.payload.totaltimetableSlots;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(getAllTimeTableSlot.rejected, (state, action) => {
                state.status = 'rejected',
                    state.loading = false,
                    state.error = action.payload
            })
            .addCase(deleteTimeTableSlot.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteTimeTableSlot.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const id = action.payload;
                state.timeTableSlot = state.timeTableSlot.filter((timetable) => timetable._id !== id)
            })
            .addCase(deleteTimeTableSlot.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(updateTimeTableSlot.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updateTimeTableSlot.fulfilled, (state, action) => {
                state.status = 'succeed';
                const updateData = action.payload;
                state.timeTableSlot = state.timeTableSlot.map((slot) => slot._id === updateData._id ? updateData : slot);
            })
            .addCase(updateTimeTableSlot.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getFacultyAllTimeTableSlots.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getFacultyAllTimeTableSlots.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.timeTableSlot = action.payload.timetableSlot;
                state.totalSlots = action.payload.totaltimetableSlots;
            })
            .addCase(getFacultyAllTimeTableSlots.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllSlots.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllSlots.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.timeTableSlot = action.payload.timetableSlot;
                state.totalSlots = action.payload.totaltimetableSlots
            })
            .addCase(getAllSlots.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(allSlotsInUni.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(allSlotsInUni.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.timeTableSlot = action.payload;
            })
            .addCase(allSlotsInUni.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
    }
}
)


export const { clearError } = timeTableSLotSLice.actions;
export default timeTableSLotSLice.reducer;