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

            // console.log(response.data.data);

            return {
                userMessage: message,
                botMessage: response.data.data
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue(
                error.response?.data.message || error.message
            );
        }
    }
)

// send user query 
export const userQuery = createAsyncThunk(
    "chatbot/sendQuery",
    async (message, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/query/', { message });
            // console.log(response.data.data.executeQuery);
            return {
                userMessage: message,
                response: response.data.data.executeQuery.slots,
                timetable: response.data.data.executeQuery.timetable,
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue(
                error.response?.data.message || error.message
            );
        }
    }
)

// get all slots of teacher 
export const getAllSlotsOfTeacher = createAsyncThunk(
    "chatbot/allSlotsTeacher",
    async (message, { rejectWithValue }) => {
        try {
            // console.log(message);
            const response = await axios.post("http://localhost:8000/api/v1/query/teacher-slots", { message }, {
                withCredentials: true
            });

            // console.log(response.data.data);
            return response.data.data.executeQuery
        } catch (error) {
            return rejectWithValue(
                error.response?.data.message || error.message
            );
        }
    }
)

const initialState = {
    messages: [],
    timetableSlots: [],
    timetable: [],
    error: '',
    loading: false,
    status: 'idle',
    teacherSlots: [],
    totalTeacherSlots: null

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
        },
        addBotSuccessMessage: (state, action) => {
            state.messages.push({
                sender: "bot",
                text: action.payload.message,
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
                console.log(action.payload);
                state.error = action.payload;
            })
            .addCase(userQuery.pending, (state) => {
                state.status = 'pending',
                    state.loading = true
            })
            .addCase(userQuery.fulfilled, (state, action) => {
                state.status = 'succeded';
                state.loading = false;
                state.timetableSlots = action.payload.response;
                state.timetable = action.payload.timetable;

                const timetable = action.payload.timetable;
                const successMessage =
                    `${timetable?.department?.deptName || "Unknown"} timetable for semester ${timetable?.semester?.semesterNumber || "?"} year ${timetable?.semester?.studyYear || "?"} batch ${timetable?.batch?.batchName || "?"} fetched successfully`;
                // console.log(successMessage);

                state.messages.push({
                    sender: "bot",
                    text: successMessage
                })
            })
            .addCase(userQuery.rejected, (state, action) => {
                state.status = 'rejected',
                    state.loading = false,
                    state.error = action.payload;

                state.messages.push({
                    sender: "bot",
                    type: "error",
                    text: action.payload
                })
            })
            .addCase(getAllSlotsOfTeacher.pending, (state) => {
                state.status = 'pending',
                    state.loading = true
            })
            .addCase(getAllSlotsOfTeacher.fulfilled, (state, action) => {
                state.status = 'succeed',
                    state.loading = false;
                state.teacherSlots = action.payload.teacherSlots;
                state.totalTeacherSlots = action.payload.totalSlots;


                const successMessage = `Teacher slots fetched successfully`;
                state.messages.push({
                    sender: "bot",
                    text: successMessage
                })
            })
            .addCase(getAllSlotsOfTeacher.rejected, (state, action) => {
                state.status = 'rejected',
                    state.loading = false,
                    state.error = action.payload;

                state.messages.push({
                    sender: "bot",
                    type: "error",
                    text: action.payload
                })
            })
    }
})


export const { clearError, clearMessages, addUserMessage, addBotSuccessMessage } = chatbotSlice.actions;

export default chatbotSlice.reducer;