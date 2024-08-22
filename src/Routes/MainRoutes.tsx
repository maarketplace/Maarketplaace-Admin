import { createBrowserRouter } from "react-router-dom";
import Welcome from "../components/Welcome";
import Login from "../Auth/Login";

export const MainRoutes = createBrowserRouter([
  {
    path: "",
    element: <Welcome />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
