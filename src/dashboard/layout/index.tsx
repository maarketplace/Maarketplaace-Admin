import { Outlet } from "react-router-dom";
import SideBar from "../sidebar";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
const Layout = () => {
  const [showSideBar, setShowSidebar] = useState<boolean>(false)
  const handleResize = () => {
    if (window.innerWidth >= 768) {
        setShowSidebar(false);
    }
};

// Add event listener for window resize
useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);  // Cleanup listener on component unmount
    };
}, []);
  return (
    <div className="h-[100vh] w-[100%] flex">
      <div className="w-[15%] h-[100%] flex flex-col items-center max-[650px]:hidden">
        <div className="w-full h-[10%] flex items-center p-[10px] gap-1">
          <img src="/MARKET.svg" alt="" className="w-[40px]" />
          <img src="/MARKETPLAACE 1.svg" alt="" className="w-[150px] mt-[20px]" />
        </div>
        <div className="bg-[#FFC300] w-full h-[90%] rounded-tr-[16px] p-[10px] ">
          <SideBar />
        </div>
      </div>
      <div className=" w-[85%] h-full flex justify-center flex-col max-[650px]:w-[100%]">
        <div className="w-[100%] h-[10%] bg-[#FFc300] rounded-bl-[16px]">
          <span className="w-[30%] h-[100%] max-[650px]:w-[50%] flex items-center">
            <HiMenuAlt2 className=" text-[30px] hidden max-[650px]:flex" onClick={() => setShowSidebar(!showSideBar)} />
          </span>
          {
            showSideBar &&
            <div className="fixed w-[100%] top-[61px] h-[92vh] z-[100] bg-[#00000054] rounded-tl-[10px] flex">
              <div className="w-[75%] bg-[#FFC300] h-[100%] ">
                <SideBar setShowSidebar={setShowSidebar} />
              </div>
              <div className="w-[30%] h-[100%]" onClick={() => setShowSidebar(!showSideBar)}></div>
            </div>
          }
        </div>
        <div className="w-[100%] h-[90%] flex justify-center overflow-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
