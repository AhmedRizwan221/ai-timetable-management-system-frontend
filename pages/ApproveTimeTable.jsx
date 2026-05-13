import { useDispatch, useSelector } from "react-redux";
import { approveTimetable, getTimeTableById, rejectTimetable } from "../store/timetable/timeTable.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function ApproveTimeTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timetableId } = useParams();
    const [rejectModal, setRejectModal] = useState(false);
    const [reason, setReason] = useState("");

    const { user } = useSelector((state) => state.auth);
    const { timeTables = [] } = useSelector((state) => state.timetable);
    // console.log(timeTables, "timetable array");
    const timetable = timeTables[0];
    // console.log(timetable, "first object of timetable");
    const slots = timetable?.slots || [];
    // console.log(slots, "slots ");

    const breakStartTime = timetable?.breakStartTime;
    const breakEndTime = timetable?.breakEndTime;

    // console.log(breakStartTime, breakEndTime);

    useEffect(() => {
        if (user) {
            dispatch(getTimeTableById(timetableId));
        }
    }, [dispatch, user]);

    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const getSLot = (day, time) => {
        // console.log(day, time);
        return slots.find(
            (slot) =>
                slot.day === day &&
                slot.startTime === time.startTime &&
                slot.endTime === time.endTime
        );
    };

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


    const timeSlots = slots.flatMap((slot) => {
        const slots = [
            {
                type: "lecture",
                startTime: slot.startTime,
                endTime: slot.endTime
            }
        ];

        if (breakStartTime && breakEndTime) {
            slots.push({
                type: "break",
                startTime: breakStartTime,
                endTime: breakEndTime
            })
        }

        return slots;
    });
    // console.log(timeSlots, "time slots ");

    const uniqueTimeSlots = [
        ...new Map(
            timeSlots.map((slot) => [
                `${slot.startTime}-${slot.endTime}`,
                slot
            ])
        ).values()
    ].sort((a, b) => a.startTime.localeCompare(b.startTime));
    // console.log(uniqueTimeSlots, "unique timetable slots ");



    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 ">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard/dean/manage-timetables')}
                                className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            >
                                <ArrowLeft className="h-8 w-8" />
                            </button>
                            <h1 className="text-2xl font-bold">Timetable Details</h1>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="p-4 mb-6">
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
                                Reason: {timetable.reason}
                            </p>
                        )}
                    </div>
                </div>


                {/* 🧾 SLOT GRID */}
                <div className="bg-white p-4 shadow rounded">
                    <table className="min-w-full border text-center text-sm">
                        <thead>
                            <tr className="bg-white">
                                <th className="border border-black px-2 py-3 font-bold">Day / Time</th>
                                {uniqueTimeSlots.map((slot, index) =>
                                (
                                    <th
                                        key={index}

                                        className="border border-black px-2 py-2 font-bold leading-tight"
                                    >
                                        {slot.type === "break"
                                            ? "Break ☕"
                                            : `Lecture ${index + 1}`}

                                        <br />

                                        <span className="font-normal text-xs">
                                            {slot.startTime} - {slot.endTime}
                                        </span>
                                    </th>
                                )
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {uniqueTimeSlots.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={uniqueTimeSlots.length + 1 || 2}
                                        className="text-center py-6 font-semibold text-red-500"
                                    >
                                        No slots found
                                    </td>
                                </tr>
                            ) : (
                                Days.map((day, dayIndex) => (
                                    <tr key={day}>
                                        <td className="border px-2 py-2 font-bold">{day}</td>
                                        {uniqueTimeSlots.map((time, index) => {
                                            // Render break only once (first row)
                                            if (time.type === "break") {
                                                if (dayIndex === 0) {
                                                    return (
                                                        <td
                                                            key={`${time.startTime}-${time.endTime}`}
                                                            rowSpan={Days.length}
                                                            className="border border-black px-2 py-3 font-bold text-center align-middle"
                                                        >
                                                            Break ☕
                                                        </td>
                                                    );
                                                }

                                                // skip break cell for other rows
                                                return null;
                                            }

                                            const slot = getSLot(day, time);
                                            // console.log(slot);
                                            return (
                                                <td
                                                    key={`${time.startTime}-${time.endTime}-${day}`}
                                                    className="border border-black px-2 py-3 min-w-[120px]"
                                                >
                                                    {slot ? (
                                                        <div className="whitespace-pre-line font-bold">
                                                            {slot.type === "theory"
                                                                ? slot.course?.courseName
                                                                : `${slot.course?.courseName} (Lab)`}
                                                        </div>
                                                    ) : null}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}

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
        </div>
    );
}