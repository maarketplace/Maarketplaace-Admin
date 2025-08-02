import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { useState } from "react";
import Customer from "./customer";
import { useProductDetails } from "../../hooks/useFetch";
import { DetailsTab } from "../../interface/enum";
import Overview from "./overview";
import { dateFormatter } from "../../utils";
import { capitalizeFirstLetter } from "../../utils/copyable";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetched } = useProductDetails(id as string);
  const [currentTab, setCurrentTab] = useState(DetailsTab.OVERVIEW as string);
  const product = isFetched && data?.data?.data?.product;

  return (
    <div className="w-[100%] h-[90%] max-[650px]:w-full flex justify-start mt-[50px] pr-4 max-[650px]:mt-[30px] max-[650px]:p-[10px] flex-col gap-[20px]">
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-2 border py-2 px-3 rounded-md w-fit"
      >
        <MdOutlineArrowBack />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      <div className="flex w-full items-center justify-between shadow-md border-slate-100 border rounded-lg p-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-800">
              {product?.productName}
            </h2>
            <span className="text-xs bg-green-500 border border-green-500 bg-opacity-50 py-0.5 px-2 rounded-2xl">
              {product?.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-600">
            <span>•</span>
            <span>{capitalizeFirstLetter(product?.productType)}</span>
            <span>•</span>
            <span>Last updated: </span>
            <span>
              {product?.updated_at && dateFormatter(product?.updated_at)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-md border-slate-300">
            <FiShare2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      <div className="rounded-lg w-full bg-white flex flex-col">
        <div className="border border-b-slate-300 px-6 pt-4  rounded-t-md">
          <div className="flex gap-x-6 bg-slate-100 p-1.5 rounded-t-md w-fit">
            {["Overview", "Customer"].map((tab) => {
              const activeTab = currentTab === tab;

              return (
                <div
                  key={tab}
                  aria-label={tab}
                  className={`cursor-pointer px-4 py-1.5 rounded-md ${
                    activeTab ? "bg-white" : "bg-inherit"
                  } `}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-6 w-full shadow-md border-x border-slate-300">
          {currentTab === DetailsTab.OVERVIEW ? <Overview /> : null}
          {currentTab === DetailsTab.CUSTOMER ? <Customer /> : null}
        </div>
      </div>
    </div>
  );
}
