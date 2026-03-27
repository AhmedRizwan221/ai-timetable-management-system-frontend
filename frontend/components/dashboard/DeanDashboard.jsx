import React, { useEffect, useMemo, useState } from "react";
import { getFacultyAllTimeTableSlots } from "../../store/timetableSlot/timetableSlot";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachersInFaculty, getAllChairmansInFaculty } from "../../store/user/user";
import TimeTableView from "../shrared/TimeTableView";
import { getAllCoursesInFaculty } from "../../store/course/course";

function DeanDashboard() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { totalSlots, timeTableSlot = [], error: TimeTableSlotError } = useSelector((state) => state.timetabelSlot);
    const { totalTeachers } = useSelector((state) => state.user);
    const { totalChairmans = null, } = useSelector((state) => state.user);
    const { totalCourses, courses } = useSelector((state) => state.course);

    useEffect(() => {
        if (user) {
            dispatch(getFacultyAllTimeTableSlots(user?.faculty._id));
            dispatch(getAllTeachersInFaculty(user?.faculty._id));
            dispatch(getAllCoursesInFaculty(user?.faculty._id));
            dispatch(getAllChairmansInFaculty(user?.faculty._id))
        }
    }, [dispatch, user]);

    return (

        <TimeTableView
            slots={totalSlots}
            user={user}
            totalTeachers={totalTeachers}
            totalChairmans={totalChairmans}
            timeTableSlot={timeTableSlot}
            totalCourses={totalCourses}
        />
    )
}

export default DeanDashboard;