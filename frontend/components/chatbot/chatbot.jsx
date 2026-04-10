import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, Bot, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    sendChatMessages,
    addUserMessage
} from "../../store/chatbot/chatbot";

const ChatBot = ({ role, onClose }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { messages, loading, error } = useSelector(
        (state) => state.chatbot
    );

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input.trim();

        // show user message instantly
        dispatch(addUserMessage(userMessage));

        // send API request
        dispatch(
            sendChatMessages({
                message: userMessage,
                role
            })
        );

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);


    return (
        <div className="fixed bottom-5 right-5 w-[380px] h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-[#1D293D] text-white rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <Bot size={20} />
                    <h2 className="font-semibold">
                        UniTime Assistant 🤖
                    </h2>
                </div>

                {onClose && (
                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
            )}
            {error?.status === 429 && (
                <p className="text-red-500">
                    Free quota ended. Please upgrade or try later.
                </p>
            )}

            {error?.status === 503 && (
                <p className="text-yellow-500">
                    Server is busy right now.
                </p>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 && (
                    <div className="text-sm text-gray-500">
                        ` 👋 Hello! Ask me how to navigate the system.`
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${msg.sender === "user"
                                ? "bg-[#1D293D] text-white"
                                : "bg-white border"
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                {msg.sender === "bot" ? (
                                    <Bot size={16} className="mt-1" />
                                ) : (
                                    <User size={16} className="mt-1" />
                                )}

                                <div>
                                    <p>{msg.text}</p>

                                    {msg.navigation && (
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    msg.navigation.path
                                                )
                                            }
                                            className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                        >
                                            {msg.navigation.label}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Loader */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border px-4 py-3 rounded-2xl shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white rounded-b-2xl">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Ask something..."
                        className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-[#1D293D] text-white p-2 rounded-xl hover:bg-[#162131]"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;