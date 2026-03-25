import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create section 
export const createSection = createAsyncThunk(
    "section/create",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:8000/api/v1/sections/create', data, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.createdSection
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// get sections 
export const getSections = createAsyncThunk(
    "section/getSections",
    async (deptId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/sections/get-all-sections/${deptId}`, { withCredentials: true });

            // console.log(response.data.data);

            return response.data.data.departments
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// delete section
export const deleteSection = createAsyncThunk(
    "section/delete",
    async (sectionId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/sections/delete/${sectionId}`, {
                withCredentials: true
            });

            return sectionId
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// update section
export const updateSection = createAsyncThunk(
    "section/update",
    async ({ sectionId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/sections/update/${sectionId}`, data, {
                withCredentials: true
            });

            // console.log(response.data.data);

            return response.data.data.updatedSection
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const initialState = {
    sections: [],
    error: null,
    status: "idle"
}

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSection.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(createSection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.sections.findIndex(t => t._id === action.payload);
                if(index !== -1) {
                    state.sections[index] = action.payload
                }else {
                    state.sections.push(action.payload)
                }
            })
            .addCase(createSection.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(getSections.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getSections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sections = action.payload
            })
            .addCase(getSections.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(deleteSection.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(deleteSection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sections = state.sections.filter((section) => section._id !== action.payload)
            })
            .addCase(deleteSection.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(updateSection.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(updateSection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updateData = action.payload;
                state.sections = state.sections.map((section) => section._id === updateData._id ? updateData : section);
            })
            .addCase(updateSection.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })

    }
}
)

export const { clearError } = sectionSlice.actions;
export default sectionSlice.reducer;