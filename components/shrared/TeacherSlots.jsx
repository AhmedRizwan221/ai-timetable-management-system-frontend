import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSlotsOfTeacher } from "../../store/chatbot/chatbot";
import QueryChatBot from "./QueryChatBot";
import TimeTableView from "./TimeTableView";
import { GraduationCap, FileDown, Users, CalendarDays } from "lucide-react"

export default function TeacherSlots() {

    const dispatch = useDispatch();


    const { user } = useSelector((state) => state.auth);
    console.log(user);

    const { teacherSlots, totalTeacherSlots } = useSelector((state) => state.chatbot);
    console.log(teacherSlots, totalTeacherSlots);

    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const timeSlots = teacherSlots.flatMap((slot) => {
        const slots = [
            {
                type: "lecture",
                startTime: slot.startTime,
                endTime: slot.endTime
            }
        ];

        if (slot?.timetable?.breakStartTime && slot?.timetable?.breakEndTime) {
            slots.push({
                type: "break",
                startTime: slot.timetable.breakStartTime,
                endTime: slot.timetable.breakEndTime
            });
        }

        return slots;
    });

    const uniqueTimeSlots = [
        ...new Map(
            timeSlots.map((slot) => [
                `${slot.startTime}-${slot.endTime}`,
                slot
            ])
        ).values()
    ].sort((a, b) => a.startTime.localeCompare(b.startTime));
    // console.log(uniqueTimeSlots);

    const getSLot = (day, time) => {
        return teacherSlots.find(
            (slot) =>
                slot.day === day &&
                slot.startTime === time.startTime &&
                slot.endTime === time.endTime
        );
    };
    // console.log(getSLot);

    const mergedCourses = Object.values(
        teacherSlots.reduce((acc, item) => {
            const courseName = item?.course?.courseName;

            if (!acc[courseName]) {
                acc[courseName] = {
                    courseName,
                    courseFacilitator: "",
                    practicalFacilitator: "",
                    creditHours: item?.course?.creditHours
                };
            }

            // Theory teacher
            if (item?.teacher?.fullName) {
                acc[courseName].courseFacilitator = item.teacher.fullName;
            }

            // Practical teacher
            if (item?.practicalFacilitator?.fullName) {
                acc[courseName].practicalFacilitator =
                    item.practicalFacilitator.fullName;
            }

            return acc;
        }, {})
    );

    return (
        <div className="bg-white border border-gray-200 rounded-lg w-full">
            <header className="p-4 sm:p-6 border-b bg-white flex items-center justify-between gap-4">
                {user && (<div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                        <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D293D]" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                            {teacherSlots.teacher?.fullName || "UserName"}
                        </h1>
                    </div>
                </div>)}
                {!user && (<div className="min-w-0 flex flex-col">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Time Table slots for {teacherSlots.teacher?.fullName}</h1>
                </div>)}
            </header>
            <main>
                <div className="w-full space-y-8 md:p-4 bg-white mt-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-black text-center text-sm">
                            <thead>
                                <tr className="bg-white">
                                    <th className="border border-black px-2 py-3 font-bold">
                                        Day / Time
                                    </th>

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
                                {Days.map((day, dayIndex) => (
                                    <tr key={day}>
                                        <td className="border border-black px-4 py-3 font-bold text-left">
                                            {day}
                                        </td>
                                        {uniqueTimeSlots.map((time, index) => {
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-black text-left text-xs">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-black px-2 py-1 w-12 sm:text-sm">S.No.</th>
                                    <th className="sm:text-sm text-[10] border border-black px-2 py-1">Course Name</th>
                                    <th className="border border-black px-2 py-1 w-24">Credit Hours</th>
                                    <th className="border border-black px-2 py-1">Course Facilitator</th>
                                    <th className="border border-black px-2 py-1">Practical Facilitator</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedCourses.map((timetable, idx) => (
                                    <tr key={idx}>
                                        <td className="border border-black px-2 py-1 font-bold">{String(idx + 1).padStart(2, '0')}</td>
                                        <td className="border border-black px-2 py-1 font-medium">{timetable?.courseName}</td>
                                        <td className="border border-black px-2 py-1">
                                            {(timetable?.creditHours?.theory ?? 0) + " + " + (timetable?.creditHours?.practical ?? 0)}
                                        </td>
                                        <td className="border border-black px-2 py-1">{timetable?.courseFacilitator}</td>
                                        <td className="border border-black px-2 py-1">{timetable?.practicalFacilitator || ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <div>
                <QueryChatBot role={user.role} />
            </div>
        </div>

    )
}