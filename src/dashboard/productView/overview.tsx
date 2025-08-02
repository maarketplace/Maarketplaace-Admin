import { TbCoins } from "react-icons/tb";
import { DetailsCard } from "../../utils/card";
import { moneyFormatter } from "../../utils";
import { useProductDetails } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { capitalizeFirstLetter } from "../../utils/copyable";

const Overview = () => {
  const { id } = useParams();
  const { data, isFetched } = useProductDetails(id as string);
  const product = isFetched && data?.data?.data;

  return (
    <div className={`w-full `}>
      <div className="grid grid-cols-4 grid-rows-1 gap-x-4">
        <DetailsCard
          icon={<TbCoins size={24} />}
          value={product?.revenue}
          label="Total Revenue"
        />

        <DetailsCard
          icon={<FiShoppingBag size={24} />}
          value={product?.totalPurchase}
          label="Total Sold"
        />

        <DetailsCard
          icon={<HiOutlineUser size={24} />}
          value={product?.totalCustomers}
          label="Total Customer"
          isMoney={false}
        />
      </div>

      <div className="flex w-full">
        <div className="w-1/2 shadow-sm px-6 py-12 space-y-6">
          <div>
            <h3 className="font-medium text-xl">Details</h3>
            <p className="text-sm font-medium text-slate-500">
              Key information and specifications
            </p>
          </div>

          <div className="grid grid-rows-2 grid-cols-2 gap-6 w-full ">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Category</p>
              <p>{product?.product?.category}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Price</p>
              <p>{moneyFormatter(product?.product?.productPrice)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Subcategory</p>
              <p>{capitalizeFirstLetter(product?.product?.subCategory)}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 border-x border-b rounded-b-md shadow-sm border-slate-300 px-6 py-12">
          <div>
            <h3 className="font-medium text-xl">Performance</h3>
            <p className="text-sm font-medium text-slate-500">
              Recent performance indicators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
