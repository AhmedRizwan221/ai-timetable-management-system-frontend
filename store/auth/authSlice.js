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
            console.log("Respons", response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// forget password
export const forgetPassword = createAsyncThunk(
    "user/forgetPassword",
    async (email, { rejectWithValue }) => {
        console.log(email);
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/forget-password", email, {
                withCredentials: true
            });

            console.log(response.data.data);

            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

// reset password
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async ({ password, token }, { rejectWithValue }) => {
        console.log(password, token);
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/users/reset-password/${token}`,
                {password},
                {
                    withCredentials: true
                });

            console.log(response.data.data);

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
    faculty: null,
    message:""
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
                const user = action.payload;
                state.user = user;
                state.department = user?.department;
                state.faculty = user?.faculty;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.user = null;
                state.error = action.payload;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.status = 'Succeeded';
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.message
            })
             .addCase(resetPassword.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.message = action.payload.message

            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.message
            })
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;