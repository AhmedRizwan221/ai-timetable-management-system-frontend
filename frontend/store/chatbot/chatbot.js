import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const sendChatMessages = createAsyncThunk(
    "chatbot/sendMessages",
    async ({ message, role }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/chatbot/',
                { message, role },
                { withCredentials: true }
            );

            console.log(response.data.data);

            return {
                userMessage: message,
                botMessage: response.data.data
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
)

const initialState = {
    messages: [],
    error: '',
    loading: false
}


const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.messages = [];
        },
        clearError: (state) => {
            state.error = null;
        },
        addUserMessage: (state, action) => {
            state.messages.push({
                sender: "user",
                text: action.payload
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendChatMessages.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(sendChatMessages.fulfilled, (state, action) => {
                state.loading = false;

                state.messages.push({
                    sender: "bot",
                    text: action.payload.botMessage.content,
                    navigation: action.payload.botMessage.navigation
                });
            })
            .addCase(sendChatMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})


export const { clearError, clearMessages, addUserMessage } = chatbotSlice.actions;

export default chatbotSlice.reducer;