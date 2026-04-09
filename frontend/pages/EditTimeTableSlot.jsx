import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateTimeTableSlot,getAllTimeTableSlot } from "../store/timetableSlot/timetableSlot";
import { getTeachers } from "../store/user/user";
import { useNavigate, useParams } from "react-router-dom";
import {getAllCoursesInDept} from "../store/course/course.js";
import { CalendarDays, Users, BookOpen,  Plus, CalendarClock, Clock, ArrowLeft } from "lucide-react";
import Button from "../components/shrared/Button";
import {getDeptallTimeTables} from "../store/timetable/timeTable.js"


export default function EditTimeTableSlot() {
    const { register, handleSubmit, reset, watch, unregister } = useForm();
    const dispatch = useDispatch();
    const [err, setErr] = useState("");
    const { timetableSlot } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    // const { timeTables = [] } = useSelector((state) => state.timetable);
    const {timeTables=[]} = useSelector((state) => state.timetabelSlot);
    const { courses = [] } = useSelector((state) => state.course);
    const { teachers = [], totalTeachers, error: teacherError } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            dispatch(getDeptallTimeTables(user?.department?._id));
            dispatch(getTeachers());
            dispatch(getAllCoursesInDept(user?.department?._id));
            dispatch(getAllTimeTableSlot(user?.department?._id))
        }
    }, [dispatch, user]);

    const selectedCourseId = watch("courseId");
    const selectedCourse = courses.find(
        (c) => c._id === selectedCourseId
    );
    useEffect(() => {
        if (!selectedCourse?.hasPractical) {
            unregister("practicalFacilitatorId");
        }
        if (selectedCourse?.hasPractical) {
            unregister("teacherId");
        }

    }, [selectedCourse, unregister]);

    const handlerUpdateTimeTableSlot = async (data) => {
        setErr("");
        try {
            await dispatch(updateTimeTableSlot({
                timetableSlot,
                data: {
                    timetableId: data.timetableId,
                    day: data.day,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    teacherId: data.teacherId || null,
                    courseId: data.courseId,
                    type: data.type,
                    practicalFacilitatorId: data.practicalFacilitatorId || null
                }
            }
            )).unwrap();
            reset();
            alert("TimeTable Slot Updated successfully");
        } catch (error) {
            setErr(error);
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg mt-10">
            <div className=" bg-card">
                <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                    <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard/chairman/manage-timetablesSlots')}
                                className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            >
                                <ArrowLeft className="h-8 w-8" />
                            </button>
                        <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <CalendarDays className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Update Timetable Slot {user?.department?.deptName}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {err && (
                    <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                )}

                <form id="form-2"
                    onSubmit={handleSubmit(handlerUpdateTimeTableSlot)}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5" >
                                <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
                                Time Tables </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("timetableId")}
                            >
                                <option value="">Select Time Tables</option>
                                {timeTables.map((temp) => (
                                    <option key={temp._id} value={temp._id}>
                                        {temp?.batch?.batchName} , {"Sem No" + " " + temp.semester.semesterNumber + " " + "Year No" + temp.semester.studyYear}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {!selectedCourse?.hasPractical && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> Teacher
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("teacherId")}
                                >
                                    <option value="">Select Teachers</option>
                                    {teachers.map((teach) => (
                                        <option key={teach._id} value={teach._id}>
                                            {teach?.fullName}, {teach?.departmentTeacher ? teach?.departmentTeacher.deptName : "Not assign "}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" /> Day
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("day")}
                            >
                                <option value="Mon">Monday</option>
                                <option value="Tue">Tuesday</option>
                                <option value="Wed">Wednessday</option>
                                <option value="Thu">Thursday</option>
                                <option value="Fri">Friday</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Start Time
                            </label>
                            <input
                                form="form-2"
                                type="time"
                                placeholder=""
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("startTime")}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" /> End Time
                            </label>
                            <input
                                form="form-2"
                                type="time"
                                placeholder=""
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("endTime")}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Courses
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("courseId")}
                            >
                                <option value="">Select Course</option>
                                {courses.map((cour) => (
                                    <option key={cour._id} value={cour._id}>
                                        {cour.courseName} { }
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedCourse?.hasPractical && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" /> Practical Facilitator
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...register("practicalFacilitatorId")}
                                >
                                    <option value="">Select Teachers</option>
                                    {teachers.map((teach) => (
                                        <option key={teach._id} value={teach._id}>
                                            {teach.fullName}, {teach?.departmentTeacher ? teach?.departmentTeacher.deptName : "Not assign "}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" /> Type
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("type")}
                            >
                                <option value="theory">Theory</option>
                                <option value="practical">Practical</option>
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131]">
                        <Plus className="mr-2 h-4 w-4" /> Update Timetable Slot
                    </Button>

                </form>
            </div >
        </div>
    )
}