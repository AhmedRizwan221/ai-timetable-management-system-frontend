import { CalendarDays, Users, BookOpen, Layers, Plus, CalendarClock, Clock } from "lucide-react";
import Button from "../shrared/Button";

export default function TimeTableForm(
    {
        defaultValue,
        mode= "create",
        onSubmit,
        buttonText = "Submit",
        user,
        semesters,
        batches,
        sections,
        register,
        handleSubmit,
        err
    }
) {


    return (
        <div className="bg-white border border-gray-200 rounded-lg ">
            <div className=" bg-card">
                <div className="container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <CalendarDays className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {buttonText} Timetable {user?.department?.deptName}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {err && (
                    <p className="text-red-600 text-sm mb-2 text-center">{err.message}</p>
                )}
                <form id="form-1"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                                Semester
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("semesterId", { required: true })}
                            >
                                <option value="">Select Semester</option>
                                {semesters.map((sem) => (
                                    <option key={sem._id} value={sem._id}>
                                        {"Semester" + sem.semesterNumber} , {"Year" + sem.studyYear}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5" >
                                <Users className="h-3.5 w-3.5 text-muted-foreground" /> Batch
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("batchId", { required: mode === 'create' })}
                            >
                                <option value="">Select Batch</option>
                                {batches.map((batch) => (
                                    <option key={batch._id} value={batch._id}>
                                        {"Batch" + " " + batch.batchName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Department
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                {...register("departmentId", { required: mode === 'create' })}
                                defaultValue={user?.department?._id} disabled
                            >
                                <option value={user?.department?._id}>
                                    {user?.department?.deptName}
                                </option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5">
                                <Layers className="h-3.5 w-3.5 text-muted-foreground" /> Section
                            </label>
                            <select
                                className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                {...register("sectionId")}
                                defaultValue=""
                            >
                                <option value="">Select Section</option>
                                {sections.map((sect) => (
                                    <option key={sect._id} value={sect._id}>
                                        {"Section" + " " + sect.sectionName}, {sect?.department?.deptName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Button type="submit" className="w-full flex justify-center items-center sm:w-auto bg-[#1D293D] text-white hover:bg-[#162131] cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" /> {buttonText} Timetable
                    </Button>
                </form>
            </div>
        </div>
    )
}