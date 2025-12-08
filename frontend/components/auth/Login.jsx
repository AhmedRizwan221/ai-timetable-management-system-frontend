import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin} from "../../store/auth/authSlice.js";
import axios from "axios";
import { Link } from "react-router-dom";
import {Input, Button} from "../index.js";

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const handlelogin = async (data) => {
        setError("");

        try {
            const token = localStorage.getItem('token');
            // console.log(token, "this is a token");

            const response = await axios.post('http://localhost:4000/auth/login', data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

            const userData = response.data;
            localStorage.setItem('token', userData.token);
            localStorage.setItem("user",  JSON.stringify(userData));
            dispatch(authLogin(userData));

            if (userData.role === 'superadmin') {
                navigate('/dashboard/superadmin');
            } else if (userData.role === 'chairman') {
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
        <div className="flex justify-center items-center min-h-screen">
            <div className={`m-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 justify-center">
                    {/* <span className="flex justify-center items-center  w-full max-w-[100px]">
                    <h1 className="">Logo will be here</h1>
                </span> */}
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Do not have account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            SignUp
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(handlelogin)}>
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
                        <Input
                            label="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: true
                            })}

                        />
                        <Button type="submit" className="w-full">Login</Button>
                    </form>

                </div>
            </div>
        </div>
    )
}