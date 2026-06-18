import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Search, ChevronRight, ChevronLeft, CalendarDays, Pencil, Trash, Eye } from "lucide-react";
import { clearError } from "../../../store/timetable/timeTable";
import { useNavigate } from "react-router-dom";
import { deleteTimeTable, getDeptallTimeTables } from "../../../store/timetable/timeTable";
import { getUser } from "../../../store/auth/authSlice.js";
import Input from "../../shrared/Input.jsx";
import Loader from "../../shrared/Loader.jsx";

export default function ManageTimetable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { timeTables = [], error: timetableError, hasPrevPage, hasNextPage, totalPages, currentPage, loading } = useSelector((state) => state.timetable);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getDeptallTimeTables({
                deptId: user?.department?._id,
                page: page,
                limit: 5
            }));
            dispatch(clearError());
        }
    }, [dispatch, page, user]);

    const timetableDeleteHandler = (id) => {
        const deleteConfrim = window.confirm("Deleting this TimeTable will delete all slots of this timetable?");
        if (deleteConfrim) {
            dispatch(deleteTimeTable(id))
        }
    }

    // serahc functionality
    const filterTimeTables = timeTables.filter((fact) =>
        fact?.batch?.batchName?.toLowerCase().includes(search.trim().toLowerCase()) ||
        fact?.semester?.semesterNumber?.toString().includes(search.trim()) ||
        fact?.semester?.studyYear?.toString().includes(search.trim())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 md:py-10 md:px-4">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="bg-card">
                        <div className="block md:flex items-center container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                    <CalendarDays className="h-10 w-10 text-primary-foreground" />
                                </div>
                                <h1 className="mb-2 md:m-0 text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                    TimeTable Managment
                                </h1>
                            </div>
                            <div className="relative w-full sm:w-72 md:ml-auto">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-ring"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {timetableError && (
                        <p className="text-red-600 text-sm mb-2 text-center">{timetableError.message}</p>
                    )}

                    {/* mobile screen */}
                    <div className="grid grid-cols-1 gap-4 md:hidden p-4">
                        {loading ? (
                            <div>
                                <Loader loading={loading} />
                            </div>
                        ) : (
                            filterTimeTables.length === 0 ? (
                                <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No TimeTables found.</div>
                            ) : (
                                filterTimeTables.map((timetable, index) => (
                                    <div key={timetable._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                {/* <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                                        </div> */}
                                                <div className="flex items-center gap-1">
                                                    <p className="font-bold text-foreground">Year {timetable?.semester?.studyYear}</p>
                                                    <p className="font-bold text-foreground">Semester {timetable?.semester?.semesterNumber}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                            <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">Batch:</span> {timetable?.batch?.batchName}</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => navigate(`/dashboard/chairman/edit-timetable/${timetable._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                                <button onClick={() => timetableDeleteHandler(timetable._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        )}

                    </div>

                    {/* desktop screen */}
                    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                        <div className=" mx-auto hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="bg-[#1D293D] text-white">
                                        <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                        <th className="px-6 py-3 font-semibold text-sm">Year</th>
                                        <th className="px-6 py-3 font-semibold text-sm">Semester</th>
                                        <th className="px-6 py-3 font-semibold text-sm">Batch</th>
                                        <th className="px-6 py-3 font-semibold text-sm">Status</th>
                                        <th className="px-6 py-3 font-semibold text-sm">View</th>
                                        <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="py-10">
                                                <Loader loading={loading} />
                                            </td>
                                        </tr>
                                    ) : (
                                        filterTimeTables.length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan="5" className="py-12 text-center text-muted-foreground bg-card">No TimeTables found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filterTimeTables.map((timetable, index) => (
                                                    <tr key={timetable._id} className="border-t hover:bg-muted/40 transition-colors group">
                                                        <td className="px-6 py-4 text-sm">{index + 1}</td>
                                                        <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0">{timetable?.semester?.studyYear}</div>

                                                        </td>
                                                        <td className="px-6 py-4 text-sm">{timetable?.semester?.semesterNumber}</td>
                                                        <td className="px-6 py-4">
                                                            {timetable?.batch?.batchName === 'morning' ? "Morning" : "Evening"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                                                    timetable?.status
                                                                )}`}
                                                            >
                                                                {timetable?.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => navigate(`/dashboard/chairman/view-timetable/${timetable._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Eye className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex justify-end gap-3">
                                                                <button onClick={() => navigate(`/dashboard/chairman/edit-timetable/${timetable._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                                <button onClick={() => timetableDeleteHandler(timetable._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6 mt-4">
                            <div className="flex flex-1 justify-between sm:hidden">
                                {/* Mobile View: Simple Buttons */}
                                <button
                                    disabled={!hasPrevPage}
                                    onClick={() => setPage(currentPage - 1)}
                                    className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={!hasNextPage}
                                    onClick={() => setPage(currentPage + 1)}
                                    className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>

                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-700">
                                        Showing Page <span className="font-semibold">{currentPage}</span> of{' '}
                                        <span className="font-semibold">{totalPages}</span>
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    {/* Desktop View: Icons with Text */}
                                    <button
                                        onClick={() => setPage(currentPage - 1)}
                                        disabled={!hasPrevPage}
                                        className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-[#1D293D] text-white rounded-lg hover:bg-[#162131] transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-600 cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Previous
                                    </button>

                                    <button
                                        onClick={() => setPage(currentPage + 1)}
                                        disabled={!hasNextPage}
                                        className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-[#1D293D] text-white rounded-lg hover:bg-[#162131] transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-600 cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}