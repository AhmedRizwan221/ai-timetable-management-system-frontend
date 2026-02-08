import React, { useEffect } from "react";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FacultyCard from "../layout/facultyCard";

function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const facultyId = useParams();

  // Fetch all departments on mount from redux
  useEffect(() => {
    if (facultyId) {
      dispatch(fetchDepartments(facultyId));
    }
  }, [dispatch]);

  const { departments = [], error, status } = useSelector((state) => state.department);

// here use faculty card and render all faculties inside the admin
  return (
    <div className="px-4 py-6">
      <div className="flex flex-wrap gap-6">
        {status === "loading" && <p>Loading departments...</p>}
        {status === "failed" && <p>Error: {error.message}</p>}
        {status === "succeeded" && departments.length > 0 ? (
          departments.map((dept) =>
            dept?._id ? (
              <FacultyCard key={faculty._id} faculty={faculty} />
            ) : null
          )
        ) : (
          <p>No departments found.</p>
        )}
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
