import { useSelector } from "react-redux";
import FacultyCard from "../layout/facultyCard";
import { motion } from "framer-motion";

export default function FacultyDashboard() {
    const { faculties = [], error, status } = useSelector((state) => state.faculty)
    // console.log(faculties);
    return (
        <div className="px-4 py-6">
            <div className="flex flex-wrap gap-6">
                {status === "loading" && <p>Loading Faculties...</p>}
                {status === "failed" && <p>Error: {error}</p>}
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
                    <p>No Faculties found.</p>
                )}
            </div>
        </div>
    )
}