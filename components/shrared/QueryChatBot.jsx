import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, clearError, userQuery } from "../../store/chatbot/chatbot.js";
import {
    Send,
    Bot,
    User,
    MessageCircle,
    ChevronDown
} from "lucide-react";

export default function QueryChatBot() {
    const dispatch = useDispatch();
    // const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const { messages, loading, error, timetableSlots } = useSelector((state) => state.chatbot);
    // console.log(timetableSlots);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    const handleSend = () => {
        try {
            if (!input.trim()) return;

            const userMessage = input.trim();
            console.log(userMessage);
            dispatch(userQuery(userMessage));
            dispatch(addUserMessage(userMessage));
            setInput("");
        } catch (error) {
            setError(error)
        }

    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    return (
        <div>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-[#1D293D] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all z-50"
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[90vw] md:w-[380px] h-[520px] bg-white shadow-2xl rounded-2xl border border-gray-200 z-50 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1D293D] text-white rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <h2 className="font-semibold">
                                UniTime Assistant 🤖
                            </h2>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-white/10 transition"
                        >
                            <ChevronDown size={22} />
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center py-2">
                            {error || "Something went wrong"}
                        </p>
                    )}

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-sm text-gray-500">
                                👋 Hello! Ask me to fetch timetable of any department by giving semester , year, batch, and department name .
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
                                                        navigate(msg.navigation.path)
                                                    }
                                                    className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded-lg"
                                                >
                                                    {msg.navigation.label}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border px-4 py-3 rounded-2xl">
                                    Thinking... ✨
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
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
                                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none"
                            />

                            <button
                                onClick={handleSend}
                                disabled={loading}
                                className="bg-[#1D293D] text-white p-2 rounded-xl"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}