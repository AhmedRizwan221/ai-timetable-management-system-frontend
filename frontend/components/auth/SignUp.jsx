import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { Button, Input } from "../index";
import { Link } from "react-router-dom";


export default function SignUp() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const SignUp = async (data) => {
        setError("");

    }

    return (
        <div className="fex justify-center item-center mb-4 mt-4">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 justify-center">
                    <span className="flex justify-center items-center  w-full max-w-[100px]">
                        <h1 className="">Logo will be here</h1>
                    </span>
                    <h2 className="text-center text-2xl leading-tight text-black font-bold">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Alreadt have an account?&nbsp;
                        {/* <Link
                            to=""
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                           Login
                        </Link> */}
                        <li className="font-medium text-primary transition-all duration-200 hover:underline">Login</li>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(SignUp)}>
                        <div className="space-y-5">
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
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <select
                                className="w-full border rounded-md p-2"
                                {...register('password', { required: true })}
                            >
                                <option value="">Add Password</option>
                                <option value="superadmin">Superadmin</option>
                                <option value="chairman">Chairman</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                            <Button type="submit" className="w-full">Create Account</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}