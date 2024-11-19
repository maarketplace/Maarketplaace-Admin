import { useEffect, useState } from "react"
import { getMerchant } from "../../api/query";
import { IErrorResponse } from "../../interface/ErrorInterface";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Table from "../../utils/Table";
import { IMerchant } from "../../interface/MerchantInterface";
import { capitalizeFirstLetter } from "../../utils/copyable";
import { statusColors } from "../../utils/StatusBadge";
const Merchants = () => {
  const navigate = useNavigate()
  const [allMerchant, setAllMerchant] = useState<IMerchant[]>([])

  const { data, isLoading, isError } = useQuery(['getAllMrchant'], getMerchant, {
    onError: (err: IErrorResponse) => {
      if (err.response.data.message == "Token expired login again") {
        localStorage.clear();
        navigate('/login')

      }
    }
  });
  useEffect(() => {
    if (data) {
      console.log(data);

      setAllMerchant(data?.data?.data?.data?.reverse())
    }

  }, [data])

  if (isError) {
    return <p>An error occurred while fetching the data.</p>;
  }
  const columns: Array<keyof typeof formattedData[0]> = [
    "Full Name",
    "Profession",
    "Business Name",
    "Phone Number",
    "Email",
    "Date Joined",
    "Status"
  ];

  const formattedData = allMerchant.map((user: IMerchant) => ({
    "Full Name": user?.full_name,
    "Profession": user?.profession,
    "Business Name": user.business_name,
    "Phone Number": user?.phone_number,
    "Email": user?.email,
    "Date Joined": new Date(user?.created_at).toLocaleDateString(),
    Status: (
      <span
        className={`px-2 py-1 rounded-md ${statusColors[capitalizeFirstLetter(user?.account_status)] ||
          "bg-gray-100 text-gray-800"
          }`}
      >
        {capitalizeFirstLetter(user?.account_status)}
      </span>
    ),
  }));

  return (
    <div className="w-[95%] h-[90%] max-[650px]:w-full flex items-center justify-center mt-[50px] max-[650px]:mt-[30px] max-[650px]:p-[10px] flex-col gap-[20px]">
      <p className="w-[100%] text-[20px] text-[lightgrey]">All Merchant</p>
      <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
        <Table
          data={formattedData}
          columns={columns}
          loading={isLoading}
          renderCell={(column, value) => {
            if (column === "Status" && typeof value !== "string") {
              return value as JSX.Element;
            }
            return value as string;
          }}
        />
      </div>
    </div>
  )
}

export default Merchants