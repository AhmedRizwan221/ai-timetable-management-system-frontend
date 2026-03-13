import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/auth/authSlice";

function DeanDashboard() {
    const dispatch = useDispatch();

    const { user = null, error, status } = useSelector((state) => state.auth);
    console.log(user);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getUser());
        }
    }, [dispatch, user])



    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Dean Name: {user?.fullName}</h1>
                <span className="block text-lg md:text-xl font-medium text-gray-800 mt-1">Dean of Faculty </span>
            </div>
            <div>
                <p>Total Departments </p>
                
            </div>

        </div>
    )
}

export default DeanDashboard;