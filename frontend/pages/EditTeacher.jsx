import React from "react";

export default function EditTeacher() {
    return(
        <h1>Hello</h1>
    )

//     return(
//         <h1>Edit Teacher details</h1>
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="border-b bg-card">
//         <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
//               <CalendarDays className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight text-foreground">
//                 Timetable Management
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 {user?.department?.deptName} Department
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
//         {/* Create Timetable Card */}
//         <Card className="overflow-hidden border shadow-sm">
//           <CardHeader className="bg-muted/40 pb-4">
//             <div className="flex items-center gap-2">
//               <GraduationCap className="h-5 w-5 text-primary" />
//               <CardTitle className="text-lg">Create Timetable</CardTitle>
//             </div>
//             <CardDescription>
//               Set up a new timetable by selecting semester, batch, and section
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {timetableError && (
//               <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3">
//                 <p className="text-sm font-medium text-destructive">
//                   {timetableError.message}
//                 </p>
//               </div>
//             )}
//             <form
//               onSubmit={handleSubmit(handleCreateTimeTable)}
//               className="space-y-5"
//             >
//               <div className="grid gap-5 sm:grid-cols-2">
//                 {/* Semester */}
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Layers className="h-3.5 w-3.5 text-muted-foreground" />
//                     Semester
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("semesterId", { required: true })}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Semester
//                     </option>
//                     {semesters.map((sem) => (
//                       <option key={sem._id} value={sem._id}>
//                         Semester {sem.semesterNumber} — Year {sem.studyYear}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Batch */}
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Users className="h-3.5 w-3.5 text-muted-foreground" />
//                     Batch
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("batchId", { required: true })}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Batch
//                     </option>
//                     {batches.map((batch) => (
//                       <option key={batch._id} value={batch._id}>
//                         Batch {batch.batchName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Department */}
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
//                     Department
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
//                     {...register("departmentId", { required: true })}
//                     defaultValue={user?.department?._id}
//                     disabled
//                   >
//                     <option value={user?.department?._id}>
//                       {user?.department?.deptName}
//                     </option>
//                   </select>
//                 </div>

//                 {/* Section */}
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Layers className="h-3.5 w-3.5 text-muted-foreground" />
//                     Section
//                     <span className="text-xs text-muted-foreground">(optional)</span>
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("sectionId")}
//                     defaultValue=""
//                   >
//                     <option value="">No Section</option>
//                     {sections.map((sect) => (
//                       <option key={sect._id} value={sect._id}>
//                         Section {sect.sectionName} — {sect?.department?.deptName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full sm:w-auto">
//                 <CalendarDays className="mr-2 h-4 w-4" />
//                 Create Timetable
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Create Timetable Slot Card */}
//         <Card className="overflow-hidden border shadow-sm">
//           <CardHeader className="bg-muted/40 pb-4">
//             <div className="flex items-center gap-2">
//               <Clock className="h-5 w-5 text-primary" />
//               <CardTitle className="text-lg">Create Timetable Slot</CardTitle>
//             </div>
//             <CardDescription>
//               Add a class slot to an existing timetable with day, time, teacher, and course
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {timetableError && (
//               <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3">
//                 <p className="text-sm font-medium text-destructive">
//                   {timetableError.message}
//                 </p>
//               </div>
//             )}
//             <form
//               onSubmit={handleSubmit(handleCreateTimeTableSlot)}
//               className="space-y-5"
//             >
//               {/* Timetable Selection */}
//               <div className="space-y-2">
//                 <Label className="flex items-center gap-1.5">
//                   <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
//                   Timetable
//                 </Label>
//                 <select
//                   className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                   {...register("timetableId", { required: true })}
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Timetable
//                   </option>
//                   {timeTables.map((temp) => (
//                     <option key={temp._id} value={temp._id}>
//                       {temp.batch.batchName} — Sem {temp.semester.semesterNumber}, Year{" "}
//                       {temp.semester.studyYear}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <Separator />

//               {/* Teacher & Course */}
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Users className="h-3.5 w-3.5 text-muted-foreground" />
//                     Teacher
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("teacherId", { required: true })}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Teacher
//                     </option>
//                     {teachers.map((teach) => (
//                       <option key={teach._id} value={teach._id}>
//                         {teach.fullName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
//                     Course
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("courseId", { required: true })}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Course
//                     </option>
//                     {courses.map((cour) => (
//                       <option key={cour._id} value={cour._id}>
//                         {cour.courseName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Day & Time */}
//               <div className="grid gap-5 sm:grid-cols-3">
//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
//                     Day
//                   </Label>
//                   <select
//                     className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                     {...register("day", { required: true })}
//                     defaultValue=""
//                   >
//                     <option value="" disabled>
//                       Select Day
//                     </option>
//                     <option value="Mon">Monday</option>
//                     <option value="Tue">Tuesday</option>
//                     <option value="Wed">Wednesday</option>
//                     <option value="Thu">Thursday</option>
//                     <option value="Fri">Friday</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Clock className="h-3.5 w-3.5 text-muted-foreground" />
//                     Start Time
//                   </Label>
//                   <Input
//                     type="time"
//                     {...register("startTime", { required: true })}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="flex items-center gap-1.5">
//                     <Clock className="h-3.5 w-3.5 text-muted-foreground" />
//                     End Time
//                   </Label>
//                   <Input
//                     type="time"
//                     {...register("endTime", { required: true })}
//                   />
//                 </div>
//               </div>

//               <Button type="submit" className="w-full sm:w-auto">
//                 <Clock className="mr-2 h-4 w-4" />
//                 Create Slot
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//    )
}