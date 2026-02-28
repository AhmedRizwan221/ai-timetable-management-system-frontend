import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "../store/store";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, AuthLayout, SignUp, ChairmanDashboard, SuperAdminDashboard, DashboardLayout, Home, DeptDashboard, CreateTeacherChairman, DeanDashboard, FacultyDashboard } from '../components/index';
import CreateDeptAssignChiarman from '../components/shrared/CreateDeptAssignChairman';
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
        path: '/faculties/:facultyId/departments',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <FacultyDashboard />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      // {
      //   path: `/dashboard/facultyDashboard`,
      //   element: (
      //     <AuthLayout authentication={true}>
      //       <DashboardLayout>
      //         <FacultyDashboard />
      //       </DashboardLayout>
      //     </AuthLayout>
      //   )
      // },
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
        path: '/dashboard/superadmin/create-chairman',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateTeacherChairman />
            </DashboardLayout>
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/superadmin/create-department',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <CreateDeptAssignChiarman />
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
