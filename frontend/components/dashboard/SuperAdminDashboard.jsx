import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacultyCard from "../layout/facultyCard";
import { useNavigate } from "react-router-dom";
import { fetchFaculties } from "../../store/faculty/facultySlice.js";
import { motion } from "framer-motion";

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
          faculties.map((fact, index) =>
            fact?._id ? (
              <motion.div
                key={fact._id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1, // stagger effect
                  ease: "easeOut",
                }}
              >
                <FacultyCard key={fact._id} faculty={fact} />

              </motion.div>
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
