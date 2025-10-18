import React, { useEffect, useState } from "react";
import DepartmentCard from "../layout/DepartmentCard";
import { Input, Button, Select } from "../index.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createDepartment } from "../../store/dept/departmentSlice";
import { useDispatch } from "react-redux";



function SuperAdminDashboard() {
    const [error, setError] = useState("");
    const [departments, setDepartments] = useState([]);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:4000/department/alldepartments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!res.ok) {
                    // const error = await res.json();
                    return;
                }

                const data = await res.json();
                setDepartments(Array.isArray(data) ? data : []);
            } catch (err) {
                // console.error("Error fetching departments:", err);
                setError(err);
            }

        }
        fetchDepartments();
    }, [])
    // console.log(departments);

    const handleCreateDept = async (data) => {
        setError("");
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:4000/department/create', {
                name: data.department,
                chairmanId: data.chairmanId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const userData = res.data;
            localStorage.setItem('token', userData.token);

            dispatch(createDepartment(userData));

        } catch (error) {
            console.log("Department creation error", error);
        }
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <DepartmentCard key={dept._id} department={dept} />
                ))}
            </div>
            <form onSubmit={handleSubmit(handleCreateDept)}>
                <div className="flex justify-between px-4 gap-4">
                    <Input
                        label="Create Department"
                        placeholder="Enter department name"
                        type="text"
                        {...register('department', {
                            required: true,
                            unique: true
                        })}
                    />
                    <select
                        className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                    >

                    </select>
                    {/* <Input
                        label="Assign Chairman"
                        placeholder="Enter Chiarman name"
                        type="text"
                        {...register('chairmanId', {
                            required: true
                        })}
                    /> */}
                </div>
                <div className="px-4 items-center">
                    <Button type="submit">Create Department</Button>
                </div>
            </form>

        </>


    )
}

export default SuperAdminDashboard;