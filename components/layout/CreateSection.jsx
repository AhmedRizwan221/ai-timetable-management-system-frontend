import React, { useEffect, useState } from "react";
import Input from "../shrared/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSection } from "../../store/section/section";
import Button from "../shrared/Button";
import { Clock, CalendarDays, Layers, Plus, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allBatches } from "../../store/batch/batch";
import { getAllSemesters } from "../../store/semester/semester"


export default function CreateSection() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [err, setErr] = useState("")

    const { user, error: userError, status } = useSelector((state) => state.auth);
    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    const { semesters = [] } = useSelector((state) => state.semester);

    useEffect(() => {
        if (user) {
            dispatch(allBatches(user?.department?._id));
            dispatch(getAllSemesters(user?.department?._id))
        }
    }, [dispatch, user]);

    const handleCreateSection = async (data) => {
        setErr("");

        try {
            await dispatch(createSection({
                sectionName: data.sectionName,
                batchId: data.batchId,
                departmentId: user?.department?._id,
                semesterId: data.semesterId
            })).unwrap();
            reset();
            alert("Section created successfully");
        } catch (error) {
            // console.log(error);
            setErr(error)
        }
    }

    return (
        <div className="min-h-screen bg-muted/30 md:py-10 md:px-4">
            <div className="bg-white border border-gray-200 rounded-lg ">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                Create Section
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                    )}
                    <form onSubmit={handleSubmit(handleCreateSection)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    label="Sectoin Name"
                                    icon={BookOpen}
                                    type="text"
                                    placeholder="Enter Course Name"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("sectionName", { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Department
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("departmentId", { required: true })}
                                    defaultValue={user?.department?._id} disabled
                                >
                                    <option value={user?.department?._id}>
                                        {user?.department?.deptName}
                                    </option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Select Batch
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("batchId", { required: true })}
                                >
                                    <option value="">Select Batch</option>
                                    {batches.map((batch) => (
                                        <option key={batch._id} value={batch._id}>
                                            {batch?.batchName === 'morning' ? "Morning" : 'Evening'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Select Semester
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("semesterId", { required: true })}
                                >
                                    <option value="">Select Batch</option>
                                    {semesters.map((sem) => (
                                        <option key={sem._id} value={sem._id}>
                                            {"semester " + sem?.semesterNumber + " " + "Year" + sem?.studyYear}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            type="submit"
                        >
                            <Plus className="mr-2 h-4 w-4" />  Create Section
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}