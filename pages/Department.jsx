import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartment } from "../store/dept/departmentSlice";
import { allCourses } from "../store/course/course";
import { getAllTeachersInDept } from "../store/user/user";
import { ArrowLeft, Users, CalendarDays, Mail, Calendar, BookOpen, Loader2, AlertCircle } from "lucide-react";
import Loader from "../components/shrared/Loader";


function DepartmentDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: deptId } = useParams();
    // console.log(deptId);

    const { department = null, departments = [], error: detailLoading } = useSelector((state) => state.department);
    const { courses = [], loading } = useSelector((state) => state.course);
    const { teachers = [], error: TeacherError, totalTeachers } = useSelector((state) => state.user);
    // console.log(teachers, totalTeachers);

    useEffect(() => {
        dispatch(getDepartment(deptId));
        if (deptId) {
            dispatch(allCourses(deptId));
            dispatch(getAllTeachersInDept(deptId))
        }
    }, [deptId, dispatch]);

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 rounded-lg">
                <header className="">
                    <div className="bg-card">
                        <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate(`/dashboard/deptDashboard`)}
                                    className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                                >
                                    <ArrowLeft className="h-8 w-8" />
                                </button>
                                <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                    <CalendarDays className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    {department?.deptName}
                                </h1>
                            </div>
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
                            {loading ? (
                                <Loader loading={loading} />
                            ) : (
                                courses.length > 0 ? (
                                    courses.map((course) => (
                                        <span
                                            key={course._id}
                                            className="px-3 py-2 text-sm rounded-full text-white bg-[#1D293D]"
                                        >
                                            {course.courseName}
                                        </span>
                                    ))
                                ) : (
                                    <h1>No Courses found</h1>
                                )
                            )}

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

