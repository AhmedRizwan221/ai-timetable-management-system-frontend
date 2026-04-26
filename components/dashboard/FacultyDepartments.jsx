import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import { useSelector, useDispatch } from "react-redux";
import DepartmentCard from "../layout/DepartmentCard";
import { motion } from "framer-motion";

export default function FacultyDepartments() {
    const dispatch = useDispatch();
    const { facultyId } = useParams();
    // console.log(facultyId);

    useEffect(() => {
        if (facultyId) {
            dispatch(fetchDepartments(facultyId))
        }
    }, [dispatch, facultyId]);

    const { departments = [], error, status } = useSelector((state) => state.department)
    // console.log(departments);
    return (
        <div className="px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">All Departments</h1>
            <div className="flex flex-wrap gap-6">
                {status === "loading" && <p>Loading Faculties...</p>}
                {status === "failed" && <p>Error: {error.message}</p>}
                {status === "succeeded" && departments.length > 0 ? (
                    departments.map((dept, index) =>
                        dept?._id ? (
                            <motion.div
                                key={dept._id}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1, // stagger effect
                                    ease: "easeOut",
                                }}
                            >
                                <DepartmentCard key={dept._id} department={dept} />
                            </motion.div>
                        ) : null
                    )
                ) : (
                    <p>No Departments found.</p>
                )}
            </div>
        </div>
    )
}