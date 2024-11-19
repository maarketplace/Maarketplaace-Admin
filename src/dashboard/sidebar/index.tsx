import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom"; 
import { LuUsers } from "react-icons/lu";
import { BsCart, BsHandbag } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";

interface SideBarProps {
    setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ setShowSidebar }: SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        if (setShowSidebar) {
            setShowSidebar(false);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (setShowSidebar) {
            setShowSidebar(false);
        }
    };

    const getActiveClass = (path: string) => {
        return location.pathname === path ? 'bg-black text-white' : 'text-black'; // Add active class logic
    };

    return (
        <div className="w-[100%] h-[80%] text-black">
            <div className="w-[100%] flex flex-col gap-[10px]">
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin')}`}
                    onClick={() => handleNavigation('/admin')}
                >
                    <RxDashboard className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Overview</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/merchants')}`}
                    onClick={() => handleNavigation('/admin/merchants')}
                >
                    <LuUsers className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Merchants</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/courses')}`}
                    onClick={() => handleNavigation('/admin/courses')}
                >
                    <MdOutlineLibraryBooks className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Courses</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/users')}`}
                    onClick={() => handleNavigation('/admin/users')}
                >
                    <LuUsers className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Users</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/products')}`}
                    onClick={() => handleNavigation('/admin/products')}
                >
                    <BsCart className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Products</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/orders')}`}
                    onClick={() => handleNavigation('/admin/orders')}
                >
                    <BsHandbag className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Orders</p>
                </span>
                <span
                    className={`flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%] ${getActiveClass('/admin/orders')}`}
                    onClick={() => handleNavigation('/admin/orders')}
                >
                    <BsHandbag className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Transaction</p>
                </span>
                <span
                    className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]"
                >
                </span>
                <span
                    className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]"
                >
                </span>
                <span
                    className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]"
                    onClick={handleLogout}
                >
                    <FiLogOut className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Log out</p>
                </span>
            </div>
        </div>
    );
};

export default SideBar;
