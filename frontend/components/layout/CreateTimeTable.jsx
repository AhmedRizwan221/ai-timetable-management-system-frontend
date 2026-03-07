import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeptallTimeTables } from "../../store/timetable/timeTable";
import { getUser } from "../../store/auth/authSlice";
import Select from "../shrared/Select";
import { useForm } from "react-hook-form";
import { getSemesters } from "../../store/semester/semester";
import { getBatches } from "../../store/batch/batch";
import { getSections } from "../../store/section/section";

export default function CreateTimeTable() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const { timetables = [], error: timetableError } = useSelector((state) => state.timetable);
    console.log("Time tables : ", timetables);

    const { user, error: userError, status } = useSelector((state) => state.auth);
    console.log(user);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    console.log("Semester of dept: ", semesters);

    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    console.log("Batches of dept: ", batches);

    const { sections = [], error: sectionError } = useSelector((state) => state.section);
    console.log("Sections of dept", sections);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getUser());
        }

        dispatch(getDeptallTimeTables(user?.department?._id));
        dispatch(getSemesters(user?.department?._id));
        dispatch(getBatches(user?.department?._id));
        dispatch(getSections(user?.department?._id));
    }, [dispatch]);


    // const handleCreatTimeTable = async (data) => {

    // }

    return (
        <div>
            <h1>Create time table</h1>

            <div>
                {/* <form
                    onSubmit={handleSubmit(handleCreatTimeTable)}>
                    <div>
                        <Select
                            className=""
                            {...register("semesterId", { required: true })}
                        >
                            <option>Select Semester</option>
                            {semesters.map((sem) => (
                                <option>
                                    { }
                                </option>
                            ))}
                        </Select>
                    </div>


                </form> */}
            </div>
        </div>
    )
}