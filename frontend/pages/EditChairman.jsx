import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../store/user/user";
import { useForm } from "react-hook-form";
import { Users, Lock, Mail } from "lucide-react";
import EditUser from "../components/shrared/EditUser";


export default function EditChairman() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleUpdateChairman = async (data) => {
        try {
            await dispatch(updateUserData({
                role: 'chairman',
                id,
                data: {
                    fullName: data.fullname,
                    email: data.email,
                    password: data.password
                }
            })).unwrap();
            reset();
            alert("Chairman updated successfully!");
            if (user?.role === 'dean') {
                navigate('/dashboard/dean');
            }
        } catch (error) {
            //    console.log(error);
            return error
        }
    }

    return (
        <EditUser
            title="Chairman"
            buttonText="Update"
            fields={[
                { name: "fullname", label: "Full Name", type: "text", icon: Users },
                { name: "email", label: "Email", type: "email", icon: Mail },
                { name: "password", label: "Password", type: "password", icon: Lock }
            ]}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={handleUpdateChairman}
        />
    )
}