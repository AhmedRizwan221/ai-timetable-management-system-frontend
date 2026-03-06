import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  Input  from "../components/shrared/Input";
import { updateUserData } from "../store/user/user";
import { useForm } from "react-hook-form";
import  Button  from "../components/shrared/Button";

export default function EditDean() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const {user } = useSelector((state) => state.auth);

    const handleUpdateDeanData = async (data) => {
        try {
            await dispatch(updateUserData({
                role: 'dean',
                id,
                data: {
                    fullName: data.fullname,
                    email: data.email,
                    password: data.password
                }
            })).unwrap();
            reset();
            alert("Dean updated successfully!");
            if (user?.role === 'admin') {
                navigate('/dashboard/superadmin');
            }
        } catch (error) {
            //    console.log(error);
            return error
        }
    };

    const { error } = useSelector((state) => state.user);
    // console.log(deans, status);

    return (
        <div className="flex justify-center items-center px-5 min-h-screen">
            <div className="m-auto w-full max-w-lg rounded-xl bg-gray-100 border border-black/10 p-10">
                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}
                <form
                    onSubmit={handleSubmit(handleUpdateDeanData)}
                    className=""
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <Input
                            className="w-1/2"
                            label="Full Name"
                            placeholder="Enter full name"
                            type="text"
                            {...register("fullname", { required: true })}
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
                        <Input
                            label="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register('password', {
                                required: true
                            })}

                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Update Dean
                    </Button>
                </form>
            </div>
        </div>
    )
}