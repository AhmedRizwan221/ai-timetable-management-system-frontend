import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../store/dept/departmentSlice";
import DepartmentCard from "../layout/DepartmentCard";

export default function DeptDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const { departments = [], errpr: departmentError } = useSelector((state) => state.department);
  // console.log("Departments:", departments);



  useEffect(() => {
    if(user) {
      dispatch(fetchDepartments(user.faculty?._id));
    }
  }, [dispatch, user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Departments</h1>
      <div className="flex flex-wrap gap-6">
        {departments && departments.length > 0 ?
          departments.map((dept) => (
            <DepartmentCard key={dept._id} department={dept} />
          )) : "No departments found "}
      </div>
    </div>
  );
}
