import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Select } from "../index";
import TimeTableView from "../shrared/TimeTableView.jsx";
import { allSlotsInUni } from "../../store/timetableSlot/timetableSlot.js";
import { fetchAllDepartments } from "../../store/dept/departmentSlice.js";


export default function Home() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    // redux level fetching
    const { timeTableSlot = [] } = useSelector((state) => state.timetabelSlot);
    const { departments = [] } = useSelector((state) => state.department);
    console.log(timeTableSlot);

    //fetch depts from redux 
    useEffect(() => {
        dispatch(allSlotsInUni());
        dispatch(fetchAllDepartments());
    }, [dispatch]);


    const handleUser = async (data) => {
        console.log(data);
    }
    // if (loading) return <p className="text-gray-500">Loading departments...</p>;
    // if (error) return <p className="text-red-600">Error: {error.message}</p>;

    return (
        <div className="w-full">
            <Navbar />
            <div className="bg-white-700 mt-3">
                <div className="flex justify-center items-center flex-col px-2 md:px-10">
                    <TimeTableView
                        timeTableSlot={timeTableSlot}
                        departments={departments}
                    />
                </div>
            </div>
        </div>
    )
}