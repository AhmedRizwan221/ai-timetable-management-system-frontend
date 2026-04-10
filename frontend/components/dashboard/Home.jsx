import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import {Navbar, Select} from "../index";
import TimeTableView from "../shrared/TimeTableView.jsx";
import {allSlotsInUni} from "../../store/timetableSlot/timetableSlot.js";
import {fetchAllDepartments} from "../../store/dept/departmentSlice.js";


export default function Home() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    // redux level fetching
    const {timeTableSlot = []} = useSelector((state) => state.timetabelSlot);
    // console.log(timeTableSlot);
    const {departments = [] } = useSelector((state) => state.department);
    // console.log(departments);

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
        <>
        <Navbar />
        <div className="bg-white-700">
            <div className="flex justify-center  items-center flex-col">
                <div className="pt-8 text-center">
                    <h1 className="text-xl font-bold py-2">Time Table Management System</h1>
                    <p className="text-l font-medium pb-2">Select your Department and Batch to continue</p>
                </div>

               <TimeTableView 
                timeTableSlot={timeTableSlot}
                departments={departments}
               />
            </div>
        </div>
        </>

    )
}