import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import DepartmentCard from "../layout/DepartmentCard";
import { getUser } from "../../store/auth/authSlice";

export default function DeptDashboard() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

// This will log EVERY time the state changes
// useEffect(() => {
//     if (status === true) {
//         console.log("FINAL USER DATA IN COMPONENT:", user);
//         console.log("FACULTY ID:", user?.faculty?._id);
//     }
// }, [user, status]);

// useEffect(() => {
//   dispatch(getUser());
// }, [dispatch]);


  const { departments = [] } = useSelector(
    (state) => state.department
  );
  // console.log("Departments:", departments);



  // useEffect(() => {
  //   dispatch(fetchDepartments())
  // }, [dispatch])

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Departments</h1>
      <div className="flex flex-wrap gap-6">
        {departments && departments.length > 0 ?
          departments.map((dept) => (
            <DepartmentCard key={dept._id} department={dept} />
          )) : "No department is found "}
      </div>
    </div>
  );
}
