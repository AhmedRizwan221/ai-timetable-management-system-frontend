import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import axios from "axios";
import { login } from "../../store/auth/authSlice";
import { Users, CalendarDays, Layers, Plus, BookOpen, Mail, Lock } from "lucide-react";

export default function CreateTeacherChairman() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");

    const {user} = useSelector((state) => state.auth);

    const handleUser = async (data) => {
        setError("");
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/register', data, {
                withCredentials: true
            })
            // console.log(response);
            const createdUser = response.data.data;

            if (user?.role === 'admin') {
                alert("Dean Created Succefully");
            } else if (user?.role === 'dean') {
                alert("Chairman Creaetd Succegully");
            } else if (user?.role === 'chairman') {
                alert("Teacher created successfully")
            } else {
                dispatch(login(user));
            }

            reset();

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    }


    return (
        < div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 " >
            <div className="bg-white border border-gray-200 rounded-lg ">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">{user?.role === 'admin' && " Create Dean for Faculty"}
                                {user?.role === 'dean' && "Create Chairman for Department"}
                                {user?.role === 'chairman' && "Create Teacher for Department"}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {error && (
                        <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit(handleUser)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    label="FullName"
                                    type="text"
                                    icon={Users}
                                    placeholder="Enter Name"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register('fullName', {
                                        required: true
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Email"
                                    placeholder="Enter Email"
                                    type="email"
                                    icon={Mail}
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register('email', {
                                        required: true,
                                        validate: {
                                            matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
                                        }
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Password"
                                    placeholder="Enter Password"
                                    icon={Lock}
                                    type="password"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register('password', { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Role"
                                    type="text"
                                    icon={Users}
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    value={user?.role === "admin" ? "dean" : user?.role === 'dean' ? "chairman" : "teacher"}
                                    readOnly
                                    {...register("role")}
                                />

                            </div>
                            {user?.role === 'chairman' && (<div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Faculty
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("facultyId", { required: true })}
                                    value={user?.department?.faculty?._id} disabled
                                >
                                    <option value={user?.department?.faculty?._id}>
                                        {user?.department?.faculty?.facultyName}
                                    </option>
                                </select>
                            </div>)}
                            {user?.role === 'chairman' && (<div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Department
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("deptId", { required: true })}
                                    value={user?.department?._id} disabled
                                >
                                    <option value={user?.department?._id}>
                                        {user?.department?.deptName}
                                    </option>
                                </select>
                            </div>)}
                            {user?.role === 'dean' && (<div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Faculty
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("facultyId", { required: true })}
                                    value={user?.faculty?._id} disabled
                                >
                                    <option value={user?.faculty?._id}>
                                        {user?.faculty?.facultyName}
                                    </option>
                                </select>
                            </div>)}
                        </div>
                        <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />   {user?.role === "admin"
                                ? "Create Dean"
                                : user?.role === 'dean'
                                    ? "Create Chairman"
                                    : "Create Teacher"}
                        </Button>
                    </form>
                </div>
            </div>
        </div >
    )
}