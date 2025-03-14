import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RegistrationPage from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AppLayout from "./components/layout/AppLayout";
import NotFoundPage from "./pages/NotFound";
import LoadingPage from "./pages/Loading";
import ErrorPage from "./pages/Error";
import LandingPage from "./pages/LandingPage";
import { ToastProvider } from "./context/ToastContext";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentLayout from "./components/layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherLayout from "./components/layout/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentLayout from "./components/layout/ParentLayout";
import ParentDashboard from "./pages/parent/ParentDashboard";
import { authApi } from "./app/api/auth";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
// import PrivateRoute from "./components/PrivateRoute"; // 👈 Create this component


const appRoute = createBrowserRouter([
  {

    path: "/",
    element: <AppLayout />,
    children: [
      { path: "*", element: <NotFoundPage /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "/loading", element: <LoadingPage /> },
      { path: "/", element: <LandingPage /> },
      {
        path: "admin",
        element: (
          <ProtectedRoute role='admin'>
            <AdminLayout />

          </ProtectedRoute>


        ),
        children: [{ path: "", element: <AdminDashboard /> }],
      },
      {
        path: "student",
        element: (
          <ProtectedRoute role='student'>

            <StudentLayout />
          </ProtectedRoute>

        ),
        children: [{ path: "", element: <StudentDashboard /> }],
      },
      {
        path: "teacher",
        element: (
          <ProtectedRoute role='teacher'>

            <TeacherLayout />
          </ProtectedRoute>

        ),
        children: [{ path: "", element: <TeacherDashboard /> }],
      },
      {
        path: "parent",
        element: (
          <ProtectedRoute role='parent'>

            <ParentLayout />
          </ProtectedRoute>

        ),
        children: [{ path: "", element: <ParentDashboard /> }],
      },
    ],
  },
  { path: "/registation", element: <RegistrationPage /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    };
    initializeApp();
  }, [dispatch]);


  if (loading) return <LoadingPage />
  return (
    <ToastProvider>
      <RouterProvider router={appRoute} />
    </ToastProvider>
  );
}

export default App;
