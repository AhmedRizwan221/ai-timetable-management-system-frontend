import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllTeachersInDept } from "../../store/user/user.js";
import { useNavigate } from "react-router-dom";
import { Users, Search, User, Pencil, Trash } from "lucide-react";
import Input from "../shrared/Input.jsx";
import { getUser } from "../../store/auth/authSlice.js";

export default function ManageTeachers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSeatch] = useState("");


    const { user , status} = useSelector((state) => state.auth);
    console.log(user, user?.role);

    const { teachers = [], error, totalTeachers } = useSelector((state) => state.user);
    console.log(teachers, totalTeachers);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getUser());
        }
        if (user?.role === 'chairman') {
            dispatch(getAllTeachersInDept(user?.department?._id));
        }
    }, [dispatch, user]);

    return (
        <h1>Manage Teachers </h1>
    )
}