import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import { getAllTimeTableSlot, clearError, deleteTimeTableSlot } from "../../../store/timetableSlot/timetableSlot";
import { useNavigate } from "react-router-dom";


export default function ManageTimeTableSlots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { timeTableSlot = [], error: timetableSlotError } = useSelector((state) => state.timetabelSlot);
    console.log("TIme Tables Slot ", timeTableSlot);
    const { user } = useSelector((state) => state.auth);
    console.log(user);

    useEffect(() => {
        if (user) {
            dispatch(getAllTimeTableSlot(user?.department?._id));
            dispatch(clearError());
        }
    }, [dispatch, user]);

    const timetableSlotDeleteHandler = (id) => {
        const deleteConfrim = window.confirm("Are you sure to delete this timetable slot");
        if (deleteConfrim) {
            dispatch(deleteTimeTableSlot(id))
        }
    }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 rounded-lg">
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shrink-0">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">TimeTable Slot Management</h1>
                        </div>
                    </div>
                </div>

                {timetableSlotError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{timetableSlotError.message}</p>
                )}

                {/* mobile screen */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {timeTableSlot.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No TimeTables Slots found.</div>
                    ) : (
                        timeTableSlot.map((timetableSlot) => (
                            <div key={timetableSlot._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <p className="font-bold text-foreground"> {timetableSlot?.course?.courseName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">Batch:</span> {timetableSlot?.batch?.batchName}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/chairman/edit-timetableSlots/${timetableSlot._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                        <button onClick={() => timetableSlotDeleteHandler(timetableSlot._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* desktop screen */}
                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-[#1D293D] text-white">
                                <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                <th className="px-6 py-3 font-semibold text-sm">Course Name</th>
                                <th className="px-6 py-3 font-semibold text-sm">Day</th>
                                <th className="px-6 py-3 font-semibold text-sm">Batch</th>
                                <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeTableSlot.map((timetableSlot, index) => (
                                <tr key={timetableSlot._id} className="border-t hover:bg-muted/40 transition-colors group">
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0">{timetableSlot?.course?.courseName}</div>

                                    </td>
                                    <td className="px-6 py-4 text-sm">{timetableSlot?.day}</td>
                                    <td className="px-6 py-4">
                                        {timetableSlot?.batch?.batchName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => navigate(`/dashboard/chairman/edit-timetableSlots/${timetableSlot._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                            <button onClick={() => deleteTimeTableSlot(timetableSlot._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
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