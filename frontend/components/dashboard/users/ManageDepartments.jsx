import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Pencil, Trash, Book } from "lucide-react";
import { fetchDepartments, clearError, departmentDelete } from "../../../store/dept/departmentSlice";
import { useNavigate } from "react-router-dom";


export default function ManageDepartments() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    const { departments = [], error } = useSelector((state) => state.department);
    // console.log(departments);

    useEffect(() => {
        if (user) {
            dispatch(fetchDepartments(user.faculty?._id));
            dispatch(clearError());
        }
    }, [dispatch, user]);

    const handlerDeleteDept = (id) => {
        try {
            const deleteConfrim = window.confirm("Are you sure to delete Department?");
            if (deleteConfrim) {
                dispatch(departmentDelete(id))
            }
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="bg-card">
                    <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                <Book className="h-10 w-10 text-primary-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Departments Managment
                            </h1>
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}

                {/* mobile screen */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {departments.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground bg-card rounded-xl border">No Departments found.</div>
                    ) : (
                        departments.map((dept) => (
                            <div key={dept._id} className="bg-card p-4 rounded-xl border border-border shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <p className="font-bold text-foreground"> {dept?.deptName}</p>
                                        <div className="flex items-center gap-1">
                                            <p className="font-bold text-foreground"> {dept?.chairman ? dept.chairman?.fullName : "Not Assigned"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-border/50">
                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal">faculty:</span> {dept?.faculty?.facultyName}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => navigate(`/dashboard/dean/edit-department/${dept._id}`)} className="p-2 bg-muted rounded-md"><Pencil className="h-4 w-4 text-primary" /></button>
                                        <button onClick={() => handlerDeleteDept(dept._id)} className="p-2 bg-muted rounded-md"><Trash className="h-4 w-4 text-red-500" /></button>
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
                                    <th className="px-6 py-3 font-semibold text-sm">Department Name</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Chairman</th>
                                    <th className="px-6 py-3 font-semibold text-sm">Faculty</th>
                                    <th className="px-6 py-3 text-right font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.length === 0 ?
                                    (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-muted-foreground bg-card">No Departments found.
                                            </td>
                                        </tr>
                                    ) : (

                                        departments.map((dept, index) => (
                                            <tr key={dept._id} className="border-t hover:bg-muted/40 transition-colors group">
                                                <td className="px-6 py-4 text-sm">{index + 1}</td>
                                                <td className="px-6 py-4 text-sm font-medium">{dept?.deptName}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="text-muted-foreground font-medium">{dept?.chairman ? dept.chairman?.fullName : "Not Assigned"}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <p className="text-sm font-medium"><span className="text-muted-foreground font-normal"></span> {dept?.faculty?.facultyName}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3">
                                                        <button onClick={() => navigate(`/dashboard/dean/edit-department/${dept._id}`)} className="p-2 hover:bg-muted rounded-md  cursor-pointertransition-all cursor-pointer"><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary " /></button>
                                                        <button onClick={() => handlerDeleteDept(dept._id)} className="p-2 hover:bg-muted rounded-md transition-all cursor-pointer"><Trash className="h-5 w-5 text-muted-foreground hover:text-red-600" /></button>
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
        </div>
    )
}