import React, { useEffect, useState } from "react";
import DepartmentCard from "../layout/DepartmentCard";
import { Input, Button } from "../index.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createDepartment, fetchDepartments } from "../../store/dept/departmentSlice";
import { useDispatch, useSelector } from "react-redux";

function SuperAdminDashboard() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [chairmen, setChairmen] = useState([]);
  const [err, setErr] = useState("");

  const { departments = [], error, status } = useSelector((state) => state.department);

  
 

  // Fetch all chairmen on mount
  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/user/getchairman", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChairmen(res.data || []);
      } catch (err) {
        console.error("Error fetching chairmen:", err);
      }
    };

    fetchChairmen();
  }, []);
  // Fetch all departments on mount
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  // ✅ Create department
  const handleCreateDept = async (data) => {
    setErr("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/department/create",
        {
          name: data.department,
          chairmanId: data.chairmanId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data) {
        dispatch(createDepartment(res.data));
        reset(); 
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to create department";
      // console.error("Department creation error", error);
      setErr(errMsg);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
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

      <form
        onSubmit={handleSubmit(handleCreateDept)}
        className="border border-gray-300 rounded-xl p-4 max-w-lg mx-auto"
      >
        <div className="flex flex-col gap-4 mb-4">
          <Input
            label="Create Department"
            placeholder="Enter department name"
            type="text"
            {...register("department", { required: true })}
          />

          <select
            className="border border-gray-400 p-2 rounded-lg"
            {...register("chairmanId", { required: true })}
          >
            <option value="">Select Chairman</option>
            {chairmen.map((chair) => (
              <option key={chair._id} value={chair._id}>
                {chair.name} ({chair.email})
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full">
          Create Department
        </Button>

        {err && <p className="text-red-500 mt-2 items-center">{err}</p>}
      </form>
    </div>
  );
}

export default SuperAdminDashboard;
