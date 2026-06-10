import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { changeUserPassword } from "../../store/user/user";
import Input from "./Input";
import Button from "./Button";

export default function ChangeUSerPassword({
    title
}) {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [err, setErr] = useState("");

    const {error, passwordChanged} = useSelector((state) => state.user);
    console.log(error, passwordChanged);

    const handleUpdatePassword = async (data) => {
        setErr("");
        try {
            await dispatch(changeUserPassword(data)).unwrap();
            reset()
            alert("Password updated successfully");
        } catch (error) {
            setErr(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="m-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10">
                <div className="mb-2 justify-center">
                    <h2 className="text-center text-xl lg:text-2xl leading-tight text-black font-bold">Changer {title} Password</h2>
                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                        {error && <p className="text-red-600 mt-8 text-center">{error.message}</p>}
                    </div>

                    <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <div className="grid gap-5 sm:grid-cols-1">
                            {errors.oldPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.oldPassword.message}
                                </p>
                            )}
                            <div className="space-y-2">
                                <Input
                                    label="Old Password"
                                    type="password"
                                    placeholder="Enter old password"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("oldPassword", {
                                        required: "Old Password is required"
                                    })}
                                />
                            </div>

                            <div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                                <div className="space-y-2">
                                    <Input
                                        label="New Password"
                                        type="password"
                                        placeholder="Enter new password"
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        {...register("newPassword", {
                                            required: "New Password is required"
                                        })}
                                    />
                                </div>
                                <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer" type="submit" >Change Password</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}