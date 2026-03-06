import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../shrared/Input";

export default function EditUser() {
    const {id} = useParams();
    const dispatch = useDispatch();


    return(
        <h1>Edit user details </h1>
    )
}