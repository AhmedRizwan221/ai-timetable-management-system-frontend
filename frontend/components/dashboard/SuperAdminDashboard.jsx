import React, { useEffect } from "react";
import DepartmentCard from "../layout/DepartmentCard";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../layout/Navbar";

function SuperAdminDashboard() {
  const dispatch = useDispatch();

  // Fetch all departments on mount from redux
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const { departments = [], error, status } = useSelector((state) => state.department);


  return (
    <div className="px-4 py-6">
      <div className="flex flex-wrap gap-6">
        {status === "loading" && <p>Loading departments...</p>}
        {status === "failed" && <p>Error: {error.message}</p>}
        {status === "succeeded" && departments.length > 0 ? (
          departments.map((dept) =>
            dept?._id ? (
              <DepartmentCard key={dept._id} department={dept} />
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
