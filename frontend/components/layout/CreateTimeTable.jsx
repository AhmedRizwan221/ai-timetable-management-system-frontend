import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeptallTimeTables } from "../../store/timetable/timeTable";
import { getUser } from "../../store/auth/authSlice";
import Button from "../shrared/Button";
import { useForm } from "react-hook-form";
import { getSemesters } from "../../store/semester/semester";
import { getBatches } from "../../store/batch/batch";
import { getSections } from "../../store/section/section";
import { createTimeTable, clearError } from "../../store/timetable/timeTable";
import { useNavigate } from "react-router-dom";
import { createTimeTableSlot } from "../../store/timetableSlot/timetableSlot";
import { getTeachers } from "../../store/user/user";
import { getAllCoursesInDept } from "../../store/course/course";
import { CalendarDays, Users, BookOpen, Layers, Plus, CalendarClock, Clock } from "lucide-react";
import TimeTableForm from "../shrared/TimeTable";

export default function CreateTimeTable() {
    const dispatch = useDispatch();
    const [err, setErr] = useState("");
    const { register: registerTimetable, handleSubmit: handlerTimetable, reset: resetTimetable } = useForm();
    const { register: registerTimetableSlot, handleSubmit: handlerTimetableSlot, reset: resetTimetableSlot, watch, unregister } = useForm();
    const navigate = useNavigate();

    const { timeTables = [], error: timetableError } = useSelector((state) => state.timetable);
    console.log("Time tables : ", timeTables, timeTables?.batch?._id);
    const { user, error: userError, status } = useSelector((state) => state.auth);
    // console.log(user);
    // console.log(user?.department?._id);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    // console.log("Semester of dept: ", semesters);

    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    // console.log("Batches of dept: ", batches);

    const { sections = [], error: sectionError } = useSelector((state) => state.section);
    // console.log("Sections of dept", sections);

    const { teachers = [], totalTeachers, error: teacherError } = useSelector((state) => state.user);
    // console.log("Teachers" , teachers, "Total Teachers ",totalTeachers);

    const { courses = [], error: courseError } = useSelector((state) => state.course);
    // console.log("Courses", courses)

    const { timeTableSlot = [], error: TimeTableSLotError } = useSelector((state) => state.timetabelSlot)
    // console.log("Batch All time tables", timeTableSlot);

    // now fetched all courses using deptId and render here 
    useEffect(() => {
        if (user) {
            dispatch(getDeptallTimeTables(user?.department?._id));
            dispatch(getSemesters(user?.department?._id));
            dispatch(getBatches(user?.department?._id));
            dispatch(getSections(user?.department?._id));
            dispatch(getTeachers());
            dispatch(getAllCoursesInDept(user?.department?._id));
            dispatch(clearError());
        }
    }, [dispatch, user]);


    // if course has practical then we show practicalFacilitator field 
    const selectedCourseId = watch("courseId");
    const selectedCourse = courses.find(
        (c) => c._id === selectedCourseId
    );
    // console.log(selectedCourse);

    useEffect(() => {
        if (!selectedCourse?.hasPractical) {
            unregister("practicalFacilitatorId");
        }
        if (selectedCourse?.hasPractical) {
            unregister("teacherId");
        }

    }, [selectedCourse, unregister]);

    const handleCreatTimeTable = async (data) => {
        setErr(" ");
        try {
            // console.log(data);
            await dispatch(createTimeTable({
                semesterId: data.semesterId,
                batchId: data.batchId,
                departmentId: data.departmentId,
                sectionId: data.sectionId || null
            })).unwrap();
            resetTimetable();
            alert("TimeTable created successfully");

        } catch (error) {
            setErr(error);
        }
    }



    const handleCreateTimeTableSlot = async (data) => {
        setErr(" ");
        // console.log(data.teacherId);
        try {
            await dispatch(createTimeTableSlot({
                timetableId: data.timetableId,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                teacherId: data.teacherId || null,
                courseId: data.courseId,
                type: data.type,
                practicalFacilitatorId: data.practicalFacilitatorId || null
            }
            )).unwrap();
            resetTimetableSlot();
            alert("TimeTable Slot created successfully");

            // if (user?.role === 'chairman') {
            //     navigate('/dashboard/create-timetable')
            // }

        } catch (err) {
            setErr(err);
        }

    }

    return (
        // time table card
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">

            <TimeTableForm
                onSubmit={handleCreatTimeTable}
                buttonText="Create"
                user={user}
                semesters={semesters}
                batches={batches}
                sections={sections}
                register={registerTimetable}
                handleSubmit={handlerTimetable}
                err={err}
            />

            {/* TIme table slot card  */}
            <div className="bg-white border border-gray-200 rounded-lg mt-10">
                <div className=" bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Create Timetable Slot {user?.department?.deptName}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                    )}

                    <form id="form-2"
                        onSubmit={handlerTimetableSlot(handleCreateTimeTableSlot)}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5" >
                                    <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
                                    Time Tables </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...registerTimetableSlot("timetableId", { required: true })}
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
                                        {...registerTimetableSlot("teacherId", { required: true })}
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
                                    {...registerTimetableSlot("day", { required: true })}
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
                                    {...registerTimetableSlot("startTime", { required: true })}
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
                                    {...registerTimetableSlot("endTime", { required: true })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5">
                                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Courses
                                </label>
                                <select
                                    className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    {...registerTimetableSlot("courseId", { required: true })}
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
                                        {...registerTimetableSlot("practicalFacilitatorId")}
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
                                    {...registerTimetableSlot("type", { required: true })}
                                >
                                    <option value="theory">Theory</option>
                                    <option value="practical">Practical</option>
                                </select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131]">
                            <Plus className="mr-2 h-4 w-4" /> Create Timetable Slot
                        </Button>

                    </form>
                </div >
            </div>
        </div>
    )
}