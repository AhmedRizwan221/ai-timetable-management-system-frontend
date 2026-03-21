import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeTableForm from "../components/shrared/TimeTable";
import { useForm } from "react-hook-form";
import { updateTimeTable } from "../store/timetable/timeTable";
import { getSemesters } from "../store/semester/semester";
import { getSections } from "../store/section/section";
import { getBatches } from "../store/batch/batch";
import { useParams } from "react-router-dom";



export default function EditTimeTable() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const [err, setErr] = useState("");
    const {timetableId} = useParams();
    // console.log("Time table id in component", timetableId);

    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    const { sections = [], error: sectionError } = useSelector((state) => state.section);


    useEffect(() => {
        if (user) {
            dispatch(getSemesters(user?.department?._id));
            dispatch(getBatches(user?.department?._id));
            dispatch(getSections(user?.department?._id));
        }
    }, [dispatch, user]);

    const handlerUpdateTimeTable = async (data) => {
        setErr("");

        try {
           await dispatch(updateTimeTable({
                timetableId,
                data: {
                    semesterId: data.semesterId,
                    batchId: data.batchId,
                    departmentId: data.departmentId,
                    sectionId: data.sectionId || null
                }
            })).unwrap();
            reset();
            alert("TimeTable Updated successfully");
        } catch (error) {
            setErr(error);
        }
    }

    return (
        <TimeTableForm
            onSubmit={handlerUpdateTimeTable}
            buttonText="Update"
            user={user}
            semesters={semesters}
            batches={batches}
            sections={sections}
            register={register}
            handleSubmit={handleSubmit}
            err={err}
            mode="update"
        />
    )
}