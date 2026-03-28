import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartment } from "../store/dept/departmentSlice";
import { getAllCoursesInDept } from "../store/course/course";
import { getAllTeachersInDept } from "../store/user/user";
import { ArrowLeft, Users, Badge, Mail, Calendar, BookOpen, Loader2, AlertCircle } from "lucide-react";


function DepartmentDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: deptId } = useParams();
    // console.log(deptId);

    const { department = null, departments = [], error: detailLoading } = useSelector((state) => state.department);
    // console.log(departments);

    const { courses = [] } = useSelector((state) => state.course);
    console.log(courses);

    const { teachers = [], error: TeacherError, totalTeachers } = useSelector((state) => state.user);
    // console.log(teachers, totalTeachers);

    useEffect(() => {
        if (deptId) {
            dispatch(getDepartment(deptId));
            dispatch(getAllCoursesInDept(deptId));
            dispatch(getAllTeachersInDept(deptId))
        }
    }, [deptId, dispatch]);

    // if (detailLoading || TeacherError) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center bg-background">
    //             <Loader2 className="h-8 w-8 animate-spin text-primary" />
    //         </div>
    //     );
    // }

    // if (detailLoading || !department) {
    //     return (
    //         <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
    //             <div className="flex items-center gap-2 text-destructive">
    //                 <AlertCircle className="h-5 w-5" />
    //                 <span>{detailLoading || "Department not found"}</span>
    //             </div>
    //             <button variant="outline" onClick={() => navigate("/")}>
    //                 <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <header className="">
                    <div className="bg-card">
                        <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center rounded-lg bg-primary">
                                    <button
                                        onClick={() => navigate(`/dashboard/deptDashboard`)}
                                        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                    >
                                        <ArrowLeft className="h-4 w-4" /> Back to Departments
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">{department?.deptName}</h1>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Info Card */}
                        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-foreground">Department Information</h2>
                            <InfoRow icon={Users} label="Head of Department" value={department?.chairman?.fullName} />
                            <InfoRow icon={Users} label="Faculty Members" value={String(totalTeachers)} />
                        </div>

                        {/* Contact Card */}
                        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
                            <InfoRow icon={Mail} label="Email" value={department?.chairman?.email} />
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="mt-6 rounded-xl border border-border bg-card p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-department-accent" /> Courses Offered
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {courses.map((course) => (
                                <span
                                    key={course._id}
                                    className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                                >
                                    {course.courseName}
                                </span>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-department-accent shrink-0" />
        <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-sm font-medium text-foreground">{value}</div>
        </div>
    </div>
);

export default DepartmentDetails;

