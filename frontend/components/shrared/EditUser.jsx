import { useNavigate } from "react-router-dom";
import Input from "../shrared/Input";
import Button from "./Button";
import { Plus, ArrowLeft } from "lucide-react";

export default function EditUser({
    title = "User",
    fields = [],
    err = {},
    onSubmit,
    handleSubmit,
    register,
    buttonText = "Update",
    Icon,
    redirectUrl=""
}) {
    // console.log(err);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 ">
            <div className="bg-white border border-gray-200 rounded-lg ">

                {/* Header */}
                <div className="border-b">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(redirectUrl)}
                                className="hidden md:inline-flex p-1.5 rounded-full border border-gray-300 bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer"
                            >
                                <ArrowLeft className="h-8 w-8" />
                            </button>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                {Icon && <Icon className="h-8 w-8 text-muted-foreground" />}
                            </div>
                            <h1 className="text-2xl font-bold">
                                Edit {title} Details
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                    {err && (
                        <p className="text-red-600 text-sm mb-4 text-center">
                            {err.message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-5 sm:grid-cols-2">

                            {fields.map((field) => (
                                <div className="space-y-2">
                                    <Input
                                        className="flex h-10 w-full items-center rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        key={field.name}
                                        label={field.label}
                                        type={field.type}
                                        icon={field.icon}
                                        placeholder={field.placeholder}
                                        {...register(field.name, field.validation)}
                                    />
                                </div>
                            ))}

                        </div>

                        <Button className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            {buttonText} {title}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}