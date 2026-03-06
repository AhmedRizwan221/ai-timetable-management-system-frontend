import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getDeans } from "../../store/user/user.js";
import { useNavigate } from "react-router-dom";
// import Button from "../shrared/Button.jsx";

export default function ManageDeans() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    useEffect(() => {
        if (user) {
            dispatch(getDeans());
        }
    }, [dispatch])



    const { deans = [], error, status, totalDeans } = useSelector((state) => state.user);
    // console.log(deans, status);


    // delete button handler 
    const deleteHandler = (id) => {
        // console.log(id);
        const deleteConfrim = window.confirm("Are you sure to delete this dean?");
        // console.log(deleteConfrim);

        if (deleteConfrim) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <div className="">
                <h1>Dean Managment</h1>
                <h1>Total Deans: {totalDeans}</h1>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-xl">
                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
                )}
                <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">S.No</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Faculty</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deans.map((dean, index) => (
                            <tr key={dean._id} className="border-t">
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-4">{dean.fullName}</td>
                                <td className="px-6 py-4">{dean.email}</td>
                                <td className="px-6 py-4">
                                    {dean.faculty?.facultyName || "Not Assigned"}
                                </td>

                                <td className="px-6 py-4 flex gap-3">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                        type="button"
                                        onClick={() => navigate(`/dashboard/superadmin/edit-dean/${dean._id}`)}>
                                        Edit
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                                        onClick={() => deleteHandler(dean._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}