import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch deans 
export const getDeans = createAsyncThunk(
    "user/deans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/deans',
                { withCredentials: true }
            );
            // console.log(response);
            // console.log(response.data.data.totalDeans);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch chairmans
export const getChairmans = createAsyncThunk(
    "user/chairmans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/chairmans',
                { withCredentials: true }
            );
            // console.log(response);
            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch all teachers in department
export const getAllTeachersInDept = createAsyncThunk(
    "user/getAllTeachersInDept",
    async (deptId, { rejectWithValue }) => {
        try {
            console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/users/${deptId}/teachers`,
                { withCredentials: true }
            );

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// update user credentials 
export const updateUserData = createAsyncThunk(
    "user/updateUser",
    async ({ role, id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/users/update/${role}/${id}`, data,
                { withCredentials: true }
            );
            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete user by it's id
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            console.log(id)
            const response = await axios.delete(`http://localhost:8000/api/v1/users/delete-user/${id}`, {
                withCredentials: true
            });
            // console.log(response);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all teachers 
export const getTeachers = createAsyncThunk(
    "user/teachers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/teachers', {
                withCredentials: true
            });

            // console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    deans: [],
    chairmans: [],
    teachers: [],
    totalDeans: null,
    totalChairmans: null,
    totalTeachers: null,
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
                    state.deans = action.payload.deans,
                    state.totalDeans = action.payload.totalDeans
            })
            .addCase(getDeans.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(getChairmans.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getChairmans.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.chairmans = action.payload.chairmans,
                    state.totalChairmans = action.payload.totalChairmans
            })
            .addCase(getChairmans.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                // for dean
                const index = state.deans.findIndex(
                    dean => dean._id === action.payload._id
                );
                if (index !== -1) {
                    state.deans[index] = action.payload;
                }
                // for chairman
                const index2 = state.chairmans.findIndex(
                    chairman => chairman._id === action.payload._id
                );
                if (index2 !== -1) {
                    state.chairmans[index] = action.payload;
                }
                // for teacher 
                const index3 = state.teachers.findIndex(
                    teacher => teacher._id === action.payload._id
                );
                if (index3 !== -1) {
                    state.teachers[index] = action.payload;
                }

            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const id = action.payload;
                state.deans = state.deans.filter((dean) => dean._id !== id);
                state.chairmans = state.chairmans.filter((chair) => chair._id !== id);
                state.teachers = state.teachers.filter((teach) => teach._id !== id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getTeachers.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.teachers = action.payload.teachers,
                    state.totalTeachers = action.payload.totalTeachers
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllTeachersInDept.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllTeachersInDept.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.teachers = action.payload.teachersInDept.teachers,
                    state.totalTeachers = action.payload.TotalTeachersInDept
            })
            .addCase(getAllTeachersInDept.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })

    }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;