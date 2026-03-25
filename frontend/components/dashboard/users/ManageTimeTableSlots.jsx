import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Clock, Pencil, Trash } from "lucide-react";
import { getAllTimeTableSlot, clearError, deleteTimeTableSlot } from "../../../store/timetableSlot/timetableSlot";
import { useNavigate } from "react-router-dom";


export default function ManageTimeTableSlots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { timeTableSlot = [], error: timetableSlotError } = useSelector((state) => state.timetabelSlot);
    const { user } = useSelector((state) => state.auth);

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
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <Clock className="h-10 w-10 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                TimeTableSlot Managment
                            </h1>
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
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
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
                                {timeTableSlot.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 text-muted-foreground">
                                            No TimeTable Slots found.
                                        </td>
                                    </tr>
                                ) : (


                                    timeTableSlot.map((slot, index) => (
                                        <tr key={slot._id} className="border-t hover:bg-muted/40 transition-colors group">
                                            <td className="px-6 py-4 text-sm">{index + 1}</td>
                                            <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0">{slot?.course?.courseName}</div>

                                            </td>
                                            <td className="px-6 py-4 text-sm">{slot?.day}</td>
                                            <td className="px-6 py-4">
                                                {slot?.batch?.batchName === 'morning' ? "Morning" : "Evening"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => navigate(`/dashboard/chairman/edit-timetableSlots/${slot._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                    <button onClick={() => timetableSlotDeleteHandler(slot._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}