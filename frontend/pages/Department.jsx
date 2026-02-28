import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DepartmentDetails() {


    const { departments = [], error, status } = useSelector((state) => state.department);
    console.log(departments);

    return (
        <div className="p-6">
            {departments && departments.map((dept) => (
                <div key={dept._id} className="mb-6 border p-4 rounded">
                    <h1 className="text-3xl font-bold">{dept.deptName}</h1>

                    <p className="text-lg mt-2">
                        Chairman: {dept.chairman?.fullName || "Not assigned"}
                    </p>

                    <p>Email: {dept.chairman?.email || "No email available"}</p>
                </div>
            ))}
        </div>
    );
}
