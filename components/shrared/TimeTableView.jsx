import React, { useMemo, useState, useEffect } from "react";
import { GraduationCap, FileDown, Users, CalendarDays } from "lucide-react"
import DownloadTimeTablePDF from "./DownloadTimeTablePdf";
// import Button from "../shrared/Button";

const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function TimeTableView({
    slots,
    user,
    totalTeachers,
    totalCourses,
    totalChairmans,
    timeTableSlot = [],
    departments = [],
    totalDeans,
}) {


    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    // console.log(selectedDepartment);

    // filter functionality
    const filteredTimeTable = useMemo(() => {
        if (!timeTableSlot) return [];

        return timeTableSlot.filter((slot) => {
            // console.log(slot);
            const matchBatch = slot.batch?.batchName?.toLowerCase().trim() ===
                selectedBatch.toLowerCase().trim();
            const matchSemester = Number(slot?.semester?.semesterNumber) === Number(selectedSemester);
            const matchYear = Number(slot?.semester?.studyYear) === Number(selectedYear);
            const matchSection = slot.section
                ? slot.section.sectionName.toLowerCase().trim() === selectedSection?.toLowerCase().trim()
                : true;
            const matchDepartment = selectedDepartment
                ? slot?.department?.deptName?.toLowerCase().trim() ===
                selectedDepartment?.toLowerCase().trim()
                : true;
            // console.log("department compare:", slot?.department?.deptName);

            // console.log({
            //     // matchBatch,
            //     matchSemester,
            //     matchYear,
            //     // matchSection,
            //     // matchDepartment
            // });
            // console.log("slot year:", slot?.semester?.studyYear);
            // console.log("selected year:", selectedYear);
            // console.log("year match:", Number(slot?.semester?.studyYear) === Number(selectedYear));
            // return matchBatch && matchSemester && matchYear && matchSection && matchDepartment && new Map(timeTableSlot.map((item) => [item?.course?.courseName, item])).values();
            return (
                matchBatch &&
                matchSemester &&
                matchYear &&
                matchSection &&
                matchDepartment
            );
        });

    }, [timeTableSlot, selectedBatch, selectedSemester, selectedYear, selectedSection, selectedDepartment]);
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


    const uniqueDepartment = useMemo(() => {
        return Array.from(
            new Map(departments.map((dept) => [dept?.deptName, dept])).values()
        )
    }, [departments]);

    // console.log("Unique departments", uniqueDepartment)

    useEffect(() => {
        if (uniqueDepartment.length > 0 && !selectedDepartment) {
            setSelectedDepartment(uniqueDepartment[0]?.deptName);
        }
    }, [uniqueDepartment, selectedDepartment]);


    const mergedCourses = Object.values(
        filteredTimeTable.reduce((acc, item) => {
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
                            {user?.fullName || "UserName"}
                        </h1>
                    </div>
                </div>)}
                {!user && (<div className="min-w-0 flex flex-col">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Time Table Management System</h1>
                    <p className="hidden md:flex text-s font-medium pb-2 pl-2">Select your Department, Batch, Year, Semester and Department to continue</p>
                </div>)}
                <button
                    onClick={() => DownloadTimeTablePDF({
                        Days,
                        timeSlots,
                        filteredTimeTable,
                        getSLot
                    })}
                    title="Download PDF"
                    className="flex items-center justify-center gap-2 bg-[#1D293D] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-lg hover:bg-[#2a3a54] transition-all shadow-sm shrink-0"
                >
                    <FileDown size={20} />
                    {/* Hidden on mobile, shown on small screens (640px) and up */}
                    <span className="hidden sm:inline font-medium">Download PDF</span>
                </button>
            </header>
            <main className="p-2 md:p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
                    <FilterSelect
                        label="Department"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        options={uniqueDepartment.map((dept) => ({
                            val: dept?.deptName,
                            lab: dept?.deptName
                        }))}
                    />
                </div>
                {user && (
                    < div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8">
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
                        {user?.role === 'admin' && (
                            <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                                <Users className="h-5 w-5 text-primary-foreground" />
                                <div className="block">
                                    <h2 className="text-xl font-bold text-foreground ">{totalDeans}</h2>
                                    <p className="text-xs text-muted-foreground">Total Deans</p>
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
                    </div>)
                }

                <div className="w-full space-y-8 md:p-4 bg-white mt-4">
                    <div className="overflow-x-auto">
                        {/* <h1>Department {dept} Semester {selectedSemester} Year {selectedYear}</h1> */}
                        <table className="min-w-full border-collapse border border-black text-center text-sm">
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
                                            <td className="border border-black px-4 py-3 font-bold text-left">{day}</td>
                                            {
                                                timeSlots.map((time) => {
                                                    const slot = getSLot(day, time);
                                                    return (
                                                        <td key={time} className="border border-black px-2 py-3 min-w-[120px]">
                                                            {slot ? (
                                                                <div className="whitespace-pre-line font-bold">
                                                                    {slot.type === 'theory' ? slot.course?.courseName : slot.course?.courseName + "(Lab)"}
                                                                </div>
                                                            ) : null}
                                                        </td>
                                                    );
                                                })

                                            }
                                        </tr>
                                    )))}
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
            </main >
        </div >
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
            <option value="">Select {label}</option>
            {options.map(opt => (
                <option key={opt.val} value={opt.val}>{opt.lab}</option>
            ))}
        </select>
    </div>
);

export default TimeTableView;