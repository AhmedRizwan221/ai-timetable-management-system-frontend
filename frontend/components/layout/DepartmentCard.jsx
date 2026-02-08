import { Link } from "react-router-dom";

export default function DepartmentCard({ department }) {
  if (!department) {
    return <p>Department data not found</p>;
  }

  const chairmanName = department.chairman?.name || "Not assigned";

  return (
    <Link to={`/department/${department._id}`}>
      <div className="bg-white rounded-xl shadow-md p-6 w-72 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{department.name}</h2>      
        <div className="flex items-center text-gray-800 font-medium">
          <svg
            className="w-5 h-5 text-blue-500 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
          <span>Chairman: {chairmanName}</span>
        </div>
      </div>
    </Link>
  );
}
