import React, { useEffect, useMemo, useState } from "react";
import { getAllSlots } from "../../store/timetableSlot/timetableSlot";
import { useDispatch, useSelector } from "react-redux";
import { GraduationCap, MessageCircle, X, CalendarDays, Users, FileDown, ChevronDown } from "lucide-react";
import { getAllTeachersInDept } from "../../store/user/user";
import { allCourses } from "../../store/course/course";
import TimeTableView from "../shrared/TimeTableView";
import Chatbot from "../chatbot/chatbot";

function ChairmanDashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const [selectedBatch, setSelectedBatch] = useState("morning");
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedSection, setSelectedSection] = useState("A");

    const { user } = useSelector((state) => state.auth);
    const { timeTableSlot = [], error, totalSlots } = useSelector((state) => state.timetabelSlot);
    const { totalTeachers } = useSelector((state) => state.user);
    const { totalCourses } = useSelector((state) => state.course);

    const Days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    // console.log(totalCourses);

    useEffect(() => {
        if (user) {
            dispatch(getAllSlots(user?.department?._id));
            dispatch(getAllTeachersInDept(user?.department?._id));
            dispatch(allCourses(user?.department?._id));
        }
    }, [dispatch, user]);


    // filter functionality
    const filteredTimeTable = useMemo(() => {
        if (!timeTableSlot) return [];

        return timeTableSlot.filter((slot) => {
            // console.log(slot);
            // console.log(slot?.semester?.studyYear);
            const matchBatch = slot.batch?.batchName?.toLowerCase().trim() ===
                selectedBatch.toLowerCase().trim();
            const matchSemester = Number(slot?.semester?.semesterNumber) === Number(selectedSemester);
            const matchYear = Number(slot?.semester?.studyYear) === Number(selectedYear);
            const matchSection = slot.section
                ? slot.section.sectionName.toLowerCase().trim() === selectedSection?.toLowerCase().trim()
                : true;

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

    // console.log(mergedCourses);
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-lg">
                <header className="p-4 sm:p-6 border-b bg-white flex items-center justify-between gap-4">
                    {/* Left Side: Profile Info */}
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-[#1D293D]" />
                        </div>
                        <div className="min-w-0 flex flex-col">
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                                {user?.fullName || "Chairman"}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                {user?.department?.deptName || "Department"}
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Action Button */}
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
                    {/* filter time tables  */}
                    <div className="block md:flex items-center justify-between gap-2">
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
                        <div className="flex items-center gap-4 bg-[#1D293D] text-white hover:bg-[#162131] py-4 px-4 border border-gray-200 rounded-lg">
                            <CalendarDays className="h-5 w-5 text-primary-foreground" />
                            <div className="block">
                                <h2 className="text-xl font-bold text-foreground ">{totalSlots}</h2>
                                <p className="text-xs text-muted-foreground">Total Slots</p>
                            </div>
                        </div>
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

                    {/* main body of timetable */}
                    <div className="w-full space-y-8 p-4 bg-white">
                        {/* Main Timetable */}
                        <div className="overflow-x-auto">
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
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Course Facilitator Table (Bottom Section) */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-black text-left text-xs">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-black px-2 py-1 w-12">S.No.</th>
                                        <th className="border border-black px-2 py-1">Course Name</th>
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
            </div>
            <Chatbot role={user?.role} />
        </div>
    )

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

export default ChairmanDashboard;






















// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GraduationCap, Search, CalendarDays, Users, FileDown } from "lucide-react";

// // Redux Actions
// import { getAllTimeTableSlot } from "../../store/timetableSlot/timetableSlot";
// import { getUser } from "../../store/auth/authSlice";
// import { getAllTeachersInDept } from "../../store/user/user";
// import { getAllCoursesInDept } from "../../store/course/course";

// // Components
// import Input from "../shrared/Input";

// const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// function ChairmanDashboard() {
//     const dispatch = useDispatch();

//     // Local State
//     const [search, setSearch] = useState("");
//     const [selectedBatch, setSelectedBatch] = useState("morning");
//     const [selectedSemester, setSelectedSemester] = useState(2);
//     const [selectedYear, setSelectedYear] = useState(4);

//     // Redux State
//     const { user, status } = useSelector((state) => state.auth);
//     const { timeTableSlot = [], totalSlots } = useSelector((state) => state.timetabelSlot);
//     // console.log(timeTableSlot);
//     const { totalTeachers } = useSelector((state) => state.user);
//     const { totalCourses } = useSelector((state) => state.course);

//     /* ---------------- FETCH DATA ---------------- */
//     useEffect(() => {
//         if (status === "idle") {
//             dispatch(getUser());
//         }
//         if (user?.department?._id) {
//             const deptId = user.department._id;
//             dispatch(getAllTimeTableSlot(deptId));
//             dispatch(getAllTeachersInDept(deptId));
//             dispatch(getAllCoursesInDept(deptId));
//         }
//     }, [dispatch, user, status]);

//     /* ---------------- FILTER LOGIC ---------------- */
//     const filteredTimeTable = useMemo(() => {
//         if (!timeTableSlot) return [];

//         return timeTableSlot.filter((slot) => {
//             const matchBatch = slot.batch?.batchName?.toLowerCase() === selectedBatch.toLowerCase();
//             const matchSemester = Number(slot.semester?.semesterNumber) === Number(selectedSemester);
//             const matchYear = Number(slot.semester?.studyYear) === Number(selectedYear);

//             const searchTerm = search.toLowerCase();
//             const matchSearch =
//                 search === "" ||
//                 slot.course?.courseName?.toLowerCase().includes(searchTerm) ||
//                 slot.teacher?.fullName?.toLowerCase().includes(searchTerm);

//             return matchBatch && matchSemester && matchYear && matchSearch;
//         });
//     }, [timeTableSlot, selectedBatch, selectedSemester, selectedYear, search]);

//     return (
//         <div className="p-4 min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

//                 {/* ---------------- HEADER ---------------- */}
//                 <header className="p-6 border-b bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-blue-50 rounded-lg">
//                             <GraduationCap className="h-8 w-8 text-[#1D293D]" />
//                         </div>
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">{user?.fullName || "Chairman"}</h1>
//                             <p className="text-sm text-gray-500">{user?.department?.deptName || "Department"}</p>
//                         </div>
//                     </div>
//                     <button className="flex items-center gap-2 bg-[#1D293D] text-white px-5 py-2.5 rounded-lg hover:bg-[#2a3a54] transition-colors shadow-sm">
//                         <FileDown size={18} />
//                         Download PDF
//                     </button>
//                 </header>

//                 <main className="p-6">
//                     {/* -------- FILTERS -------- */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                         <FilterSelect
//                             label="Batch"
//                             value={selectedBatch}
//                             onChange={(e) => setSelectedBatch(e.target.value)}
//                             options={[{ val: "morning", lab: "Morning" }, { val: "evening", lab: "Evening" }]}
//                         />
//                         <FilterSelect
//                             label="Year"
//                             value={selectedYear}
//                             onChange={(e) => setSelectedYear(Number(e.target.value))}
//                             options={[1, 2, 3, 4].map(y => ({ val: y, lab: `Year ${y}` }))}
//                         />
//                         <FilterSelect
//                             label="Semester"
//                             value={selectedSemester}
//                             onChange={(e) => setSelectedSemester(Number(e.target.value))}
//                             options={[1, 2].map(s => ({ val: s, lab: `Semester ${s}` }))}
//                         />
//                         <div className="relative">
//                             <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                 <Input
//                                     type="text"
//                                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                                     placeholder="Course or teacher..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* -------- STATS CARDS -------- */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                         <StatCard icon={<CalendarDays />} label="Total Slots" value={totalSlots} />
//                         <StatCard icon={<Users />} label="Total Teachers" value={totalTeachers} />
//                         <StatCard icon={<GraduationCap />} label="Total Courses" value={totalCourses} />
//                     </div>

//                     {/* -------- TIMETABLE SECTIONS -------- */}
//                     <div className="space-y-8">
//                         {DAYS_OF_WEEK.map((day) => {
//                             const daySlots = filteredTimeTable
//                                 .filter((slot) => slot.day === day)
//                                 .sort((a, b) => a.startTime.localeCompare(b.startTime));

//                             return (
//                                 <section key={day} className="animate-in fade-in duration-500">
//                                     <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#1D293D]">
//                                         <span className="w-1 h-6 bg-[#1D293D] rounded-full"></span>
//                                         {day}
//                                     </h2>

//                                     {daySlots.length === 0 ? (
//                                         <div className="py-8 text-center border-2 border-dashed border-gray-100 rounded-xl">
//                                             <p className="text-gray-400 font-medium">No Class Scheduled</p>
//                                         </div>
//                                     ) : (
//                                         <div className="grid gap-3">
//                                             {daySlots.map((slot) => (
//                                                 <div key={slot._id} className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-md transition-all">
//                                                     <div className="flex flex-col">
//                                                         <span className="text-sm font-bold text-blue-600">
//                                                             {slot.startTime} - {slot.endTime}
//                                                         </span>
//                                                         <span className="text-base font-semibold text-gray-800">
//                                                             {slot.course?.courseName || "Untitled Course"}
//                                                         </span>
//                                                     </div>
//                                                     <div className="mt-2 md:mt-0 flex items-center gap-2">
//                                                         <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
//                                                             {slot.teacher?.fullName?.charAt(0)}
//                                                         </div>
//                                                         <span className="text-gray-600 text-sm italic">
//                                                             {slot.teacher?.fullName}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </section>
//                             );
//                         })}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }

// /* ---------------- HELPER COMPONENTS ---------------- */

// // const FilterSelect = ({ label, value, onChange, options }) => (
// //     <div>
// //         <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
// //         <select
// //             className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
// //             value={value}
// //             onChange={onChange}
// //         >
// //             {options.map(opt => (
// //                 <option key={opt.val} value={opt.val}>{opt.lab}</option>
// //             ))}
// //         </select>
// //     </div>
// // );

// const StatCard = ({ icon, label, value }) => (
//     <div className="bg-[#1D293D] text-white p-6 rounded-xl flex items-center gap-5 transform hover:scale-[1.02] transition-transform">
//         <div className="p-3 bg-white/10 rounded-lg">
//             {React.cloneElement(icon, { size: 28 })}
//         </div>
//         <div>
//             <h2 className="text-2xl font-bold leading-tight">{value || 0}</h2>
//             <p className="text-blue-100/70 text-sm font-medium uppercase tracking-wider">{label}</p>
//         </div>
//     </div>
// );

// export default ChairmanDashboard;