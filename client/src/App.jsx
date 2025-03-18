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
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import { authApi } from "./app/api/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/UserProfile";
import RoleBaseLayout from "./components/layout/RoleBaseLayout";
import { ModalProvider } from "./context/ModalContext";
import GlobalModal from "./components/Modal";

// import AdminLayout from "./components/layout/AdminLayout";
// import StudentLayout from "./components/layout/StudentLayout";
// import ParentLayout from "./components/layout/ParentLayout";
// import TeacherLayout from "./components/layout/TeacherLayout";



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
        path: "/admin",
        element: (
          <ProtectedRoute role='admin'>
            {/* <AdminLayout /> */}
            <RoleBaseLayout />

          </ProtectedRoute>


        ),
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: '/admin/profile', element: <UserProfilePage /> }

        ],
      },
      {
        path: "/student",
        element: (
          <ProtectedRoute role='student'>

            {/* <StudentLayout /> */}
            <RoleBaseLayout />
          </ProtectedRoute>

        ),
        children: [
          { path: "", element: <StudentDashboard /> },
          { path: '/student/profile', element: <UserProfilePage /> }

        ],
      },
      {
        path: "/teacher",
        element: (
          <ProtectedRoute role='teacher'>

            {/* <TeacherLayout /> */}
            <RoleBaseLayout />

          </ProtectedRoute>

        ),
        children: [
          { path: "", element: <TeacherDashboard /> },
          { path: '/teacher/profile', element: <UserProfilePage /> }


        ],
      },
      {
        path: "/parent",
        element: (
          <ProtectedRoute role='parent'>

            {/* <ParentLayout /> */}
            <RoleBaseLayout />
          </ProtectedRoute>

        ),
        children: [
          { path: "", element: <ParentDashboard /> },
          { path: '/parent/profile', element: <UserProfilePage /> }

        ],
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
      <ModalProvider>
        <RouterProvider router={appRoute} />
        <GlobalModal />
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
