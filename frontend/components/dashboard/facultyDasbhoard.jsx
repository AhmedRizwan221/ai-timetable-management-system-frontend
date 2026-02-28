import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import DepartmentCard from "../layout/DepartmentCard";

export default function FacultyDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { facultyId } = useParams();
    // console.log(facultyId);

    useEffect(() => {
        dispatch(fetchDepartments(facultyId))
    }, [dispatch]);

    const { departments = [], error, status } = useSelector((state) => state.department)
    // console.log(departments);

    return (
        <div className="px-4 py-6">
            <div className="flex flex-wrap gap-6">
                {status === "loading" && <p>Loading departments...</p>}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && departments.length > 0 ? (
                    departments.map((dept) =>
                        dept?._id ? (
                            <DepartmentCard key={dept._id} department={dept} />
                        ) : null
                    )
                ) : (
                    <p>No Department found.</p>
                )}
            </div>
        </div>
    )
}