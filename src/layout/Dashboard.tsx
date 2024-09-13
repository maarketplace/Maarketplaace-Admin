import { Outlet } from "react-router-dom";

// import Menu from "./Menu"
import { useState } from "react";
import UserHeader from "../components/Header";
import SideBar from "../components/Sidebar";

const Dashboard = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-screen w-screen max-w-[100vw] max-h-[100vh] overflow-hidden flex">
      <SideBar />
      <div className=" w-full h-full bg-[#F8F8F8]">
        <UserHeader active={active} setActive={setActive} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
