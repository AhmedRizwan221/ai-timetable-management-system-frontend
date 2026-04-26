import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeTableForm from "../components/shrared/TimeTable";
import { useForm } from "react-hook-form";
import { updateTimeTable } from "../store/timetable/timeTable";
import { getAllSemesters } from "../store/semester/semester";
import { getSections } from "../store/section/section";
import { allBatches } from "../store/batch/batch";
import { useNavigate, useParams } from "react-router-dom";



export default function EditTimeTable() {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const [err, setErr] = useState("");
    const { timetableId } = useParams();
    // console.log("Time table id in component", timetableId);

    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    const { semesters = [], error: semesterError } = useSelector((state) => state.semester);
    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    const { sections = [], error: sectionError } = useSelector((state) => state.section);

    useEffect(() => {
        if (user) {
            dispatch(getAllSemesters(user?.department?._id));
            dispatch(allBatches(user?.department?._id));
            dispatch(getSections(user?.department?._id));
        }
    }, [dispatch, user]);

    const handlerUpdateTimeTable = async (data) => {
        setErr("");
        console.log(data);
        try {
            await dispatch(updateTimeTable({
                timetableId,
                data: {
                    semesterId: data.semesterId,
                    batchId: data.batchId,
                    departmentId: data.departmentId,
                    sectionId: data.sectionId || null,
                    status: 'pending',
                    approvedBy: null
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
            redirectUrl='/dashboard/chairman/manage-timetables'
        />
    )
}