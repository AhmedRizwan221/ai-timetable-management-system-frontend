import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";


export const getUser = createAsyncThunk(
    "user/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/current-user',
                { withCredentials: true }
            );
            console.log("Thunk console: ",response.data.data);
            // return {
            //     ...response.data.data,
            //     faculty: response.data.data.faculty
            // }
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    user: null,
    status: "idle",
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = true;
            // console.log(state.user);
        },
        logout: (state) => {
            state.user = null;
            state.status = false;
        }
    },
    extraReducers: (builder) => {
       builder
            .addCase(getUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                // console.log("Action Payload :", action.payload);
                console.log("Clean State before update:", current(state));
                state.user = {...action.payload};
                console.log("Clean State after update:", current(state));
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed";
                state.user= null;
                state.error = action.payload;
            }) 
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;