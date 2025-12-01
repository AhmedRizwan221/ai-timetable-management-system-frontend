import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import DepartmentCard from "../layout/DepartmentCard";

export default function DeptDashboard() {
  const dispatch = useDispatch();
  const { departments, loading, error } = useSelector(
    (state) => state.department
  );
  // // departments are fetching 
  // console.log("Departments:", departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Departments</h1>
      <div className="grid grid-cols-3 gap-4">
        {departments && departments.length > 0 ? 
          departments.map((dept) => (
          <DepartmentCard key={dept._id} department={dept} />
        )) : "No department is found " }
      </div>
    </div>
  );
}
