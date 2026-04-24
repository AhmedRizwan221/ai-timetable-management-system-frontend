
import { useDispatch, useSelector } from "react-redux";
import { approveTimetable, getTimeTableById, rejectTimetable } from "../store/timetable/timeTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeTableView from "../components/shrared/TimeTableView";


export default function ApproveTimeTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timetableId } = useParams();
    const [rejectModal, setRejectModal] = useState(false);
    const [reason, setReason] = useState("");

    const { user } = useSelector((state) => state.auth);
    const { timeTables = [] } = useSelector((state) => state.timetable);

    const timetable = timeTables[0]; // 🔥 fix


    useEffect(() => {
        if (user && timetableId) {
            dispatch(getTimeTableById(timetableId));
        }
    }, [dispatch, user, timetableId]);

    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const getSlot = (day, startTime, endTime) => {
        return timetable?.slots?.find(
            (slot) =>
                slot.day === day &&
                slot.startTime === startTime &&
                slot.endTime === endTime
        );
    };

    if (!timetable) return <p>Loading...</p>;

    const handleApprove = async () => {
        try {
            await dispatch(approveTimetable({
                timetableId,
                data: {
                    status: "approved"
                }
            }));
            setReason("");

            navigate('/dashboard/dean/manage-timetables')

        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async () => {
        try {
            await dispatch(rejectTimetable({
                timetableId,
                data: {
                    status: "rejected",
                    reason: reason || "No Response Provided"
                }
            }));

            setRejectModal(false);
            setReason("");

            navigate('/dashboard/dean/manage-timetables');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-6">

            {/* Header */}
            <h1 className="text-2xl font-semibold mb-4">Timetable Details</h1>

            {/* Info */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><b>Department:</b> {timetable.department?.deptName}</p>
                    <p><b>Semester:</b> {timetable.semester?.semesterNumber}</p>
                    <p><b>Year:</b> {timetable.semester?.studyYear}</p>
                    <p><b>Batch:</b> {timetable.batch?.batchName}</p>
                    <p><b>Section:</b> {timetable.section?.sectionName || "Not"}</p>
                    <p><b>Faculty:</b> {timetable.faculty?.facultyName}</p>
                </div>

                {/* Status */}
                <div className="mt-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${timetable.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : timetable.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {timetable.status}
                    </span>
                </div>

                {/* Actions */}
                {timetable.status === "pending" && (
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => handleApprove(timetable._id)}
                            className="bg-green-500 text-white px-4 py-1 rounded"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => setRejectModal(true)}
                            className="bg-red-500 text-white px-4 py-1 rounded"
                        >
                            Reject
                        </button>
                    </div>
                )}

                {/* Reject reason */}
                {timetable.status === "rejected" && (
                    <p className="text-red-500 mt-2 text-sm">
                        Reason: {timetable.rejectionReason}
                    </p>
                )}
            </div>

            {/* 🧾 SLOT GRID */}
            <div className="bg-white p-4 shadow rounded">
                <table className="min-w-full border text-center text-sm">
                    <thead>
                        <tr>
                            <th className="border px-2 py-2">Day</th>
                            {timetable.slots?.map((slot, i) => (
                                <th key={i} className="border px-2 py-2">
                                    {slot.startTime} - {slot.endTime}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Days.map((day) => (
                            <tr key={day}>
                                <td className="border px-2 py-2 font-bold">{day}</td>

                                {timetable.slots?.map((s, i) => {
                                    const slot = getSlot(day, s.startTime, s.endTime);

                                    return (
                                        <td key={i} className="border px-2 py-2">
                                            {slot ? (
                                                <div>
                                                    <p className="font-semibold">
                                                        {slot.course?.courseName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {slot.teacher?.fullName}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔥 Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-80">
                        <h2 className="font-semibold mb-2">Reject Timetable</h2>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full border p-2 mb-2"
                            placeholder="Enter reason"
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setRejectModal(false)}>Cancel</button>

                            <button
                                onClick={handleReject}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}