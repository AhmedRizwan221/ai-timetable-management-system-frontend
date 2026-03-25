import React, { useEffect, useMemo, useState } from "react";
import { getFacultyAllTimeTableSlots } from "../../store/timetableSlot/timetableSlot";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachersInFaculty, getChairmans } from "../../store/user/user";
import TimeTableView from "../shrared/TimeTableView";

function DeanDashboard() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    const { totalSlots, timetabelSlot = [] } = useSelector((state) => state.timetabelSlot);
    console.log(timetabelSlot);
    const { totalTeachers } = useSelector((state) => state.user);
    // console.log(totalTeachers);
    const { totalChairmans = null, } = useSelector((state) => state.user);
    // console.log(totalChairmans);

    // console.log(user);

    useEffect(() => {
        if (user) {
            dispatch(getFacultyAllTimeTableSlots(user?.faculty._id));
            dispatch(getAllTeachersInFaculty(user?.faculty._id));
            dispatch(getChairmans());
            // dispatch(getAllCoursesInDept(user?.department?._id));
        }
    }, [dispatch, user]);

    return (

        <TimeTableView
            slots={totalSlots}
            user={user}
            totalTeachers={totalTeachers}
            totalChairmans={totalChairmans}
            timeTableSlot={timetabelSlot}
        />
    )
}

export default DeanDashboard;