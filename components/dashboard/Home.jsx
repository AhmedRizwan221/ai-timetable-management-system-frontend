import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Select } from "../index";
import TimeTableView from "../shrared/TimeTableView.jsx";
import { allSlotsInUni } from "../../store/timetableSlot/timetableSlot.js";
import { fetchAllDepartments } from "../../store/dept/departmentSlice.js";
import QueryChatBot from "../shrared/QueryChatBot.jsx";


export default function Home() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [message, setMessage] = useState("");
    const [timetableslot, setTimetableslot] = useState([]);
    const [activeView, setActiveView] = useState("manual");

    // redux level fetching
    const { timeTableSlot = [] } = useSelector((state) => state.timetabelSlot);
    const { departments = [] } = useSelector((state) => state.department);
    // console.log(departments);

    // query slots fetching from redux
    const { timetableSlots } = useSelector((state) => state.chatbot);
    // console.log(timetableSlots);

    //fetch depts from redux 
    useEffect(() => {
        dispatch(allSlotsInUni());
        dispatch(fetchAllDepartments());
    }, [dispatch]);

    useEffect(() => {
        if (timetableSlots?.length > 0) {
            setActiveView("query");
        }
    }, [timetableSlots]);

    const selectedSlots = activeView === 'query' ? timetableSlots : timeTableSlot;
    // console.log(selectedSlots);

    return (
        <div className="w-full">
            <Navbar />
            <div className="bg-white-700 mt-3">
                <div className="flex justify-center items-center flex-col px-2 md:px-10">
                    <TimeTableView
                        timeTableSlot={selectedSlots}
                        departments={departments}
                        isQueryMode={timetableSlots.length > 0}
                    />
                </div>
            </div>
            <QueryChatBot />
        </div>
    )
}