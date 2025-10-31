import React, { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/dept/departmentSlice.js";
import {Navbar} from "../index";


export default function Home() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { departments, error, loading } = useSelector((state) => state.department)

    //fetch depts from redux 
    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const handleUser = async () => {

    }
    if (loading) return <p className="text-gray-500">Loading departments...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <>
        <Navbar />
        <div className="">
            <div className="">
                <div className="">
                    <h1 className="">Time Table System</h1>
                    <p className="">Select your department to continue</p>
                </div>

                <form
                    onSubmit={handleSubmit(handleUser)}
                    className=""
                >
                    <label className="">Select Department</label>

                    <select
                        className=""
                    >
                        <option>Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept._id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
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
                    <button
                        type="submit"
                        className="bg-blue-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
        </>

    )
}