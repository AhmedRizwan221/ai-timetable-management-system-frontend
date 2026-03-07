import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "../store/store";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Login, AuthLayout, SignUp, ChairmanDashboard, SuperAdminDashboard, DashboardLayout, Home, DeptDashboard, CreateTeacherChairman, DeanDashboard, FacultyDashboard, FacultyDepartments, ManageDeans,
  CreateDeptAssignChiarman, CreateDeanAndAssignFaculty, EditDean, EditChairman, EditTeacher, CreateTimeTable
} from '../components/index';
import Department from "../pages/Department";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Home />
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      // admin routes here 
      {
        path: '/dashboard/superadmin',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <SuperAdminDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: `/dashboard/facultyDashboard`,
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <FacultyDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/faculties/:facultyId/departments',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <FacultyDepartments />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/superadmin/create-dean',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateTeacherChairman />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/superadmin/manage-deans',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <ManageDeans />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/superadmin/create-faculty',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateDeanAndAssignFaculty />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/superadmin/edit-dean/:id',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <EditDean />
            </DashboardLayout>
          </AuthLayout>
        )
      },
        {
        path: '/dashboard/superadmin/delete-dean/:id',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <EditDean />
            </DashboardLayout>
          </AuthLayout>
        )
      },

      // dean routes here 
      {
        path: '/dashboard/dean',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <DeanDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        // here we need a separate component for faculty and dean
        path: '/dashboard/dean/create-department',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateDeptAssignChiarman />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/dean/departments',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <DeptDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/dean/create-chairman',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateTeacherChairman />
            </DashboardLayout>
          </AuthLayout>
        )
      },



      {
        path: '/dashboard/chairman',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <ChairmanDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },


      {
        path: '/dashboard/deptDashboard',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <DeptDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/departments/:id',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <Department />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/chairman/create-teacher',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateTeacherChairman />
            </DashboardLayout>
          </AuthLayout>
        )
      },
        {
        path: '/dashboard/chairman/create-timetable',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateTimeTable />
            </DashboardLayout>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
        {/* <App /> */}
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
