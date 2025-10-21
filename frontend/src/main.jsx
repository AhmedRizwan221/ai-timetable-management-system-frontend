import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "../store/store";
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login, AuthLayout, SignUp, ChairmanDashboard, SuperAdminDashboard, DashboardLayout, Home, DeptDashboard, CreateTeacherChairman } from '../components/index';


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
          <DashboardLayout>
            <DeptDashboard />
          </DashboardLayout>
        )
      },
      {
        path: '/dashboard/superadmin/create-chairman',
        element: (
          <AuthLayout authentication={false}>
            <CreateTeacherChairman />
          </AuthLayout>
        )
      },
      {
        path: '/dashboard/chairman/create-teacher',
        element: (
          <AuthLayout authentication={false}>
            <CreateTeacherChairman />
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
