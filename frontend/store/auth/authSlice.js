import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem('token');

const initialState = {
    user: null,
    token: tokenFromStorage || null,
    status: tokenFromStorage ? true : false
}  

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status  = true;

            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = false;

            localStorage.removeItem("token");
        }
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;