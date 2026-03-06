import React, { useState, useEffect } from "react";
import { departmentCreate } from "../../store/dept/departmentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { getChairmans } from "../../store/user/user.js";
import { fetchFaculties } from "../../store/faculty/facultySlice.js";

export default function CreateDeptAssignChiarman() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();



    const { chairmans = [], error: chairmanError, status: chairmanStatus } = useSelector((state) => state.user);
    // console.log(chairmans);

    useEffect(() => {
        dispatch(getChairmans());
    }, [dispatch])

    const { faculties = [], error: facultyError, status: facultyStatus } = useSelector((state) => state.faculty)
    // console.log(faculties);

    const { departments = [], error: deptError } = useSelector((state) => state.department);

    useEffect(() => {
        dispatch(fetchFaculties());
    }, [dispatch])

    const { user } = useSelector((state) => state.auth);

    // send data to redux to create a faculty
    const handleCreateDept = async (data) => {
        try {
            await dispatch(departmentCreate({
                deptName: data.departmentname,
                chairmanId: data.chairmanId,
                facultyId: data.facultyId
            })).unwrap();
            reset();
            alert("Department created successfully!");
            if (user?.role === 'dean') {
                navigate('/dashboard/dean');
            }
        } catch (error) {
            //    console.log(error);
            return error
        }
    };
    return (
        <div className="flex justify-center items-center px-5 min-h-screen">
            <div className="m-auto w-full max-w-lg rounded-xl bg-gray-100 border border-black/10 p-10">
                {deptError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{deptError.message}</p>
                )}
                {<form
                    onSubmit={handleSubmit(handleCreateDept)}
                    className=""
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <Input
                            className="w-1/2"
                            label="Create Department"
                            placeholder="Enter department name"
                            type="text"
                            {...register("departmentname", { required: true })}
                        />

                        <select
                            className="border border-gray-400 p-2 rounded-lg"
                            {...register("chairmanId", { required: true })}
                        >
                            <option value="">Select Chairman</option>
                            {chairmans.map((chair) => (
                                <option key={chair._id} value={chair._id}>
                                    {chair.fullName}
                                </option>
                            ))}
                        </select>
                        {chairmanError && <p className="text-red-500 text-sm">Failed to load chairmans</p>}

                        <select
                            className="border border-gray-400 p-2 rounded-lg"
                            {...register("facultyId", { required: true })}
                        >
                            <option value="">Select Faculty</option>
                            {faculties.map((fact) => (
                                <option key={fact._id} value={fact._id}>
                                    {fact.facultyName} 
                                </option>
                            ))}
                        </select>
                        {facultyError && <p className="text-red-500 text-sm">Failed to load faculties</p>}
                    </div>

                    <Button type="submit" className="w-full">
                        Create Department
                    </Button>
                </form>}
            </div>
        </div>
    )
}