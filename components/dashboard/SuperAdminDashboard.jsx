import { useEffect } from "react";
import { allSlotsInUni } from "../../store/timetableSlot/timetableSlot";
import { useDispatch, useSelector } from "react-redux";
import { getAlDeans } from "../../store/user/user";
import TimeTableView from "../shrared/TimeTableView";
import ChatBot from "../chatbot/chatbot";
import { fetchAllDepartments } from "../../store/dept/departmentSlice";
import {allCoursesOfUni} from "../../store/course/course";

function SuperAdminDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { totalSlots, timeTableSlot = [], error: TimeTableSlotError } = useSelector((state) => state.timetabelSlot);
  const { totalTeachers, loading: teacherLoader } = useSelector((state) => state.user);
  const { totalChairmans = null, loading: chairmanLoader } = useSelector((state) => state.user);
  const { totalCourses } = useSelector((state) => state.course);
  const { departments = [] } = useSelector((state) => state.department);
  const {totalDeans} = useSelector((state) => state.user);

  // console.log(timeTableSlot);

  useEffect(() => {
    if (user) {
      dispatch(allSlotsInUni());
      dispatch(fetchAllDepartments());
      dispatch(getAlDeans());
      dispatch(allCoursesOfUni());
    }
  }, [dispatch, user]);

  return (
    <div>
      <TimeTableView
        slots={totalSlots}
        user={user}
        totalTeachers={totalTeachers}
        totalChairmans={totalChairmans}
        timeTableSlot={timeTableSlot}
        totalCourses={totalCourses}
        departments={departments}
        totalDeans={totalDeans}
      />
      <ChatBot role={user?.role} />
    </div>
  );
}

export default SuperAdminDashboard;
