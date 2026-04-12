import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const departmentCreate = createAsyncThunk(
    "departments/create",
    async (deptData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/departments/create', deptData, {
                withCredentials: true
            })
            return response.data.data.createdDepartment;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch departments in faculty
export const fetchDepartments = createAsyncThunk(
    "department/fetchAllDeptFaculty",
    async ({ facultyId, page, limit }, { rejectWithValue }) => {
        try {
            // console.log(facultyId);
            const response = await axios.get(`http://localhost:8000/api/v1/departments/allDepartments/${facultyId}/departments`, {
                params: {
                    page,
                    limit,
                    sortBy: "createdAt",
                    sortType: "desc"
                }
            }, {
                withCredentials: true
            })
            // console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch all departments 
export const fetchAllDepartments = createAsyncThunk(
    "department/fetchAllDept",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/departments/allDepartments`, {
                withCredentials: true
            })
            // console.log(response.data.data.departments);
            return response.data.data.departments;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get single department 
export const getDepartment = createAsyncThunk(
    "department/singleDepartment",
    async (deptId, { rejectWithValue }) => {
        try {
            // console.log(deptId);
            const response = await axios.get(`http://localhost:8000/api/v1/departments/${deptId}`, {
                withCredentials: true
            });
            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const departmentUpdate = createAsyncThunk(
    "department/update",
    async ({ departmentId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/departments/update/${departmentId}`, data, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.updatedDepartment
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const departmentDelete = createAsyncThunk(
    "department/delete",
    async (departmentId, { rejectWithValue }) => {
        console.log(departmentId);
        try {
            await axios.delete(`http://localhost:8000/api/v1/departments/delete/${departmentId}`, {
                withCredentials: true
            });

            return departmentId
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch faculty departments without pagination
export const getFacultyDepartments = createAsyncThunk(
     "department/facultyDepartments",
    async (facultyId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/departments/facultyDepts/${facultyId}`, {
                withCredentials: true
            })
            // console.log(response.data.data);
            return response.data.data.facultyDepartments;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


const initialState = {
    departments: [],
    totalDepartments: null,
    department: null,
    teachers: [],
    courses: [],
    status: 'idle',
    error: null,

    // pagination data 
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
}

const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllDepartments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.departments = action.payload
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.departments = action.payload.facultyALlDepartments;
                state.totalDepartments = action.payload.totalDepartmentsInFaculty;
                // pagination data 
                state.totalPages = action.payload.pagination.totalPages;
                state.currentPage = action.payload.pagination.currentPage;
                state.hasNextPage = action.payload.pagination.hasNextPage;
                state.hasPrevPage = action.payload.pagination.hasPrevPage;
                state.limit = action.payload.pagination.limit

            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(departmentCreate.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(departmentCreate.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.departments.push(action.payload)
            })
            .addCase(departmentCreate.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(getDepartment.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.department = action.payload;
                state.teachers = action.payload.teacherCount;
                state.courses = action.payload.coursesCount
            })
            .addCase(getDepartment.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(departmentUpdate.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(departmentUpdate.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                const updateData = action.payload;
                state.departments = state.departments.map((dept) => dept._id === updateData._id ? updateData : dept)
            })
            .addCase(departmentUpdate.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(departmentDelete.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(departmentDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const id = action.payload;
                state.departments = state.departments.filter(dept => dept._id !== id);
            })
            .addCase(departmentDelete.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
            .addCase(getFacultyDepartments.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getFacultyDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.departments = action.payload;
            })
            .addCase(getFacultyDepartments.rejected, (state, action) => {
                state.status = 'rejected',
                    state.error = action.payload
            })
    },
});

export const { clearError } = departmentSlice.actions;
export default departmentSlice.reducer;