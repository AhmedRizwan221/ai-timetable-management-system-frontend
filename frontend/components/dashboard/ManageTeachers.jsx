import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllTeachersInDept } from "../../store/user/user.js";
import { useNavigate } from "react-router-dom";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import Input from "../shrared/Input.jsx";
import { getUser } from "../../store/auth/authSlice.js";

export default function ManageTeachers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");


    const { user, status } = useSelector((state) => state.auth);
    // console.log(user, user?.role);

    const { teachers = [], error, totalTeachers } = useSelector((state) => state.user);
    // console.log(teachers, totalTeachers);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getUser());
        }
        if (user?.role === 'chairman') {
            dispatch(getAllTeachersInDept(user?.department?._id));
        }
    }, [dispatch, user]);

    const filterUsers = teachers.filter((teach) =>
        teach?.fullName?.toLowerCase().includes(search.trim().toLowerCase()) ||
        teach?.email?.toLowerCase().includes(search.trim().toLowerCase())
    )

    // delete button handler 
    const deleteHandler = (id) => {
        const deleteConfrim = window.confirm("Are you sure to delete this Teacher?");
        if (deleteConfrim) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 rounded-lg">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Header Section: Now stacks on mobile */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shrink-0">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Teachers Management</h1>
                            <p className="text-sm text-muted-foreground">Total Teachers: {totalTeachers}</p>
                        </div>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-ring"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}

                {/* --- MOBILE VIEW: Cards (Hidden on Medium+ screens) --- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {filterUsers.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No Teachers found.</div>
                    ) : (
                        filterUsers.map((tech, index) => (
                            <div key={tech._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{tech.fullName}</h3>
                                            <p className="text-xs text-muted-foreground">{tech.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-[10px] rounded-md font-bold uppercase ${tech.departmentTeacher ? "bg-[#1D293D] text-white hover:bg-[#162131]" : "bg-gray-100 text-gray-500"}`}>
                                        {tech.departmentTeacher ? "Active " : "InActive"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">Department:</span> {tech.departmentTeacher?.deptName || "Not Assigned"}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/chairman/edit-teacher/${tech._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                        <button onClick={() => deleteHandler(tech._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* --- TABLE VIEW: Desktop (Hidden on Small screens) --- */}
                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-[#1D293D] text-white">
                                <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                <th className="px-6 py-3 font-semibold text-sm">Name</th>
                                <th className="px-6 py-3 font-semibold text-sm">Email</th>
                                <th className="px-6 py-3 font-semibold text-sm">Department</th>
                                <th className="px-6 py-3 font-semibold text-sm">Status</th>
                                <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterUsers.map((tech, index) => (
                                <tr key={tech._id} className="border-t hover:bg-muted/40 transition-colors group">
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0"><User className="h-4 w-4" /></div>
                                        {tech.fullName}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm truncate max-w-[150px] lg:max-w-none">{tech.email}</td>
                                    <td className="px-6 py-4 text-sm">{tech.departmentTeacher?.deptName || "Not Assigned"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-md font-medium ${tech.departmentTeacher ? "bg-[#1D293D] text-white hover:bg-[#162131]" : "bg-gray-100 text-gray-500"}`}>
                                            {tech.departmentTeacher ? "Active" : "InActive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => navigate(`/dashboard/chairman/edit-teacher/${tech._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                            <button onClick={() => deleteHandler(tech._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}