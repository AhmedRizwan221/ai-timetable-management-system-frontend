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

const initialState = {
    departments: [],
    status: 'idle',
    error: null
}

const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {
        createDepartment: (state, action) => {
            state.departments.push(action.payload.department);
        },
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
            });
    },
});

export const { createDepartment, deleteDepartment, updateDepartment, setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;