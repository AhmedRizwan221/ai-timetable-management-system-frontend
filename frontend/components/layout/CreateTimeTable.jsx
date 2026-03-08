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

export default function CreateTimeTable() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const { timeTables = [], error: timetableError } = useSelector((state) => state.timetable);
    console.log("Time tables : ", timeTables);

    const { user, error: userError, status } = useSelector((state) => state.auth);
    // console.log(user);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    // console.log("Semester of dept: ", semesters);

    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    // console.log("Batches of dept: ", batches);

    const { sections = [], error: sectionError } = useSelector((state) => state.section);
    // console.log("Sections of dept", sections);

    const {teachers = [], totalTeachers, error: teacherError } = useSelector((state) => state.user);
    console.log("Teachers" , teachers, "Total Teachers ",totalTeachers);


    
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
        await dispatch(createTimeTableSlot({
            timetableId: data.timetableId,
            day: data.day,
            startTime,
            endTime,
            teacherId: data.teacherId,
            courseId,
            type,
        }
        )

        )
    }

    return (
        <div>
            <h1>Create time table for {user?.department.deptName}</h1>

            <div>
                {timetableError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{timetableError.message}</p>
                )}
                <form
                    onSubmit={handleSubmit(handleCreatTimeTable)}>
                    <div>
                        <label >Select Semester</label>
                        <select
                            className="border border-gray-400 p-2 rounded-lg"
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
                    <div>
                        <label >Select Batch</label>
                        <select
                            className="border border-gray-400 p-2 rounded-lg"
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
                    <div>
                        <div>
                            <label>Select Department</label>
                            <select
                                className="border border-gray-400 p-2 rounded-lg"
                                {...register("departmentId", { required: true })}
                                defaultValue={user?.department?._id}
                            >
                                <option value={user?.department?._id}>
                                    {user?.department?.deptName}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Select Section</label>
                        <select
                            className="border border-gray-400 p-2 rounded-lg"
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
                    <Button type="submit" className="w-full">
                        Create Time Table
                    </Button>
                </form>
            </div>


            <div>
                <h1>Create time table Slot for {user?.department.deptName}</h1>

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
                                        {teach.fullName} {}
                                    </option>
                                ))}
                            </select>
                           
                            <div className="flex justify-between">
                                <select
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                >
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednessday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                </select>
                                <Input
                                    label="Start Time"
                                    type="time"
                                    placeholder="Add Batch"
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                />
                                 <Input
                                    label="End Time"
                                    type="time"
                                    placeholder="Add Batch"
                                    className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>



    )
}