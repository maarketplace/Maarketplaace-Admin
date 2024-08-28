import React from "react";
import { Logo1 } from "../assets";
import { MdOutlineClear, MdOutlineDashboard } from "react-icons/md";

import { HiOutlineUsers } from "react-icons/hi";
import { BiMoneyWithdraw } from "react-icons/bi";

import { RiAccountPinCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = React.useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { name: "Overview", icon: <MdOutlineDashboard />, path: "overview" },
    { name: "Customers", icon: <HiOutlineUsers />, path: "deposit" },
    { name: "Transactions", icon: <BiMoneyWithdraw />, path: "withdraw" },

    { name: "Support", icon: <RiAccountPinCircleFill />, path: "support" },
  ];

  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
    setActive(false);
  };

  return (
    <aside className={`sidebar z-30 ${active ? "active" : ""}`}>
      <div className="close_icon" onClick={() => setActive(!active)}>
        <MdOutlineClear />
      </div>
      <div className="sidebar_inner">
        <div className="logo">
          <img src={Logo1} alt="maarketplace logo" />
          <span className="text-[#E4C354]">maarketPlaace</span>
        </div>
        <div className="sidebar_items w-[90%]">
          <ul className="sidebar_items_inner text-slate-400">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={selectedMenu === index ? "active" : ""}
                onClick={() => handleMenuClick(item.path, index)}
              >
                <span className="menu_icon">{item.icon}</span>
                <a href="#">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
