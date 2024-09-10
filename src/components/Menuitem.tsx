import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MeMenuInterface } from "../interface/MenuInterface";


interface MenuItemsProps {
  items: MeMenuInterface[];
  onMenuClick: (path: string, index: number) => void;
  selectedMenu: number | null;
}

export const MenuItemsArray: MeMenuInterface[] = [
  { name: "Overview", icon: <MdOutlineDashboard />, path: "overview" },
  { name: "Customers", icon: <HiOutlineUsers />, path: "deposit" },
  { name: "Transactions", icon: <BiMoneyWithdraw />, path: "withdraw" },
  { name: "Support", icon: <RiAccountPinCircleFill />, path: "support" },
];
const MenuItems: React.FC<MenuItemsProps> = ({ items, onMenuClick, selectedMenu }) => {
  return (
    <ul className="menu-items">
      {items.map((item, index) => (
        <li
          key={index}
          className={`menu-item ${selectedMenu === index ? "active" : ""}`}
          onClick={() => onMenuClick(item.path, index)}
        >
          {item.icon}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
