import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getDeans } from "../../store/user/user.js";
import { useNavigate } from "react-router-dom";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import Input from "../shrared/Input.jsx";

export default function ManageDeans() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSeatch] = useState("");


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
        <div className="min-h-screen bg-white p-4 sm:p-8 rounded-lg">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <Users className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground" >Deans Managment</h1>
                            <p className="text-sm text-muted-foreground">Total Deans: {totalDeans}</p>
                        </div>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pl-10"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSeatch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    {error && (
                        <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                    )}

                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-muted/50 bg-[#1D293D] text-white">
                                <th className="px-6 py-3 font-semibold">S.No</th>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Email</th>
                                <th className="px-6 py-3 font-semibold">Faculty</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-muted-foreground"
                                    >
                                        No Deans found.
                                    </td>
                                </tr>
                            ) : (
                                filterUsers.map((dean, index) => (
                                    <tr
                                        key={dean._id}
                                        className="border-t hover:bg-muted/40 transition-colors group"
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>

                                        <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground">
                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                                                <User className="h-4 w-4" />
                                            </div>
                                            {dean.fullName}
                                        </td>

                                        <td className="px-6 py-4 text-muted-foreground">{dean.email}</td>

                                        <td className="px-6 py-4">
                                            {dean.faculty?.facultyName || "Not Assigned"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-md font-medium ${dean.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-500"
                                                }`}>
                                                {dean.status || "Active"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    className="p-2 rounded-md hover:bg-muted transition-all duration-200 hover:scale-110 flex items-center justify-center cursor-pointer"
                                                    onClick={() =>
                                                        navigate(`/dashboard/superadmin/edit-dean/${dean._id}`)
                                                    }
                                                >
                                                    <Pencil className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-200" />
                                                </button>

                                                <button
                                                    className="p-2 rounded-md hover:bg-muted transition-all duration-200 hover:scale-110 flex items-center justify-center"
                                                    onClick={() => deleteHandler(dean._id)}
                                                >
                                                    <Trash className="h-5 w-5 text-muted-foreground hover:text-[#1D293D] transition-colors duration-200 cursor-pointer" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}