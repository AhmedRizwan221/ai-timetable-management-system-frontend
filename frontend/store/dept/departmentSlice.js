import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
}

const departmentSlice = createSlice({
    name: "departmentSlice",
    initialState,
    reducers: {
        createDepartment: (state, action) => {
            state.departments.push(action.payload.department);
        },
        deleteDepartment: (state, action) => {
            state.departments = state.departments.filter((dept) => dept.id !== action.payload.departmentId);
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
        }
    }
});

export const { createDepartment, deleteDepartment, updateDepartment, setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;