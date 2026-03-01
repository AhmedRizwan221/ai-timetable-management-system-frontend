import React, { useState, useEffect } from "react";
import { createFaculty } from "../../store/faculty/facultySlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { getDeans } from "../../store/user/user.js";

export default function CreateDeptAssignChiarman() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [err, setErr] = useState("");
    const [chairmen, setChairmen] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getDeans());
    }, [dispatch])

    // redux level fetching 
    const {deans = [], error, status} = useSelector((state) => state.user);
    // console.log(deans);

    // send data to redux to create a faculty
    const handleCreateFact = async (data) => {
        setErr("");
        try {
            await dispatch(createFaculty({
                name: data.facultyName,
                deanId: data.deanId,
            })).unwrap();
            reset();
            alert("Faculty created successfully!");
            if (user?.role === 'admin') {
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
                    onSubmit={handleSubmit(handleCreateFact)}
                    className=""
                >
                    <div className="flex flex-col gap-4 mb-4">
                        <Input
                            className="w-1/2"
                            label="Create Faculty"
                            placeholder="Enter faculty name"
                            type="text"
                            {...register("facultyname", { required: true })}
                        />

                        <select
                            className="border border-gray-400 p-2 rounded-lg"
                            {...register("deanId", { required: true })}
                        >
                            <option value="">Select Dean</option>
                            {deans.map((dean) => (
                                <option key={dean._id} value={dean._id}>
                                    {dean.name} ({dean.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full">
                        Create Faculty
                    </Button>

                    {err && <p className="text-red-500 mt-2 items-center">{err.message}</p>}
                </form>
            </div>
        </div>
    )
}
// use that form for creation of department 
{/* <form
                    onSubmit={handleSubmit(handleCreateFact)}
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
                </form> */}