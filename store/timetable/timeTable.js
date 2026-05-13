import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create time table 
export const createTimeTable = createAsyncThunk(
    "timetable/create",
    async ({ batchId, semesterId, sectionId = null, departmentId, facultyId, createdBy, status, breakStartTime, breakEndTime }, { rejectWithValue }) => {
        // console.log(batchId, semesterId, sectionId, departmentId, facultyId);
        try {
            const response = await axios.post('http://localhost:8000/api/v1/timetables/create',
                { batchId, semesterId, sectionId, departmentId, facultyId, createdBy, status, breakStartTime, breakEndTime },
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
    async ({ deptId, page, limit }, { rejectWithValue }) => {
        // console.log(deptId, page, limit);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/${deptId}/timetables`, {
                params: {
                    page,
                    limit,
                    sortBy: "createdAt",
                    sortType: "desc"
                },
                withCredentials: true
            },
            );
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            // console.log(error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// update time table
export const updateTimeTable = createAsyncThunk(
    "timetable/update",
    async ({ timetableId, data }, { rejectWithValue }) => {
        // console.log("Time table id",timetableId);
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/timetables/update/${timetableId}`, data, {
                withCredentials: true
            });

            // console.log(response.data.data);
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

// get all timetables without pagination in department 
export const allTimetabels = createAsyncThunk(
    "timetable/allTimeTables",
    async (deptId, { rejectWithValue }) => {
        // console.log(deptId);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/all/${deptId}`, {
                withCredentials: true
            },
            );
            // console.log(response.data.data);
            return response.data.data.timetables;
        } catch (error) {
            // console.log(error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all timetables of faculty
export const getAllApproveAndUnapprovTimetablesOfFaculty = createAsyncThunk(
    "timetable/getAllTimeTablesOfFaculty",
    async ({ facultyId, page, limit }, { rejectWithValue }) => {
        // console.log(facultyId, page, limit);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/faculty/${facultyId}/timetables`, {
                params: {
                    page,
                    limit,
                    sortBy: "createdAt",
                    sortType: "desc"
                },
                withCredentials: true
            },
            );
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// approve timetable 
export const approveTimetable = createAsyncThunk(
    "timetable/approve",
    async ({ timetableId, data }, { rejectWithValue }) => {

        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/timetables/${timetableId}/approve`, data,
                { withCredentials: true }
            );
            // console.log(response.data.data);
            return response.data.data.timetable
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


// reject time table 
export const rejectTimetable = createAsyncThunk(
    "timetable/reject",
    async ({ timetableId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/timetables/${timetableId}/reject`, data, {
                withCredentials: true
            });
            // console.log(response.data.data);
            return response.data.data.timetable
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get single timetable 
export const getTimeTableById = createAsyncThunk(
    "timetabel/getTimetable",
    async (timetableId, { rejectWithValue }) => {
        // console.log("Redux slice console :", timetableId);
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/timetables/${timetableId}`);
            // console.log(response.data.data);
            return response.data.data.timetable
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)



const initialState = {
    timeTables: [],
    error: null,
    status: "idle",
    totalTimeTables: 0,
    loading: false,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false

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
                state.status = 'Succeeded';

                const index = state.timeTables.findIndex(t => t._id === action.payload._id);

                if (index !== -1) {
                    // If it exists, update it in place
                    state.timeTables[index] = action.payload;
                } else {
                    // If it's truly a brand new timetable, add it
                    state.timeTables.push(action.payload);
                }
            })
            .addCase(createTimeTable.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getDeptallTimeTables.pending, (state) => {
                state.status = 'Pending',
                    state.loading = true
            })
            .addCase(getDeptallTimeTables.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.loading = false;
                state.timeTables = action.payload.timetables;
                state.totalTimeTables = action.payload.totalTimeTables;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage

            })
            .addCase(getDeptallTimeTables.rejected, (state, action) => {
                state.status = 'Failed',
                    state.loading = false,
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
            .addCase(allTimetabels.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(allTimetabels.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.timeTables = action.payload
            })
            .addCase(allTimetabels.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(getAllApproveAndUnapprovTimetablesOfFaculty.pending, (state) => {
                state.status = 'Pending',
                    state.loading = true
            })
            .addCase(getAllApproveAndUnapprovTimetablesOfFaculty.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.loading = false;
                state.timeTables = action.payload.allTimeTables;
                state.totalTimeTables = action.payload.totalTimeTables;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(getAllApproveAndUnapprovTimetablesOfFaculty.rejected, (state, action) => {
                state.status = 'Failed',
                    state.loading = false,
                    state.error = action.payload
            })
            .addCase(approveTimetable.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(approveTimetable.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.timeTables = state.timeTables.map((timetable) =>
                    timetable._id === action.payload._id ? action.payload : timetable
                )
            })
            .addCase(approveTimetable.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(rejectTimetable.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(rejectTimetable.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.timeTables = state.timeTables.map((timetable) =>
                    timetable._id === action.payload._id ? action.payload : timetable
                )
            })
            .addCase(rejectTimetable.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(getTimeTableById.pending, (state) => {
                state.status = 'Pending'
            })
            .addCase(getTimeTableById.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.timeTables = action.payload;
            })
            .addCase(getTimeTableById.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })

    }
})


export const { clearError } = timetableSlice.actions;
export default timetableSlice.reducer;