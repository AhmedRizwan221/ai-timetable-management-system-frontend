import React, { useState, useEffect } from "react";
import { facultyCreate } from "../../store/faculty/facultySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { getDeans } from "../../store/user/user.js";

export default function CreateDeanAndAssignFaculty() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDeans());
    }, [dispatch])

    // redux level fetching 
    const {deans = [], error, status} = useSelector((state) => state.user);
    // console.log(deans);

    const {error: facultyError} = useSelector((state) => state.faculty);
    // send data to redux to create a faculty
    const handleCreateFact = async (data) => {
        try {
            await dispatch(facultyCreate({
                facultyName: data.facultyname,
                deanId: data.deanId,
            })).unwrap();
            reset();
            alert("Faculty created successfully!");
            if (user?.role === 'admin') {
                navigate('/dashboard/superadmin');
            }
        } catch (error) {
            return error
        }
    };
    return (
        <div className="flex justify-center items-center px-5 min-h-screen">
            <div className="m-auto w-full max-w-lg rounded-xl bg-gray-100 border border-black/10 p-10">
            {facultyError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{facultyError.message}</p>
                )}
                <form
                    onSubmit={handleSubmit(handleCreateFact)}
                    className=""
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <Input
                            className="w-1/2"
                            label="Create Faculty"
                            placeholder="Enter faculty name"
                            type="text"
                            {...register("facultyname", { required: true })}
                        />

                        <select
                            className="border border-gray-400 p-2 rounded-lg"
                            {...register("deanId", { required: true })}
                        >
                            <option value="">Select Dean</option>
                            {deans.map((dean) => (
                                <option key={dean._id} value={dean._id}>
                                    {dean.fullName} ({dean.faculty ? "Assigned" : "Not Assigned"})
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full">
                        Create Faculty
                    </Button>
                </form>
            </div>
        </div>
    )
}
// use that form for creation of department 
