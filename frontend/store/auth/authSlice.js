import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

// login user 
export const userLogin = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', data, {
                withCredentials: true
            });

            // console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


export const getUser = createAsyncThunk(
    "user/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/current-user',
                { withCredentials: true }
            );
            // console.log("Thunk console: ", response.data.data);
            // return {
            //     ...response.data.data,
            //     faculty: response.data.data.faculty
            // }
            // console.log("Respons", response);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    user: null,
    status: "idle",
    error: null,
    department: null,
    faculty: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = true;
        },
        logout: (state) => {
            state.user = null;
            state.status = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.user = action.payload.user
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                const user = action.payload.data;
                state.user = user;
                state.department = user?.department;
                state.faculty = user?.faculty;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.user = null;
                state.error = action.payload;
            })
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;