import React, { useMemo, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GraduationCap, FileDown, Users, CalendarDays } from "lucide-react"
// import Button from "../shrared/Button";

const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function TimeTableView({
    slots = [],
    user,
    totalTeachers,
    totalCourses,
    totalChairmans
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(user);

    const [selectedBatch, setSelectedBatch] = useState("morning");
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedSection, setSelectedSection] = useState("A");

    const { timeTableSlot = [], error, totalSlots } = useSelector((state) => state.timetabelSlot);

    // filter functionality
    const filteredTimeTable = useMemo(() => {
        if (!slots) return [];

        return slots.filter((slot) => {
            // console.log(slot);
            const matchBatch = slot.batch?.batchName?.toLowerCase().trim() ===
                selectedBatch.toLowerCase().trim();
            const matchSemester = Number(slot?.semester?.semesterNumber) === Number(selectedSemester);
            const matchYear = Number(slot?.semester?.studyYear) === Number(selectedYear);
            const matchSection = slot.section?.sectionName.toLowerCase().trim() === selectedSection?.toLowerCase().trim();

            // console.log("Batch compare:", slot.batch?.batchName, selectedBatch);

            // console.log({
            //     matchBatch,
            //     matchSemester,
            //     matchYear,
            //     matchSection
            // });
            return matchBatch && matchSemester && matchYear && matchSection;
        });
    }, [timeTableSlot, selectedBatch, selectedSemester, selectedYear, selectedSection]);
    // console.log(filteredTimeTable);


    // get times of particular slot 
    const timeSlots = [... new Set(
        filteredTimeTable.map((slot) => `${slot.startTime}-${slot.endTime}`)
    )];


    const getSLot = (day, time) => {
        return filteredTimeTable.find(
            slot =>
                slot.day === day &&
                `${slot.startTime}-${slot.endTime}` === time
        );
    }


    return (
        <div className="bg-white border border-gray-200 rounded-lg">
            <header className="p-4 sm:p-6 border-b bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                        <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D293D]" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                            {user?.fullName || "UserName"}
                        </h1>
                    </div>
                </div>
                <button
                    title="Download PDF"
                    className="flex items-center justify-center gap-2 bg-[#1D293D] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-lg hover:bg-[#2a3a54] transition-all shadow-sm shrink-0"
                >
                    <FileDown size={20} />
                    {/* Hidden on mobile, shown on small screens (640px) and up */}
                    <span className="hidden sm:inline font-medium">Download PDF</span>
                </button>
            </header>
            <main className="p-4">
                <div className="flex items-center justify-between gap-2">
                    <FilterSelect
                        label="Batch"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        options={[{ val: "morning", lab: "Morning" }, { val: "evening", lab: "Evening" }]}
                    />
                    <FilterSelect
                        label="Year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        options={[1, 2, 3, 4].map(y => ({ val: y, lab: `Year ${y}` }))}
                    />
                    <FilterSelect
                        label="Semester"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(Number(e.target.value))}
                        options={[1, 2].map(s => ({ val: s, lab: `Semester ${s}` }))}
                    />
                    <FilterSelect
                        label="Section"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        options={['A', 'B'].map(s => ({ val: s, lab: `Section ${s}` }))}
                    />
                </div>

                {/* information grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8">
                    {user?.role === 'chairman' && (
                        <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                            <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            <div className="block">
                                <h2 className="text-xl font-bold text-foreground ">{slots}</h2>
                                <p className="text-xs text-muted-foreground">Total Slots</p>
                            </div>

                        </div>
                    )}
                    {user?.role === 'dean' && (
                        <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                            <Users className="h-5 w-5 text-primary-foreground" />
                            <div className="block">
                                <h2 className="text-xl font-bold text-foreground ">{totalChairmans}</h2>
                                <p className="text-xs text-muted-foreground">Total Chairmans</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                        <Users className="h-5 w-5 text-primary-foreground" />
                        <div className="block">
                            <h2 className="text-xl font-bold text-foreground ">{totalTeachers}</h2>
                            <p className="text-xs text-muted-foreground">Total Teachers</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        <div className="block">
                            <h2 className="text-xl font-bold text-foreground ">{totalCourses}</h2>
                            <p className="text-xs text-muted-foreground">Total Courses</p>
                        </div>
                    </div>
                </div>
            </main>
            <table className="min-w-full border border-black text-center text-sm">

                {/* HEADER */}
                <thead>
                    <tr>
                        <th className="border px-3 py-2">Day / Time</th>
                        {timeSlots.map((time, i) => (
                            <th key={i} className="border px-3 py-2">
                                Lecture {i + 1}
                                <br />
                                <span className="text-xs">{time}</span>
                            </th>
                        ))}
                    </tr>
                </thead>


                {/* BODY */}
                <tbody>
                    {Days.map((day) => (
                        <tr key={day}>
                            <td className="border px-3 py-2 font-bold text-left">{day}</td>

                            {timeSlots.map((time) => {
                                const slot = getSlot(day, time);

                                return (
                                    <td key={time} className="border px-2 py-3 relative group">
                                        {slot && (
                                            <div className="font-semibold text-sm">

                                                {/* Course */}
                                                {slot.course?.courseName}

                                                {/* LAB */}
                                                {slot.type === "practical" && (
                                                    <div className="text-xs underline mt-1">
                                                        {slot.course?.courseName} LAB
                                                    </div>
                                                )}

                                                {/* Teacher */}
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {slot.type === "theory"
                                                        ? slot.teacher?.fullName
                                                        : slot.practicalTeacher?.fullName}
                                                </div>

                                                {/* ACTIONS (ONLY CHAIRMAN) */}
                                                {isChairman && (
                                                    <div className="flex gap-2 mt-2 justify-center opacity-0 group-hover:opacity-100 transition">
                                                        <button
                                                            onClick={() => navigate(`/dashboard/chairman/edit-timetableSlots/${slot._id}`)}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>

                                                        <button
                                                            onClick={() => console.log("delete", slot._id)}
                                                            className="p-1 hover:bg-red-100 rounded"
                                                        >
                                                            <Trash size={14} className="text-red-500" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const FilterSelect = ({ label, value, onChange, options }) => (
    <div className="w-full">
        <label className="flex items-center gap-1.5">{label}</label>
        <select
            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={value}
            onChange={onChange}
        >
            {options.map(opt => (
                <option key={opt.val} value={opt.val}>{opt.lab}</option>
            ))}
        </select>
    </div>
);

export default TimeTableView;