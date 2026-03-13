import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const departmentCreate = createAsyncThunk(
    "departments/create",
    async (deptData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/departments/create', deptData, {
                withCredentials: true
            })
            return response.data.data.departments;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// fetch departments in faculty
export const fetchDepartments = createAsyncThunk(
    "department/fetchAllDeptFaculty",
    async (facultyId, { rejectWithValue }) => {
        try {
            if (!facultyId) {
                return rejectWithValue("Faculty ID is required");
            }
            const response = await axios.get(`http://localhost:8000/api/v1/departments/allDepartments/${facultyId}/departments`, {
                withCredentials: true
            })
            // console.log(response.data.data.departments);
            return response.data.data.departments;
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


const initialState = {
    departments: [],
    department: null,
    teachers: [],
    courses: [],
    status: 'idle',
    error: null
}

const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {
        deleteDepartment: (state, action) => {
            state.departments = state.departments.filter((dept) => dept._id !== action.payload.departmentId);
        },
        updateDepartment: (state, action) => {
            const updateDept = action.payload.department;
            const index = state.departments.findIndex((dept) => dept._id === updateDept._id);

            if (index !== -1) {
                state.departments[index] = updateDept;
            }
        },
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
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
                state.departments = action.payload;
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
    },
});

export const { deleteDepartment, updateDepartment, setDepartments, clearError } = departmentSlice.actions;
export default departmentSlice.reducer;