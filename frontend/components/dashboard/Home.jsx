import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/dept/departmentSlice.js";
import {Navbar, Select} from "../index";


export default function Home() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { departments, error, loading } = useSelector((state) => state.department)

    //fetch depts from redux 
    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);


    const handleUser = async (data) => {
        console.log(data);
    }
    if (loading) return <p className="text-gray-500">Loading departments...</p>;
    if (error) return <p className="text-red-600">Error: {error.message}</p>;

    return (
        <>
        <Navbar />
        <div className="bg-white-700">
            <div className="flex justify-center  items-center flex-col">
                <div className="pt-8 text-center">
                    <h1 className="text-xl font-bold py-2">Time Table Management System</h1>
                    <p className="text-l font-medium pb-2">Select your Department and Batch to continue</p>
                </div>

                <form
                    onSubmit={handleSubmit(handleUser)}
                    className=""
                >
                    
                    <Select 
                        label={"Select Department"}
                        options={departments}
                        value="Select Department"
                    />

                     <Select 
                        label="Select Batch"
                        options={departments}
                        value="Select Department"
                    />



                    {/* <label className="">Select Department</label>

                    <select
                        className=""
                    >
                        <option>Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                                {dept.name}
                            </option>
                        ))}
                    </select> */}
                    {/* <label className="text-gray-700 font-medium">Select Batch</label>

                    <select
                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                    >
                        <option>Morning</option>
                        <option value="">Evening</option>
                    </select>
                    <label className="text-gray-700 font-medium">Select Year</label>

                    <select
                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                    >
                        <option>1st Year</option>
                        <option value="">2nd Year</option>
                        <option>3rd Year</option>
                        <option value="">4th Year</option>
                    </select> */}
                    {/* <button
                        type="submit"
                        className="bg-blue-200"
                    >
                        Continue
                    </button> */}
                </form>
            </div>
        </div>
        </>

    )
}