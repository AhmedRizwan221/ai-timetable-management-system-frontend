import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeans } from "../../store/user/user.js";

export default function ManageDeans() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeans());
    }, [dispatch])

    const { deans = [], error, status } = useSelector((state) => state.user);
    // console.log(deans);

    return (
        <div>
           
            {deans.map((dean) => (
                <div key={dean._id} className="border p-4 mb-3 rounded flex justify-between">
                    <div>
                        <h2 className="mb-5">Name : {dean.fullName}</h2>
                        <p>Email : {dean.email}</p>

                    </div>
                    <div className="flex flex-col">
                        <button onClick={() => handleEdit(dean)} className="mb-5">
                            Edit
                        </button>

                        <button onClick={() => handleDelete(dean)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}