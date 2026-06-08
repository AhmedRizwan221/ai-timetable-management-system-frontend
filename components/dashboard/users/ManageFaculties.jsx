import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pencil, Trash, Book, ChevronRight, ChevronLeft, Search } from "lucide-react";
import { fetchFaculties, deleteFaculty, clearError } from "../../../store/faculty/facultySlice";
import { useNavigate } from "react-router-dom";
import Input from "../../shrared/Input";
import Loader from "../../shrared/Loader";


export default function ManageFaculties() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { faculties = [], error, totalPages, currentPage, loading, hasPrevPage, hasNextPage } = useSelector((state) => state.faculty);
    const { user } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (user) {
            dispatch(fetchFaculties({
                page: page,
                limit: 5
            }));
            dispatch(clearError());
        }
    }, [dispatch, user, page]);

    const filterFaculties = faculties.filter((fact) =>
        fact?.facultyName.toLowerCase().includes(search.trim().toLocaleLowerCase()) ||
        fact?.dean?.fullName?.toLowerCase().includes(search.trim().toLowerCase())
    )

    const facultyDeleteHandler = (id) => {
        const deleteConfrim = window.confirm("Are you sure to delete Faculty?");
        if (deleteConfrim) {
            dispatch(deleteFaculty(id))
        }
    }


    return (
        <div className="min-h-screen bg-muted/30 md:py-10 md:px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="bg-card">
                    <div className="block md:flex items-center container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <Book className="h-10 w-10 text-primary-foreground" />
                            </div>
                            <h1 className="mb-2 md:m-0 text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                Faculties Managment
                            </h1>
                        </div>
                        <div className="relative w-full sm:w-72 sm:ml-auto">
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

                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}

                {/* mobile screen */}
                <div className="grid grid-cols-1 gap-4 md:hidden p-4">
                    {loading ? (
                        <div>
                            <Loader loading={loading} />
                        </div>
                    ) : (
                        filterFaculties.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No Faculties found.</div>
                        ) : (
                            filterFaculties.map((fact) => (
                                <div key={fact._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex justify-between items-center gap-3">
                                            <p className="font-bold text-foreground"> {fact?.facultyName}</p>
                                                <p className="text-foreground"> {fact?.dean ? fact.dean?.fullName : "Not Assigned"}</p>
                                            <div className="flex items-center gap-1">
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                        <div className="flex gap-2">
                                            <button onClick={() => navigate(`/dashboard/superadmin/edit-faculties/${fact._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                            <button onClick={() => facultyDeleteHandler(fact._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )}

                </div>

                {/* desktop screen */}
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-[#1D293D] text-white">
                                    <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Faculty Name</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Dean</th>
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
                                    filterFaculties.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center text-muted-foreground bg-card">No Faculties found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filterFaculties.map((fact, index) => (
                                            <tr key={fact._id} className="border-t hover:bg-muted/40 transition-colors group">
                                                <td className="px-6 py-4 text-sm">{index + 1}</td>
                                                <td className="px-6 py-4 text-sm">{fact?.facultyName}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="text-muted-foreground font-medium">{fact?.dean ? fact.dean?.fullName : "Not Assigned"}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3">
                                                        <button onClick={() => navigate(`/dashboard/superadmin/edit-faculties/${fact._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                        <button onClick={() => facultyDeleteHandler(fact._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
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

    )
}