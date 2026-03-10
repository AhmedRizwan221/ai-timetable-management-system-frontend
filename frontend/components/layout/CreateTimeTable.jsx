import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeptallTimeTables } from "../../store/timetable/timeTable";
import { getUser } from "../../store/auth/authSlice";
import Button from "../shrared/Button";
import { useForm } from "react-hook-form";
import { getSemesters } from "../../store/semester/semester";
import { getBatches } from "../../store/batch/batch";
import { getSections } from "../../store/section/section";
import { createTimeTable } from "../../store/timetable/timeTable";
import { Navigate } from "react-router-dom";
import { createTimeTableSlot } from "../../store/timetableSlot/timetableSlot";
import { Input } from "../index";
import { getTeachers } from "../../store/user/user";
import { getAllCoursesInDept } from "../../store/course/course";
import { CalendarDays, Users, BookOpen, Layers, Plus } from "lucide-react";

export default function CreateTimeTable() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const { timeTables = [], error: timetableError } = useSelector((state) => state.timetable);
    // console.log("Time tables : ", timeTables, timeTables?.batch?._id);

    const { user, error: userError, status } = useSelector((state) => state.auth);
    // console.log(user);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    // console.log("Semester of dept: ", semesters);

    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    // console.log("Batches of dept: ", batches);

    const { sections = [], error: sectionError } = useSelector((state) => state.section);
    // console.log("Sections of dept", sections);

    const { teachers = [], totalTeachers, error: teacherError } = useSelector((state) => state.user);
    // console.log("Teachers" , teachers, "Total Teachers ",totalTeachers);

    const { courses = [], error: courseError } = useSelector((state) => state.course);
    console.log("Courses", courses)

    const { timeTableSlot = [], error: TimeTableSLotError } = useSelector((state) => state).timetabelSlot
    console.log("Batch All time tables", timeTableSlot);

    // now fetched all courses using deptId and render here 
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getUser());
        }
        if (user) {
            dispatch(getDeptallTimeTables(user?.department?._id));
            dispatch(getSemesters(user?.department?._id));
            dispatch(getBatches(user?.department?._id));
            dispatch(getSections(user?.department?._id));
            dispatch(getTeachers());
            dispatch(getAllCoursesInDept(user?.department?._id));
        }
    }, [dispatch, user, status]);


    const handleCreatTimeTable = async (data) => {
        try {
            console.log(data);
            await dispatch(createTimeTable({
                semesterId: data.semesterId,
                batchId: data.batchId,
                departmentId: data.departmentId,
                sectionId: data.sectionId || null
            })).unwrap();
            reset();
            alert("TimeTable created successfully");

            if (user?.role === 'chairman') {
                Navigate('/dashboard/chairman')
            }

        } catch (error) {
            return error
        }
    }

    const handleCreateTimeTableSlot = async (data) => {
        console.log("button clicked ");
        try {
            await dispatch(createTimeTableSlot({
                timetableId: data.timetableId,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                teacherId: data.teacherId,
                courseId: data.courseId,
                type: "theory",
            }
            )).unwrap();
            reset();
            alert("TimeTable Slot created successfully");

            if (user?.role === 'chairman') {
                Navigate('/dashboard/chairman')
            }

        } catch (err) {
            return err
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
                                Create Timetable {user?.department.deptName}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {timetableError && (
                        <p className="text-red-600 text-sm mb-2 text-center">{timetableError.message}</p>
                    )}
                    <form
                        onSubmit={handleSubmit(handleCreatTimeTable)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                                    Semester
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("semesterId", { required: true })}
                                >
                                    <option>Select Semester</option>
                                    {semesters.map((sem) => (
                                        <option key={sem._id} value={sem._id}>
                                            {"Semester" + sem.semesterNumber} , {"Year" + sem.studyYear}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5" >
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> Batch
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("batchId", { required: true })}
                                >
                                    <option>Select Batch</option>
                                    {batches.map((batch) => (
                                        <option key={batch._id} value={batch._id}>
                                            {"Batch" + " " + batch.batchName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Department
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    {...register("departmentId", { required: true })}
                                    defaultValue={user?.department?._id}
                                >
                                    <option value={user?.department?._id}>
                                        {user?.department?.deptName}
                                    </option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Section
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("sectionId")}
                                    defaultValue=""
                                >
                                    <option value="">Select Section</option>
                                    {sections.map((sect) => (
                                        <option key={sect._id} value={sect._id}>
                                            {"Section" + " " + sect.sectionName}, {sect?.department.deptName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131]">
                            <Plus className="mr-2 h-4 w-4" /> Create Timetable
                        </Button>
                    </form>
                </div>
            </div>
            <div>
                <h1>Create time table Slot for {user?.department.deptName}</h1>
                {timetableError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{timetableError.message}</p>
                )}

                <form
                    onSubmit={handleSubmit(handleCreateTimeTableSlot)}>
                    <div>
                        <label >Select Time Tables </label>
                        <select
                            className="border border-gray-400 p-2 rounded-lg"
                            {...register("timetableId", { required: true })}
                        >
                            <option>Select Time Tables</option>
                            {timeTables.map((temp) => (
                                <option key={temp._id} value={temp._id}>
                                    {temp.batch.batchName} , {"Sem No" + " " + temp.semester.semesterNumber + " " + "Year No" + temp.semester.studyYear}
                                </option>
                            ))}
                        </select>
                        <div className="mt-4 p-4">
                            <label htmlFor="">Select Teacher</label>
                            <select
                                className="border border-gray-400 p-2 rounded-lg"
                                {...register("teacherId", { required: true })}
                            >
                                {teachers.map((teach) => (
                                    <option key={teach._id} value={teach._id}>
                                        {teach.fullName} { }
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-between">
                                <select
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                    {...register("day", { required: true })}
                                >
                                    <option value="Mon">Monday</option>
                                    <option value="Tue">Tuesday</option>
                                    <option value="Wed">Wednessday</option>
                                    <option value="Thu">Thursday</option>
                                    <option value="Fri">Friday</option>
                                </select>
                                <Input
                                    label="Start Time"
                                    type="time"
                                    placeholder="Add Batch"
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                    {...register("startTime", { required: true })}
                                />
                                <Input
                                    label="End Time"
                                    type="time"
                                    placeholder="Add Batch"
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                    {...register("endTime", { required: true })}
                                />
                            </div>
                            <label htmlFor="">Select Courses</label>
                            <select
                                className="border border-gray-400 p-2 rounded-lg"
                                {...register("courseId", { required: true })}
                            >
                                {courses.map((cour) => (
                                    <option key={cour._id} value={cour._id}>
                                        {cour.courseName} { }
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Create Time Table Slot
                    </Button>

                </form>
            </div>
        </div >



    )
}