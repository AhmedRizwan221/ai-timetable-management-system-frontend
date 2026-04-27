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

            const response = await axios.post("http://localhost:8000/api/v1/users/register", data,
                {
                    withCredentials: true
                }
            );

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className={`m-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 bg-white`}>
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

                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 ">
                        {error && <p className="text-red-600 mt-8 text-center">{error.message}</p>}
                        <form onSubmit={handleSubmit(SignUp)}>
                            <div className="grid gap-5 sm:grid-cols-1">
                                <div className="space-y-2">
                                    <Input
                                        label="name"
                                        placeholder="Enter your Name"
                                        type="text"
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        {...register('name', {
                                            required: true
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        label="Email"
                                        placeholder="Enter your Email"
                                        type="email"
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        {...register('email', {
                                            required: true,
                                            validate: {
                                                matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
                                            }
                                        })}
                                    />
                                </div>
                                <label className="block mb-1 text-sm font-medium">Role</label>
                                <select
                                    className="w-full border rounded-md p-2"
                                    {...register('role', { required: true })}
                                >
                                    <option value="">Select role</option>
                                    <option value="superadmin">Superadmin</option>
                                    <option value="chairman">Chairman</option>
                                </select>
                                <div className="space-y-2">
                                    <Input
                                        label="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        {...register('password', {
                                            required: true
                                        })}

                                    />
                                </div>

                                <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer" >Create Account</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}