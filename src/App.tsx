import { RouterProvider } from "react-router-dom";
import { MainRoutes } from "./router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return <>
    <RouterProvider router={MainRoutes} />
    <Toaster/>
  </>;
};

export default App;
