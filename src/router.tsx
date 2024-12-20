import { createHashRouter } from "react-router-dom";
import Login from "./auth/login";
import Welcome from "./welcome";
import Verify2fa from "./auth/2fa/Verify2fa";
import Enable2fa from "./auth/2fa/Enable2fa";
import Dashboard from "./dashboard";
import Courses from "./dashboard/courses";
import Users from "./dashboard/users";
import Products from "./dashboard/products";
import Overview from "./dashboard/overview";
import Order from "./dashboard/order";
import Merchants from "./dashboard/merchants";
import ResetPassword from "./auth/changePassword";

export const MainRoutes = createHashRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "verify2fa",
    element: <Verify2fa />,
  },
  {
    path: "enable2fa",
    element: <Enable2fa />,
  },
  {
    path: "change-password/:code",
    element: <ResetPassword />,
  },
  {
    path: "admin",
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Overview />
      },
      {
        path: '/admin/merchants',
        element: <Merchants />
      },
      {
        path: '/admin/courses',
        element: <Courses />
      },
      {
        path: '/admin/users',
        element: <Users />
      },
      {
        path: '/admin/products',
        element: <Products />
      },
      {
        path: '/admin/orders',
        element: <Order />
      },
    ]
  },
]);
