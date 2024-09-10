import React from "react";
import { Logo1 } from "../assets";
import { MdOutlineClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SidebatInter } from "../interface/SideInterface";
import { MeMenuInterface } from "../interface/MenuInterface";
import { menuItems } from "./Menuitem"; // Import the menuItems

interface SidebarProps extends SidebatInter {
  menuItems: MeMenuInterface[];
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive, menuItems }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = React.useState<number | null>(null);

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
          <menuItems
            items={menuItems}
            onMenuClick={handleMenuClick}
            selectedMenu={selectedMenu}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
