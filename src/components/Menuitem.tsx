import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MeMenuInterface } from "../interface/MenuInterface";

export const menuItems: MeMenuInterface[] = [
  { name: "Overview", icon: <MdOutlineDashboard />, path: "overview" },
  { name: "Customers", icon: <HiOutlineUsers />, path: "deposit" },
  { name: "Transactions", icon: <BiMoneyWithdraw />, path: "withdraw" },
  { name: "Support", icon: <RiAccountPinCircleFill />, path: "support" },
];
