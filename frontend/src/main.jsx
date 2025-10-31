import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "../store/store";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, AuthLayout, SignUp, ChairmanDashboard, SuperAdminDashboard, DashboardLayout, Home, DeptDashboard, CreateTeacherChairman, DepartmentCard } from '../components/index';
import CreateDeptAssignChiarman from '../components/shrared/CreateDeptAssignChairman';


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
        path: '/department/:id',
        element: (
          <AuthLayout authentication={true}>
            <DashboardLayout>
              <DepartmentCard />
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
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
