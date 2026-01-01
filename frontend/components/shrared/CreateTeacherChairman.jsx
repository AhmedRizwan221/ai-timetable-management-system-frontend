import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../index";
import axios from "axios";
import { login } from "../../store/auth/authSlice";

export default function CreateTeacherChairman() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");

    const user = useSelector((state) => state.auth.user);
    // console.log(user);

    const handleUser = async (data) => {
        setError("");

        try {
            const response = await axios.post('http://localhost:4000/auth/register', data, {
                withCredentials: true
            })
            const user = response.data.data;
            console.log(user);

            if (user?.role === 'superadmin') {
                alert("Chairman Created Succefully");
                navigate('/dashboard/superadmin');
            } else if (user?.role === 'chairman') {
                alert("Teacher Creaetd Succegully");
                navigate("/dashboard/chairman");
            } else {
                dispatch(login(user));
                navigate("/");
            }

            reset();

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-5" >
            <div className={`m-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h1 className="font-bold text-center text-base sm:text-xl lg:text-2xl mb-4">{user?.role === 'superadmin' && " Create Chairman for Department"}
                    {user?.role === 'chairman' && "Create Teacher for Department"}
                </h1>
                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}

                <form onSubmit={handleSubmit(handleUser)}>
                    <div>
                        <Input
                            label={user?.role === 'superadmin' ? "Chairman Name" : "Teacher Name"}
                            type="text"
                            placeholder="Enter Name"
                            {...register('name', {
                                required: true
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter Email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        <Input
                            label="Role"
                            type="text"
                            value={user?.role === "superadmin" ? "chairman" : "teacher"}
                            readOnly
                            {...register("role")}
                        />

                        <Button type="submit" className="flex m-auto">
                            {user?.role === "superadmin"
                                ? "Create Chairman"
                                : "Create Teacher"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}