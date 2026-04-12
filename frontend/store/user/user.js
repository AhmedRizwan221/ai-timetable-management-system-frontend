import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch deans 
export const getDeans = createAsyncThunk(
    "user/deans",
    async ({ page, limit } = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/deans',
                {
                    params: {
                        page,
                        limit,
                        sortBy: "createdAt",
                        sortType: "desc"
                    },
                    withCredentials: true
                }
            );
            console.log(response.data.data);
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
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/users/${deptId}/teachers`,
                { withCredentials: true }
            );

            // console.log(response.data.data);

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

// get all teachres in faculty
export const getAllTeachersInFaculty = createAsyncThunk(
    "user/getAllTeachersInFacutly",
    async (facultyId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/faculty/${facultyId}/teachers`,
                { withCredentials: true }
            );

            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all faculty chairmans
export const getAllChairmansInFaculty = createAsyncThunk(
    "user/getAllChairmansInFacutly",
    async ({ facultyId, page, limit }, { rejectWithValue }) => {
        try {
            // console.log(facultyId);
            const response = await axios.get(`http://localhost:8000/api/v1/users/faculty/${facultyId}/chairmans`,
                {
                    params: {
                        page,
                        limit,
                        sortBy: "createdAt",
                        sortType: "desc"
                    },
                    withCredentials: true
                }
            );

            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get chairmans count in faculty
export const getAllChairmansCountInFaculty = createAsyncThunk(
    "user/totalChairmans",
    async (facultyId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/totalChairmans/${facultyId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.totalChairmans
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all deans 
export const getAlDeans = createAsyncThunk(
    "user/getAllDeans",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/users/allDeans", { withCredentials: true });

            // console.log(response.data.data)

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get all teachers in dept with pagination
export const allTeachersInDept = createAsyncThunk(
    "user/allTeachers",
    async ({ deptId, page, limit }, { rejectWithValue }) => {
        // console.log(deptId, page, limit);
        try {
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/users/department/${deptId}/teachers`,
                {
                    params: {
                        page,
                        limit,
                        sortBy: "createdAt",
                        sortType: "desc"
                    },
                    withCredentials: true
                }
            );

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
    error: null,
    loading: false,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
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
                    state.totalDeans = action.payload.totalDeans,
                    // pagination data
                    state.totalPages = action.payload.pagination.totalPages,
                    state.currentPage = action.payload.pagination.currentPage,
                    state.limit = action.payload.pagination.limit,
                    state.hasNextPage = action.payload.pagination.hasNextPage,
                    state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(getDeans.rejected, (state, action) => {
                state.status = 'Failed',
                    state.error = action.payload
            })
            // get all deans without pagination
            .addCase(getAlDeans.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAlDeans.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.deans = action.payload.allDeans
            })
            .addCase(getAlDeans.rejected, (state, action) => {
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
                    state.teachers = action.payload.teachersInDept,
                    state.totalTeachers = action.payload.TotalTeachersInDept
            })
            .addCase(getAllTeachersInDept.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllTeachersInFaculty.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllTeachersInFaculty.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.teachers = action.payload.teachersInFaculty,
                    state.totalTeachers = action.payload.TotalTeachersInFaculty
            })
            .addCase(getAllTeachersInFaculty.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getAllChairmansInFaculty.pending, (state) => {
                state.status = 'pending';
                state.loading = true
            })
            .addCase(getAllChairmansInFaculty.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.loading = false,
                    state.chairmans = action.payload.chairmansInFaculty,
                    state.totalChairmans = action.payload.TotalChairmansInFaculty,
                    // pagination data
                    state.totalPages = action.payload.pagination.totalPages,
                    state.currentPage = action.payload.pagination.currentPage,
                    state.limit = action.payload.pagination.limit,
                    state.hasNextPage = action.payload.pagination.hasNextPage,
                    state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(getAllChairmansInFaculty.rejected, (state, action) => {
                state.status = 'rejected',
                    state.loading = false,
                    state.error = action.payload
            })
            .addCase(getAllChairmansCountInFaculty.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getAllChairmansCountInFaculty.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.totalChairmans = action.payload
            })
            .addCase(getAllChairmansCountInFaculty.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(allTeachersInDept.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(allTeachersInDept.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.teachers = action.payload.teachersInDept;
                state.totalTeachers = action.payload.totalTeachersInDept;

                // pagination
                state.currentPage = action.payload.pagination.currentPage;
                state.limit = action.payload.pagination.limit;
                state.totalPages = action.payload.pagination.totalPages;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage
            })
            .addCase(allTeachersInDept.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })

    }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;