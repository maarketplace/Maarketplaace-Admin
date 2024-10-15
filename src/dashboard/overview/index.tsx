import { LuUsers } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { useQuery } from "react-query";
import { getAdmin } from "../../api/query";
// import { IErrorResponse } from "../../interface/ErrorInterface";
import { useEffect, useState } from "react";
import { IAdminData } from "../../interface/AdminInterface";
// import { IoBagHandleOutline } from "react-icons/io5"
const Overview = () => {
    const [admin, setAdmin] = useState<IAdminData | null>(null)
    const {
        data,
    } = useQuery(["getAdmin"], getAdmin, {
        onError: () => {

        }
    });

    useEffect(() => {
        if (data?.data?.data) {
            setAdmin(data?.data?.data)
        }
    }, [data])
    // console.log(data?.data?.data);

    return (
        <div className="w-[95%] h-[90%] mt-[50px]">
            <div className="w-full flex gap-[10px] justify-center flex-wrap">
                <div className="w-[280px] h-[100px] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] p-[10px] max-[650px]:w-[180px] max-[389px]:w-[95%]">
                    <span className="w-[90%] flex gap-[10px] items-center">
                        <BsCart className="text-[25px]" />
                        <p className="text-[20px] font-light">Products</p>
                    </span>
                    <span className="w-[40%] flex justify-center">
                        <p className="text-[30px]">{admin?.products}</p>
                    </span>
                </div>
                <div className="w-[280px] h-[100px] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] p-[10px] max-[650px]:w-[180px] max-[389px]:w-[95%]">
                    <span className="w-[90%] flex gap-[10px] items-center">
                        <LuUsers className="text-[25px]" />
                        <p className="text-[20px] font-light">Users</p>
                    </span>
                    <span className="w-[40%] flex justify-center">
                        <p className="text-[30px]">{admin?.users}</p>
                    </span>
                </div>
                <div className="w-[280px] h-[100px] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] p-[10px] max-[650px]:w-[180px] max-[389px]:w-[95%]">
                    <span className="w-[90%] flex gap-[10px] items-center">
                        <LuUsers className="text-[25px]" />
                        <p className="text-[20px] font-light">Merchants</p>
                    </span>
                    <span className="w-[40%] flex justify-center">
                        <p className="text-[30px]">{admin?.merchants}</p>
                    </span>
                </div>
                <div className="w-[280px] h-[100px] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] p-[10px] max-[650px]:w-[180px] max-[389px]:w-[95%]">
                    <span className="w-[90%] flex gap-[10px] items-center">
                        <LuUsers className="text-[25px]" />
                        <p className="text-[20px] font-light">Orders</p>
                    </span>
                    <span className="w-[40%] flex justify-center">
                        <p className="text-[30px]">{admin?.orders}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Overview