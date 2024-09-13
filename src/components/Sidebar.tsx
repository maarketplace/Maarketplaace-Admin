// const { VITE_TOKEN } = import.meta.env;
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PiUsersThree } from "react-icons/pi";
import { IoCartOutline, IoQrCodeOutline, IoBagHandleOutline, IoStorefrontOutline } from "react-icons/io5";
export interface ToggleSidebar {
  showSideBar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = () => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    navigate('/')
    localStorage.clear();
  };
  return (
    <div className="w-[20%] h-[100vh] flex items-center justify-between bg-[#FFC300] flex-col">
      <div className="w-full h-[10%] flex justify-center bg-black rounded-br-[16px]">
        <img src="/MARKETPLAACE 1.svg" alt="" className="w-[150px]" />
      </div>
      <div className="w-[100%] h-[80%] flex flex-col gap-[10px]">
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%]`}

        >
          <RxDashboard className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Dashboard</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%]`}
        >
          <IoStorefrontOutline className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Store</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%]`}
        >
          <IoCartOutline className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Add Product</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%]`}
        >
          <IoBagHandleOutline className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Order</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%]`}
        >
          <IoQrCodeOutline className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Transaction</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] `}
        >
          <PiUsersThree className="w-[20%] h-[20px]" />
          <p className="text-[15px] w-[80%]">Customer</p>
        </span>
        <span
          className={`flex items-center gap-[30px] justify-center h-[50px] cursor-pointer w-[100%] `}
          onClick={() => {
            handleLogoutClick()
          }}
        >
          <FiLogOut className="w-[20%] h-[15px]" />
          <p className="text-[15px] w-[80%]">Log out</p>
        </span>
      </div>
    </div>
  );
};

export default SideBar;
