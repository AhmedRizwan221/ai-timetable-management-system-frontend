import React, { useState, useEffect } from "react";
import { departmentCreate } from "../../store/dept/departmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateDeptAssignChiarman() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [err, setErr] = useState("");
    const [chairmen, setChairmen] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
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

    // send data to redux to create a dept
    const handleCreateDept = async (data) => {
        setErr("");
        try {
            await dispatch(departmentCreate({
                name: data.department,
                chairmanId: data.chairmanId,
            })).unwrap();
            reset();
            alert("Department created successfully!");
            if (user?.role === 'superadmin') {
                navigate('/dashboard/superadmin');
            }
        } catch (error) {
            setErr(error.message);
        }
    };
    return (
        <div className="flex justify-center items-center px-5 min-h-screen">
            <div className="m-auto w-full max-w-lg rounded-xl bg-gray-100 border border-black/10 p-10">
            {err && (
                    <p className="text-red-600 text-sm mb-2 text-center">{err}</p>
                )}
                <form
                    onSubmit={handleSubmit(handleCreateDept)}
                    className=""
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <Input
                            className="w-1/2"
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

                    {err && <p className="text-red-500 mt-2 items-center">{err.message}</p>}
                </form>
            </div>
        </div>
    )
}