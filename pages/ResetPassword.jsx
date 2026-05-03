import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Input } from "../components";
import { Button } from "../components";
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../store/auth/authSlice";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    const { token } = useParams();
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const { error, message } = useSelector((state) => state.auth);
    console.log(error, message);

    const handleResetPassword = (data) => {
        dispatch(clearError());
        dispatch(resetPassword({
            password: data.password,
            token: token
        }
        ))
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className={`m-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 justify-center">
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Reset Password</h2>
                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                        {message && (
                            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                                <p className="text-green-700 text-sm font-medium">
                                    {message}
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-block rounded-md bg-[#1D293D] px-4 py-2 text-white"
                                >
                                    Go to Login
                                </Link>
                            </div>

                        )}
                        <form onSubmit={handleSubmit(handleResetPassword)}>
                            <div className="grid gap-5 sm:grid-cols-1">

                                <div className="space-y-2">
                                    <Input
                                        label="password"
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

                                <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer" type="submit" >Reset Password</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}