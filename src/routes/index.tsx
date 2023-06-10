import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import { useEffect } from "react";
import { getProfile } from "../apis/userApi";

const RoutesComp: React.FC = () => {
  const { token } = useAuth();
  useEffect(() => {
    getProfile()
      .then(res => {
        console.log(res.data);

      }).catch(err => {
        console.log(err);

      })
  }, [])

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: (
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
            </Routes>
          )
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default RoutesComp;
