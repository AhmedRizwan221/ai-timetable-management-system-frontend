import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const getUser = createAsyncThunk(
//     "user/fetch",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/v1/users/current-user',
//                 { withCredentials: true }
//             );
//             console.log(response);

//             return response.user
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// )

const initialState = {
    user: null,
    status: "idle",
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
    // extraReducers: (builder) => {
    //    builder
    //         .addCase(getDeans.pending, (state) => {
    //             state.deanStatus = "loading";
    //         })
    //         .addCase(getDeans.fulfilled, (state, action) => {
    //             state.deanStatus = "succeeded";
    //             state.deans = action.payload;
    //         })
    //         .addCase(getDeans.rejected, (state, action) => {
    //             state.deanStatus = "failed";
    //             state.error = action.payload;
    //         }) 
    // }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;