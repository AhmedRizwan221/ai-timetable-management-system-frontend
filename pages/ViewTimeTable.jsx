import { useDispatch, useSelector } from "react-redux";
import { approveTimetable, getTimeTableById, rejectTimetable } from "../store/timetable/timeTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ViewTimeTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { timetableId } = useParams();
    const [rejectModal, setRejectModal] = useState(false);
    const [reason, setReason] = useState("");

    const { user } = useSelector((state) => state.auth);
    const { timeTables = [] } = useSelector((state) => state.timetable);
    const timetable = timeTables[0];


    useEffect(() => {
        if (user && timetableId) {
            dispatch(getTimeTableById(timetableId));
        }
    }, [dispatch, user, timetableId]);

    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const getSlot = (day, time) => {
        return timeTables.flatMap((timetable) => timetable.slots || [])
            .find(
                (slot) =>
                    slot.day === day &&
                    `${slot.startTime}-${slot.endTime}` === time
            );
    };
    // console.log(getSlot);

    const timeSlots = [
        ...new Set(
            timeTables.flatMap((timetable) =>
                timetable?.slots?.map(
                    (slot) => `${slot.startTime}-${slot.endTime}`
                )
            )
        )
    ];

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/dashboard/chairman/manage-timetables')}
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
                        {/* Reject reason */}
                        {timetable.status === "rejected" && (
                            <p className="text-red-500 mt-2 text-sm">
                                Reason: {timetable.reason}
                            </p>
                        )}
                    </div>

                    {/* 🧾 SLOT GRID */}
                    <div className="bg-white p-4 shadow rounded">
                        <table className="min-w-full border text-center text-sm">
                            <thead>
                                <tr className="bg-white">
                                    <th className="border border-black px-2 py-3 font-bold">Day / Time</th>
                                    {timeSlots.map((time, index) => (
                                        <th key={index} className="border border-black px-2 py-2 font-bold leading-tight">
                                            Lecture {index + 1} <br />
                                            <span className="font-normal text-xs">{time}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {timeSlots.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={timeSlots.length + 1 || 2}
                                            className="text-center py-6 font-semibold text-red-500"
                                        >
                                            No slots found
                                        </td>
                                    </tr>
                                ) : (
                                    Days.map((day) => (
                                        <tr key={day}>
                                            <td className="border px-2 py-2 font-bold">{day}</td>
                                            {timeSlots.map((time) => {
                                                const slot = getSlot(day, time);
                                                return (
                                                    <td key={time} className="border border-black px-2 py-3 min-w-[120px]">
                                                        {slot ? (
                                                            <div className="whitespace-pre-line font-bold">
                                                                {slot.type === 'theory' ? slot.course?.courseName : slot.course?.courseName + "(Lab)"}
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
                </div>
            </div>
        </div>
    );
}