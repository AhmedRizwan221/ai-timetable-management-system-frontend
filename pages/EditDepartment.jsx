import React, { useState, useEffect } from "react";
import { clearError, departmentUpdate } from "../store/dept/departmentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index.js";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFaculties } from "../store/faculty/facultySlice.js";
import { Building2, CalendarDays, ArrowLeft, Users, Plus } from "lucide-react";
import { getAllChairmansInFaculty } from "../store/user/user.js";


export default function EditDepartment() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const { departmentId } = useParams();

    const { chairmans = [], error: chairmanError } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getAllChairmansInFaculty({
                facultyId: user.faculty?._id,
                page: 1,
                limit: 5
            }));
            dispatch(clearError());
        }
    }, [dispatch, user])

    // send data to redux to create a faculty
    const handlerUpdateDepartment = async (data) => {
        setErr("");
        try {
            await dispatch(departmentUpdate({
                departmentId,
                data: {
                    deptName: data.departmentname,
                    chairmanId: data.chairmanId,
                    facultyId: data.facultyId
                }
            })).unwrap();
            reset();
            alert("Department Updated successfully!");

        } catch (error) {
            //    console.log(error);
            setErr(error)
        }
    };

    return (
        < div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 " >
            <div className="bg-white border border-gray-200 rounded-lg ">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/dashboard/dean/manage-departments`)}
                                className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            >
                                <ArrowLeft className="h-8 w-8" />
                            </button>
                            <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-8 w-8 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Update Department
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                    )}

                    <form onSubmit={handleSubmit(handlerUpdateDepartment)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    label="Create Department"
                                    icon={Users}
                                    placeholder="Enter department name"
                                    type="text"
                                    {...register("departmentname")}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> Select Chairman
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("chairmanId")}
                                >
                                    <option value="">Select Chairman</option>
                                    {chairmans.map((chair) => (
                                        <option key={chair._id} value={chair._id}>
                                            {chair.fullName} {chair?.department ? "Assigned" : "Not Assign"}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />  Faculty
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("facultyId")} disabled
                                >
                                    <option value={user?.faculty?._id}>
                                        {user?.faculty?.facultyName}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" /> Update Department
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}