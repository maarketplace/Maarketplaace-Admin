import { createBrowserRouter } from "react-router-dom";
import Welcome from "../components/Welcome";
import Login from "../Auth/Login";
import TwoFa from "../Auth/TwoFa";

export const MainRoutes = createBrowserRouter([
  {
    path: "",
    element: <Welcome />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "2fa",
    element: <TwoFa />,
  },
]);
