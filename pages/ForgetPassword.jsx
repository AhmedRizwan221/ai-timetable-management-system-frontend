import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components";
import { Mail, Lock } from "lucide-react";
import { Button } from "../components";
import { clearError, forgetPassword } from "../store/auth/authSlice";

export default function () {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, watch } = useForm();

    const { error, message } = useSelector((state) => state.auth);

    const handleForgetPassword = (email) => {
        dispatch(clearError());
        dispatch(forgetPassword(email));
    }


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={`m-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 justify-center">
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Forget Password</h2>
                    <p className="mt-2 text-center text-base text-black/60"></p>
                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                        {message && (
                            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                                <p className="text-green-700 text-sm font-medium">
                                    {message}
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(handleForgetPassword)}>
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

                                <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer" type="submit" >Forget Password</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}