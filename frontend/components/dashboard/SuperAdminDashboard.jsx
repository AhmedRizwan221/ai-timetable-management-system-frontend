import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacultyCard from "../layout/facultyCard";
import { useNavigate } from "react-router-dom";
import { fetchFaculties } from "../../store/faculty/facultySlice.js";

function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFaculties());
  }, [dispatch])

  const { faculties = [], error, status } = useSelector((state) => state.faculty);

  // console.log(faculties); 
  return (
    <div className="px-4 py-6">
      <div className="flex flex-wrap gap-6">
        {status === "loading" && <p>Loading faculties...</p>}
        {status === "failed" && <p>Error: {error.message}</p>}
        {status === "succeeded" && faculties.length > 0 ? (
          faculties.map((fact) =>
            fact?._id ? (
              <FacultyCard key={fact._id} faculty={fact} />
            ) : null
          )
        ) : (
          <p>No Faculty found.</p>
        )}
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
