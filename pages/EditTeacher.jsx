import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../store/user/user";
import { useForm } from "react-hook-form";
import { Users, Lock, Mail } from "lucide-react";
import EditUser from "../components/shrared/EditUser";

export default function EditTeacher() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const handleUpdateTeacherData = async (data) => {
        try {
            await dispatch(updateUserData({
                role: 'teacher',
                id,
                data: {
                    fullName: data.fullname,
                    email: data.email,
                    password: data.password
                }
            })).unwrap();
            reset();
            alert("Teacher updated successfully!");
        } catch (error) {
            //    console.log(error);
            return error
        }
    };

    return (
        <EditUser
            title="Teacher"
            buttonText="Update"
            fields={[
                { name: "fullname", label: "Full Name", type: "text", icon: Users, placeholder: "Enter FullName" },
                { name: "email", label: "Email", type: "email", icon: Mail, placeholder: "Enter Email" },
                { name: "password", label: "Password", type: "password", icon: Lock, placeholder: "Enter Password" }
            ]}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={handleUpdateTeacherData}
            redirectUrl='/dashboard/chairman/manage-teachers'
        />

        // <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 ">
        //     <div className="bg-white border border-gray-200 rounded-lg ">
        //         <div className=" bg-card">
        //             <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
        //                 <div className="flex items-center gap-3">
        //                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        //                         <Users className="h-8 w-8 text-primary-foreground" />
        //                     </div>
        //                     <h1 className="text-2xl font-bold tracking-tight text-foreground">
        //                         Edit Teacher Details
        //                     </h1>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        //             {error && (
        //                 <p className="text-red-600 text-sm mb-2 text-center">{error.message}</p>
        //             )}
        //             <form
        //                 onSubmit={handleSubmit(handleUpdateTeacherData)}
        //             >
        //                 <div className="grid gap-5 sm:grid-cols-2">
        //                     <div className="space-y-2">
        //                         <Input
        //                             label="Full Name"
        //                             className="flex h-10 w-full items-center rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        //                             icon={Users}
        //                             placeholder="Enter full name"
        //                             type="text"
        //                             {...register("fullname")}
        //                         />
        //                     </div>
        //                     <div className="space-y-2">
        //                         <Input
        //                             label="Email"
        //                             placeholder="Enter your Email"
        //                             type="email"
        //                             icon={Mail}
        //                             className="flex h-10 w-full items-center rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        //                             {...register('email', {
        //                                 validate: {
        //                                     matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"
        //                                 }
        //                             })}
        //                         />
        //                     </div>
        //                     <div className="space-y-2">
        //                         <Input
        //                             label="password"
        //                             type="password"
        //                             icon={Lock}
        //                             className="flex h-10 w-full items-center rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        //                             placeholder="Enter your password"
        //                             autoComplete="current-password"
        //                             {...register('password')}
        //                         />
        //                     </div>

        //                 </div>

        //                 <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
        //                     <Plus className="mr-2 h-4 w-4" />  Update Teacher
        //                 </Button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    )

}