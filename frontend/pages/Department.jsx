import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDepartment } from "../store/dept/departmentSlice";

export default function DepartmentDetails() {
    const dispatch = useDispatch();
    const { id: deptId} = useParams();
    // console.log(deptId);

    const { department = null, error, status, teachers, courses } = useSelector((state) => state.department);
    // console.log(department);
    
    useEffect(() => {
        dispatch(getDepartment(deptId))
    }, [dispatch])

    return (
        // <div className="p-6">
        //     {departments && departments.map((dept) => (
        //         <div key={dept._id} className="mb-6 border p-4 rounded">
        //             <h1 className="text-3xl font-bold">{dept.deptName}</h1>

        //             <p className="text-lg mt-2">
        //                 Chairman: {dept.chairman?.fullName || "Not assigned"}
        //             </p>

        //             <p>Email: {dept.chairman?.email || "No email available"}</p>
        //         </div>
        //     ))}
        // </div>
        <div>
            <h1>teachers counts: {teachers}</h1>
             <h1>courses counts: {courses}</h1>
              <h1>chairman Name : {department?.chairman?.fullName}</h1>
              <h1>Department Name : {department?.deptName}</h1> 
               <h1>faculty Name : {department?.faculty?.facultyName}</h1>
               <h1>Dean Name : {department?.dean?.fullName}</h1> 
        </div>

    );
}
