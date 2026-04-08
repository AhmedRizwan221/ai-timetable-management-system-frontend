import React, { useEffect, useState } from "react";
import Input from "../components/shrared/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../store/user/user";
import Button from "../components/shrared/Button";
import { CalendarDays, Layers, Plus, BookOpen, ArrowLeft, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSemesters } from "../store/semester/semester"
import { updateCourse } from "../store/course/course";


export default function EditCourse() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [err, setErr] = useState("")
    const { courseId } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { semesters = [] } = useSelector((state) => state.semester);
    const { teachers = [] } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            dispatch(getSemesters(user?.department?._id));
            dispatch(getTeachers());
        }
    }, [dispatch, user]);

    const handlerUpdateCourse = async (data) => {
        setErr("");
        try {
            await dispatch(updateCourse({
                courseId,
                data: {
                    courseName: data.courseName,
                    theoryCredits: data.theoryCredits,
                    practicalCredits: data.practicalCredits,
                    teacherId: data.teacherId,
                    semesterId: data.semesterId
                }

            })).unwrap();
            reset();
            alert("Course Updated successfully");

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
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Update Course
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                    )}
                    <form onSubmit={handleSubmit(handlerUpdateCourse)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Input
                                    label="Sectoin Name"
                                    icon={BookOpen}
                                    type="text"
                                    placeholder="Enter Course Name"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("courseName")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Theory Credits"
                                    icon={BookOpen}
                                    type="Number"
                                    placeholder="Enter Theory Credits"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("theoryCredits")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    label="Practical Credits"
                                    icon={BookOpen}
                                    type="Number"
                                    placeholder="Enter Practical Credits"
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("practicalCredits")}
                                />
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
                                            {"Semester" + sem.semesterNumber} , {"Year" + sem.studyYear}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-muted-foreground" /> Select Teacher
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("teacherId")}
                                >
                                    <option value="">Select Semester</option>
                                    {teachers.map((tech) => (
                                        <option key={tech._id} value={tech._id}>
                                            {tech?.fullName} , {"Department" + tech.departmentTeacher?.deptName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            type="submit"
                        >
                            <Plus className="mr-2 h-4 w-4" />  Update Course
                        </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}