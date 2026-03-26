import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBatches, deleteBatch, clearError } from "../../../store/batch/batch.js";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Pencil, Trash } from "lucide-react";


export default function ManageBatches() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { user } = useSelector((state) => state.auth);
    // console.log(user, user?.role);

    const { batches = [], error: batchError } = useSelector((state) => state.batch);
    // console.log(batches);


    useEffect(() => {
        if (user?.role === 'chairman') {
            dispatch(getBatches(user?.department?._id));
            dispatch(clearError());
        }
    }, [dispatch, user]);


    // delete button handler 
    const handlerDeleteBatch = (id) => {
        const deleteConfrim = window.confirm("Are you sure to delete this Section?");
        if (deleteConfrim) {
            dispatch(deleteBatch(id))
        }
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 rounded-lg">
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Header Section: Now stacks on mobile */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shrink-0">
                            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Batches Management</h1>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {batchError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{batchError.message}</p>
                )}

                {/* --- MOBILE VIEW: Cards (Hidden on Medium+ screens) --- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {batches.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No Batches found.</div>
                    ) : (
                        batches.map((batch) => (
                            <div key={batch._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{batch.batchName}</h3>
                                            <p className="text-xs text-muted-foreground">{batch?.department?.faculty?.facultyName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">Department:</span> {batch?.department?.deptName || "Not Assigned"}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/chairman/edit-batches/${batch._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                        <button onClick={() => handlerDeleteBatch(batch._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
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
                                <th className="px-6 py-3 font-semibold text-sm">Semester & Year</th>
                                <th className="px-6 py-3 font-semibold text-sm">Department</th>
                                <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.length === 0 ?
                                (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-muted-foreground bg-card">No Batches found.
                                        </td>
                                    </tr>
                                ) : (
                                    batches.map((batch, index) => (
                                        <tr key={batch._id} className="border-t hover:bg-muted/40 transition-colors group">
                                            <td className="px-6 py-4 text-sm">{index + 1}</td>
                                            <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0"><GraduationCap className="h-4 w-4" /></div>
                                                {batch.batchName === 'morning' ? "Morning" : "Evening"}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm truncate max-w-[150px] lg:max-w-none">{"Semester" + " " + batch?.semester?.semesterNumber + " " + "Year" + " " + batch?.semester?.studyYear}</td>
                                            <td className="px-6 py-4 text-sm">{batch?.department?.deptName || "Not Assigned"}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => navigate(`/dashboard/chairman/edit-batches/${batch._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                    <button onClick={() => handlerDeleteBatch(batch._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}