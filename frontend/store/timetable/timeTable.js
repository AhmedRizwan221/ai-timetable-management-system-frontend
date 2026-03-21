import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create time table 
export const createTimeTable = createAsyncThunk(
    "timetable/create",
    async ({ batchId, semesterId, sectionId = null, departmentId }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/timetables/create',
                { batchId, semesterId, sectionId, departmentId },
                { withCredentials: true }
            );
            // console.log(response.data.data.createdTimeTable);
            return response.data.data.createdTimeTable

        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get departments All timetables 
export const getDeptallTimeTables = createAsyncThunk(
    "timetable/all-timetables",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/${deptId}`, {
                withCredentials: true
            });
            // console.log(response.data.data.timetables);
            return response.data.data.timetables;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// update time table
export const updateTimeTable = createAsyncThunk(
    "timetable/update",
    async ({timetableId, data}, { rejectWithValue }) => {
        // console.log("Time table id",timetableId);
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/timetables/update/${timetableId}`,data, {
                withCredentials: true
            });

            console.log(response.data.data);
            return response.data.data.updatedTimeTable
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete time table by id
export const deleteTimeTable = createAsyncThunk(
    "timetable/delete",
    async (timetableId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/timetables/delete/${timetableId}`, {
                withCredentials: true
            });
            // console.log("return id ",response.data.data._id);
            return timetableId
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
            .addCase(createTimeTable.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createTimeTable.fulfilled, (state, action) => {
                state.status = 'Succeeded',
                    state.timeTables.push(action.payload)
            })
            .addCase(createTimeTable.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
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
            .addCase(deleteTimeTable.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(deleteTimeTable.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                const id = action.payload;
                state.timeTables = state.timeTables.filter((timetable) => timetable._id !== id)
            })
            .addCase(deleteTimeTable.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(updateTimeTable.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(updateTimeTable.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.timeTables = state.timeTables.map((timetable) =>
                    timetable._id === action.payload._id ? action.payload : timetable
                )
            })
            .addCase(updateTimeTable.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })

    }
})


export const { clearError } = timetableSlice.actions;
export default timetableSlice.reducer;