import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DepartmentDetails() {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
     
        fetch(`http://localhost:4000/department/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("Single Department:", data); 
                setDepartment(data);
                setLoading(false);
            })
            .catch((err) => console.error("Fetch Error:", err));
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!department) return <p className="p-6">Department not found</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{department.name}</h1>
            <p className="text-lg mt-2">
                Chairman: {department.chairman?.name || "Not assigned"}
            </p>
            <p>Email: {department.chairman?.email}</p>
        </div>
    );
}
