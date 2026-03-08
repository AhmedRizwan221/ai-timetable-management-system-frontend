import React, { useEffect, useState } from "react";
import Input from "../shrared/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store/course/course";
import Button from "../shrared/Button";
import { getSemesters } from "../../store/semester/semester";


export default function CreateCourse() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const [err, setErr] = useState("")

    const { user, error: userError, status } = useSelector((state) => state.auth);
    // console.log(user);
    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    // console.log(semesters);

    useEffect(() => {
        dispatch(getSemesters(user?.department?._id));
    }, [dispatch])

    const handlerCreateCourse = async (data) => {
        try {
            await dispatch(createCourse({
                courseName: data.courseName,
                theoryCredits: data.theoryCredits,
                practicalCredits: data.practicalCredits || null,
                semesterId: data.semesterId
            })).unwrap();
            reset();
            alert("Course created successfully");

            if (user.role === 'chairman') {
                Navigate('/dashboard/chairman')
            }
        } catch (error) {
            // console.log(error);
            setErr(error)
        }

    }
    return (
        <div>
            <h1>Create course</h1>
            <div>
                {err && (
                    <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                )}
                <form onSubmit={handleSubmit(handlerCreateCourse)}>
                    <Input
                        label="Course Name"
                        type="text"
                        placeholder="Enter Course Name"
                        {...register("courseName", { required: true })}
                    />
                    <Input
                        label="Theory Credits"
                        type="Number"
                        placeholder="Enter Theory Credits"
                        {...register("theoryCredits", { required: true })}
                    />
                    <Input
                        label="Practical Credits"
                        type="text"
                        placeholder="Enter Practical Credits"
                        {...register("practicalCredits")}
                    />
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
                    <Button
                        type="submit"
                    >
                        Create Course
                    </Button>
                </form>

            </div>

        </div>
    )
}