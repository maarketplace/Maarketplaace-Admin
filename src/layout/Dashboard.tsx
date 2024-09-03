import { Outlet } from "react-router-dom";

// import Menu from "./Menu"
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import UserHeader from "../components/Header";

const Dashboard = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen w-screen max-w-[100vw] max-h-[100vh] overflow-hidden flex">
      <Sidebar active={active} setActive={setActive} />
      <div className=" w-full h-full bg-[#F8F8F8]">
        <UserHeader active={active} setActive={setActive} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
