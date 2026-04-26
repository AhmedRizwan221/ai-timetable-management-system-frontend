import React, { useEffect, useMemo, useState } from "react";
import { getFacultyAllTimeTableSlots } from "../../store/timetableSlot/timetableSlot";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachersInFaculty, getAllChairmansCountInFaculty } from "../../store/user/user";
import TimeTableView from "../shrared/TimeTableView";
import { getAllCoursesInFaculty } from "../../store/course/course";
import { getFacultyDepartments } from "../../store/dept/departmentSlice";
import ChatBot from "../chatbot/chatbot";
import DownloadTimeTablePDF from "../shrared/DownloadTimeTablePdf";

function DeanDashboard() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { totalSlots, timeTableSlot = [], error: TimeTableSlotError } = useSelector((state) => state.timetabelSlot);
    const { totalTeachers, loading: teacherLoader } = useSelector((state) => state.user);
    const { totalChairmans = null, loading: chairmanLoader } = useSelector((state) => state.user);
    const { totalCourses } = useSelector((state) => state.course);
    const { departments = [] } = useSelector((state) => state.department);
    // console.log(timeTableSlot);

    useEffect(() => {
        if (user) {
            dispatch(getFacultyAllTimeTableSlots(user?.faculty._id));
            dispatch(getAllTeachersInFaculty(user?.faculty._id));
            dispatch(getAllCoursesInFaculty(user?.faculty._id));
            dispatch(getAllChairmansCountInFaculty(user?.faculty._id));
            dispatch(getFacultyDepartments(user?.faculty._id))
        }
    }, [dispatch, user]);

    return (
        <div>
            <TimeTableView
                slots={totalSlots}
                user={user}
                totalTeachers={totalTeachers}
                totalChairmans={totalChairmans}
                timeTableSlot={timeTableSlot}
                totalCourses={totalCourses}
                departments={departments}
            />
            <ChatBot role={user?.role} />
        </div>

    )
}

export default DeanDashboard;