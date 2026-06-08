import React, { useState, useEffect } from "react";
import { departmentCreate, clearError } from "../../store/dept/departmentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { fetchFaculties } from "../../store/faculty/facultySlice.js";
import { Building2, CalendarDays, Users, Plus } from "lucide-react";
import {getChairmans} from "../../store/user/user.js";


export default function CreateDepartment() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const { chairmans = [], error: chairmanError } = useSelector((state) => state.user);
    const { error: deptError } = useSelector((state) => state.department);
    const { user } = useSelector((state) => state.auth);

    // console.log(chairmans);

    useEffect(() => {
        if (user) {
            dispatch(getChairmans());
        }
    }, [dispatch, user])

    // send data to redux to create a faculty
    const handleCreateDept = async (data) => {
        dispatch(clearError());

        try {
            await dispatch(departmentCreate({
                deptName: data.departmentname,
                chairmanId: data.chairmanId,
                facultyId: data.facultyId
            })).unwrap();
            reset();
            alert("Department created successfully!");
        } catch (error) {
            //    console.log(error);
            return error
        }
    };

    return (
        < div className="min-h-screen bg-muted/30 md:py-10 md:px-4 ">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Create Department and Assign Chairman
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {deptError && (
                        <p className="text-red-600 text-sm mb-2 text-center">{deptError.message}</p>
                    )}
                    {chairmanError && <p className="text-red-500 text-sm">Failed to load chairmans</p>}
                    {/* {facultyError && <p className="text-red-500 text-sm">Failed to load faculties</p>} */}
                    <form onSubmit={handleSubmit(handleCreateDept)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    label="Create Department"
                                    icon={Users}
                                    placeholder="Enter department name"
                                    type="text"
                                    {...register("departmentname", { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> Select Chairman
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("chairmanId", { required: true })}
                                >
                                    <option value="">Select Chairman</option>
                                    {chairmans.map((chair) => (
                                        <option key={chair._id} value={chair._id}>
                                            {chair.fullName} {chair?.department ? "Assigned" : "Not Assign"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />  Faculty
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("facultyId")} disabled
                                >
                                    <option value={user?.faculty?._id}>
                                        {user?.faculty?.facultyName}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" /> Create Department
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}