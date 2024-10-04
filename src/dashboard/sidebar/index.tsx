import { FiLogOut } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5"
import { RxDashboard } from "react-icons/rx"
import { useNavigate } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
interface SideBarProps {
    setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar = ({ setShowSidebar }: SideBarProps) => {
    const navigate = useNavigate();

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
    return (
        <div className="w-[100%] h-[80%] text-black">
            <div className="w-[100%] flex flex-col gap-[10px]">
                <span className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]" onClick={() => handleNavigation('/dashboard')}>
                    <RxDashboard className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Overview</p>
                </span>
                <span className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]" onClick={() => handleNavigation('/dashboard/order')}>
                    <IoBagHandleOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Orders</p>
                </span>
                <span className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]" onClick={() => handleNavigation('/admin/courses')}>
                    <IoBagHandleOutline className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Courses</p>
                </span>
                <span className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]" onClick={() => handleNavigation('/admin/users')}>
                    <LuUsers className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Users</p>
                </span>
                <span className="flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]" onClick={() => handleNavigation('/admin/products')}>
                    <LuUsers className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Products</p>
                </span>
                <span
                    className='flex items-center gap-[20px] justify-center h-[50px] cursor-pointer w-[90%]'
                    onClick={() => {
                        handleLogout()
                    }}
                >
                    <FiLogOut className="w-[20%] h-[15px]" />
                    <p className="text-[15px] w-[80%]">Log out</p>
                </span>
            </div>
        </div>
    )
}

export default SideBar