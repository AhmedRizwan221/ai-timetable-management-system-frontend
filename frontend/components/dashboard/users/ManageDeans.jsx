import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getDeans } from "../../../store/user/user.js";
import { useNavigate } from "react-router-dom";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import Input from "../../shrared/Input.jsx";

export default function ManageDeans() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");


    const { user } = useSelector((state) => state.auth);
    const { deans = [], error, totalDeans } = useSelector((state) => state.user);

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(getDeans());
        }
    }, [dispatch])


    const filterUsers = deans.filter((dean) =>
        dean?.fullName?.toLowerCase().includes(search.trim().toLowerCase()) ||
        dean?.email?.toLowerCase().includes(search.trim().toLowerCase())
    )

    // delete button handler 
    const deleteHandler = (id) => {
        const deleteConfrim = window.confirm("Are you sure to delete this dean?");
        if (deleteConfrim) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="bg-card">
                        <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8 border-b">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">

                                {/* Left Side */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary">
                                        <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                                    </div>
                                    <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                        Deans Management
                                    </h1>
                                </div>

                                {/* Right Side */}
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
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}

                {/* mobile screen */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {filterUsers.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No Deans found.</div>
                    ) : (
                        filterUsers.map((dean, index) => (
                            <div key={dean._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{dean.fullName}</h3>
                                            <p className="text-xs text-muted-foreground">{dean.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-[10px] rounded-md font-bold uppercase ${dean.faculty ? "bg-[#1D293D] text-white hover:bg-[#162131]" : "bg-gray-100 text-gray-500"}`}>
                                        {dean.faculty ? "Active " : "InActive"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">Faculty:</span> {dean.faculty?.facultyName || "Not Assigned"}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/superadmin/edit-dean/${dean._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                        <button onClick={() => deleteHandler(dean._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* desktop screen */}
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-[#1D293D] text-white">
                                    <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Name</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Email</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Faculty</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Status</th>
                                    <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterUsers.map((dean, index) => (
                                    <tr key={dean._id} className="border-t hover:bg-muted/40 transition-colors group">
                                        <td className="px-6 py-4 text-sm">{index + 1}</td>
                                        <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0"><User className="h-4 w-4" /></div>
                                            {dean.fullName}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground text-sm truncate max-w-[150px] lg:max-w-none">{dean.email}</td>
                                        <td className="px-6 py-4 text-sm">{dean.faculty?.facultyName || "Not Assigned"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-md font-medium ${dean.faculty ? "bg-[#1D293D] text-white hover:bg-[#162131]" : "bg-gray-100 text-gray-500"}`}>
                                                {dean.faculty ? "Active" : "InActive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => navigate(`/dashboard/superadmin/edit-dean/${dean._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                <button onClick={() => deleteHandler(dean._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}