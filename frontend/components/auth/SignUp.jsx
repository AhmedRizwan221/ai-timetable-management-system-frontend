import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../index";
import { Link } from "react-router-dom";
import { login } from "../../store/auth/authSlice.js";
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const SignUp = async (data) => {
        setError("");
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            const response = await axios.post("http://localhost:4000/auth/register", data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(currentUser && token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                }
            );


            if (currentUser?.role === "superadmin") {
                alert(" Chairman created successfully!");
                navigate("/dashboard/superadmin");
            } else if (currentUser?.role === "chairman") {
                alert(" Teacher created successfully!");
                navigate("/dashboard/chairman");
            } else {
                const userData = response.data;
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
                dispatch(login(userData));
                navigate("/dashboard/superadmin");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={`m-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 justify-center">
                    {/* <span className="flex justify-center items-center  w-full max-w-[100px]">
                        <h1 className="">Logo will be here</h1>
                    </span> */}
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Alreadt have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error.message}</p>}
                    <form onSubmit={handleSubmit(SignUp)}>
                        <div>
                            <Input
                                label="name"
                                placeholder="Enter your Name"
                                type="text"
                                {...register('name', {
                                    required: true
                                })}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter your Email"
                                type="email"
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
                                    }
                                })}
                            />
                            <label className="block mb-1 text-sm font-medium">Role</label>
                            <select
                                className="w-full border rounded-md p-2"
                                {...register('role', { required: true })}
                            >
                                <option value="">Select role</option>
                                <option value="superadmin">Superadmin</option>
                                <option value="chairman">Chairman</option>
                            </select>
                            <Input
                                label="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: true
                                })}

                            />
                            <Button type="submit" className="w-full">Create Account</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}