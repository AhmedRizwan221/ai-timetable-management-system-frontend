import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import { clearError, getDeptallTimeTables } from "../../../store/timetable/timeTable";
import { useNavigate } from "react-router-dom";
import { deleteTimeTable } from "../../../store/timetable/timeTable";

export default function ManageTimetable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { timeTables = [], error: timetableError } = useSelector((state) => state.timetable);
    console.log("TIme Tables ", timeTables);
    const { } = useSelector((state) => state.timetabelSlot);
    const { user } = useSelector((state) => state.auth);
    console.log(user);

    useEffect(() => {
        if (user) {
            dispatch(getDeptallTimeTables(user?.department?._id));
            dispatch(clearError());
        }
    }, [dispatch]);

    const timetableDeleteHandler = (id) => {
        const deleteConfrim = window.confirm("Deleting this TimeTable will delete all slots of this timetable?");
        if (deleteConfrim) {
            dispatch(deleteTimeTable(id))
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
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">TimeTable Management</h1>
                            <p className="text-sm text-muted-foreground">Total TimeTables: </p>
                        </div>
                    </div>
                </div>

                {timetableError && (
                    <p className="text-red-600 text-sm mb-2 text-center">{timetableError.message}</p>
                )}

                {/* mobile screen */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {timeTables.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No TimeTables found.</div>
                    ) : (
                        timeTables.map((timetable, index) => (
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
                    )}
                </div>

                {/* desktop screen */}
                <div className="hidden md:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-[#1D293D] text-white">
                                <th className="px-6 py-3 font-semibold text-sm">S.No</th>
                                <th className="px-6 py-3 font-semibold text-sm">Year</th>
                                <th className="px-6 py-3 font-semibold text-sm">Semester</th>
                                <th className="px-6 py-3 font-semibold text-sm">Batch</th>
                                <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeTables.map((timetable, index) => (
                                <tr key={timetable._id} className="border-t hover:bg-muted/40 transition-colors group">
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 flex items-center gap-2 font-medium text-foreground text-sm">
                                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted-foreground/10 shrink-0">{timetable?.semester?.studyYear}</div>

                                    </td>
                                    <td className="px-6 py-4 text-sm">{timetable?.semester?.semesterNumber}</td>
                                    <td className="px-6 py-4">
                                        {timetable?.batch?.batchName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => navigate(`/dashboard/chairman/edit-timetable/${timetable._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                            <button onClick={() => timetableDeleteHandler(timetable._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
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