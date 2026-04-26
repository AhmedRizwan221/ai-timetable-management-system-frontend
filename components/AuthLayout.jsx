import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    const user = useSelector(state => state.auth.user);

    const getDashboardPath = (role) => {
        if (role === 'admin') {
            return '/dashboard/superadmin';
        } else if (role === 'dean') {
            return '/dashboard/dean';
        }
        else if (role === 'chairman') {
            return '/dashboard/chairman';
        } else if (role === 'teacher') {
            return '/dashboard/teacher';
        }
    }

    useEffect(() => {
        // if (authStatus === undefined) return;
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate(getDashboardPath(user?.role));
        }
        setLoader(false);
    }, [authentication, authStatus, navigate, user]);

    return (
        loader ? <h1>Loading....</h1> : children
    )
}

export default Protected;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Protected({ children, authentication = true }) {
//     const navigate = useNavigate();
//     const authStatus = useSelector(state => state.auth.status);
//     const user = useSelector(state => state.auth.user);

//     const getDashboardPath = (role) => {
//         switch (role) {
//             case "admin":
//                 return "/dashboard/superadmin";
//             case "dean":
//                 return "/dashboard/dean";
//             case "chairman":
//                 return "/dashboard/chairman";
//             case "teacher":
//                 return "/dashboard/teacher";
//             default:
//                 return "/";
//         }
//     };

//     useEffect(() => {
//         // Wait until auth state is known
//         if (authStatus === undefined) return;

//         if (authentication && !authStatus) {
//             navigate("/login", { replace: true });
//         }

//         if (!authentication && authStatus) {
//             navigate(getDashboardPath(user?.role), { replace: true });
//         }

//     }, [authentication, authStatus, navigate, user]);

//     return children;
// }

// export default Protected;