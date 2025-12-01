import React from "react";
import { Link } from "react-router-dom";

export default function DepartmentCard({department}) {
    if(!department) {
        return <p>Department data not found here</p>
    }else {

        return (
            <Link to={`/department/${department._id}`}>
                <div className=" bg-white rounded-xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <h1 className="text-xl font-semibold text-gray-800">{department.name}</h1>
                    <p>{department.chairman?.name || "Chairman is not assigned"}</p>
                </div>
            </Link>
        )
    }
}
