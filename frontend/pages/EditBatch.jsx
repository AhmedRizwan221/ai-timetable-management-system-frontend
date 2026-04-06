import React, { useEffect, useState } from "react";
import Input from "../components/shrared/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSections, updateSection } from "../store/section/section";
import Button from "../components/shrared/Button";
import { CalendarDays, Layers, Plus, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getBatches, updateBatch } from "../store/batch/batch";
import { getSemesters } from "../store/semester/semester"


export default function EditBatch() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [err, setErr] = useState("")
    const { batchId } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { batches = [] } = useSelector((state) => state.batch);
    const { semesters = [] } = useSelector((state) => state.semester);
    const {sections = []} = useSelector((state) => state.section);

    useEffect(() => {
        if (user) {
            dispatch(getBatches(user?.department?._id));
            dispatch(getSemesters(user?.department?._id));
            dispatch(getSections(user?.department?._id))
        }
    }, [dispatch, user]);

    const handlerUpdateBatch = async (data) => {
        setErr("");
        console.log(data);
        try {
            await dispatch(updateBatch({
                batchId,
                data: {
                    batchName: data.batchName,
                    departmentId: user?.department?._id,
                    semesterId: data.semesterId || null,
                    sectionId: data.sectionId || null
                }

            })).unwrap();
            reset();
            alert("Batch Updated successfully");

            if (user.role === 'chairman') {
                Navigate('/dashboard/chairman')
            }
        } catch (error) {
            // console.log(error);
            setErr(error)
        }
    }

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 ">
            <div className="bg-white border border-gray-200 rounded-lg ">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard/superadmin/manage-faculties')}
                                className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            >
                                <ArrowLeft className="h-8 w-8" />
                            </button>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Update Batch
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                    )}
                    <form onSubmit={handleSubmit(handlerUpdateBatch)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    label="Batch Name"
                                    icon={BookOpen}
                                    type="text"
                                    placeholder="Enter Batch Name"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("batchName")}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Department
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("departmentId")}
                                    defaultValue={user?.department?._id} disabled
                                >
                                    <option value={user?.department?._id}>
                                        {user?.department?.deptName}
                                    </option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Select Semester
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("semesterId")}
                                >
                                    <option value="">Select Semester</option>
                                    {semesters.map((sem) => (
                                        <option key={sem._id} value={sem._id}>
                                            {"semester " + sem?.semesterNumber + " " + "Year" + sem?.studyYear}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Select Section
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("sectionId")}
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((sect) => (
                                        <option key={sect._id} value={sect._id}>
                                            {sect?.sectionName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            type="submit"
                        >
                            <Plus className="mr-2 h-4 w-4" />  Update Batch
                        </Button>
                    </form>

                </div>
            </div>
        </div>

    )
}