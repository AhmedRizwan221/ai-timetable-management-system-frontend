import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../store/auth/authSlice.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input, Button } from "../index.js";
import { Mail, Lock } from "lucide-react";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const API_URL = import.meta.env.VITE_API_URL;

    const handlelogin = async (data) => {
        setError("");
        try {
            console.log("API_URL:", API_URL);
            await axios.post(`${API_URL}/v1/users/login`, data,
                {
                    withCredentials: true
                });
            console.log("Final URL:", `${API_URL}v1/users/login`);
            const currentUser = await axios.get(
                `${API_URL}/v1/users/current-user`,
                { withCredentials: true }
            );

            dispatch(authLogin(currentUser.data.data));

            const role = currentUser.data.data.role;

            if (role === 'superadmin') {
                navigate('/dashboard/superadmin');
            } else if (role === 'dean') {
                navigate("/dashboard/dean");
            }
            else if (role === 'chairman') {
                navigate('/dashboard/chairman');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    }

    return (
        <div className="sm: px-4 flex justify-center items-center min-h-screen">
            <div className={`m-auto w-full max-w-lg bg-white rounded-xl sm: py-10 md: p-10 border border-black/10`}>
                <div className=" justify-center">
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Sign in to your account</h2>
                    {/* <p className="mt-2 text-center text-base text-black/60">
                        Do not have account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            SignUp
                        </Link>
                    </p> */}
                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                        <form onSubmit={handleSubmit(handlelogin)}>
                            <div className="grid gap-5 sm:grid-cols-1">
                                <div className="space-y-2">
                                    <Input
                                        label="Email"
                                        placeholder="Enter your Email"
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
                                        type="password"
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        icon={Lock}
                                        {...register('password', {
                                            required: true
                                        })}

                                    />
                                </div>

                                <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer" type="submit" >Login</Button>

                            </div>
                        </form>
                        <div className="flex justify-end">
                            <Link
                                to="/forget-password"
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex gap-1 items-center"
                            >
                                <Lock size={14} />
                                Forget Password
                            </Link>
                        </div>
                    </div>


                </div>
            </div >
        </div >
    )
}