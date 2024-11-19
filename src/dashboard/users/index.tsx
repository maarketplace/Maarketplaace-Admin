import { useEffect, useState } from "react"
import { IUser } from "../../interface/UsersInterface"
import { getAllUser } from "../../api/query";
import { IErrorResponse } from "../../interface/ErrorInterface";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Table from "../../utils/Table";
const Users = () => {
    const navigate = useNavigate()
    const [allUser, setAllUser] = useState<IUser[]>([])
    const [statusFilter, setStatusFilter] = useState<string>("All");

    const { data, isLoading, isError } = useQuery(['getAllUser'], getAllUser, {
        onError: (err: IErrorResponse) => {
            if (err.response.data.message == "Token expired login again") {
                localStorage.clear();
                navigate('/login')

            }
        }
    });
    useEffect(() => {
        if (data) {
            setAllUser(data?.data?.data?.users?.reverse())
        }

    }, [data])

    if (isError) {
        return <p>An error occurred while fetching the data.</p>;
    }
    const columns: Array<keyof typeof formattedData[0]> = [
        "Full Name",
        "Phone Number",
        "Email",
        "Status"
    ];

    const formattedData = allUser.map((user: IUser) => ({
        "Full Name": user?.full_name,
        "Phone Number": user?.phone_number,
        "Email": user?.email,
        "Status": user?.account_status
    }));

    const filteredOrders = formattedData.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.Status === statusFilter;
    });
    return (
        <div className="w-[95%] h-[90%] max-[650px]:w-full flex items-center justify-center mt-[50px] max-[650px]:mt-[30px] max-[650px]:p-[10px] flex-col gap-[20px]">
             <p className="w-[100%] text-[20px] text-[lightgrey]">All User</p>
            <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
                <div className="flex justify-between items-center mb-4 ">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border rounded text-black outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Review">Review</option>
                        <option value="Rejected">Rejected</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <Table
                    data={filteredOrders}
                    columns={columns}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default Users