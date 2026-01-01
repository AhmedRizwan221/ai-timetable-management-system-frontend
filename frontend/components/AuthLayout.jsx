import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    const user = useSelector(state => state.auth.user);

    const getDashboardPath = (role) => {
        if(role === 'superadmin') {
            return '/dashboard/superadmin';
        }else if(role === 'chairman') {
            return '/dashboard/chairman';
        }else if(role === 'teacher') {
            return '/dashboard/teacher';
        }
    }

    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate('/login');
        }else if (!authentication && authStatus !== authentication) {
            navigate(getDashboardPath(user?.role));
        }
        setLoader(false);
    }, [authentication, authStatus, navigate, user]);

    return (
        loader ? <h1>Loading....</h1> :  children 
    )
}

export default Protected;