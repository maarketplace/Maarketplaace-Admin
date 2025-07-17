import { TbCurrencyNaira } from "react-icons/tb";
import { DetailsCard } from "../../utils/card";
import { moneyFormatter } from "../../utils";
import { useProductDetails } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { id } = useParams();
  const { data, isFetched } = useProductDetails(id as string);
  const product = isFetched && data?.data?.data;
  console.log(product);

  return (
    <div className={`w-full `}>
      <div className="grid grid-cols-4 grid-rows-1 gap-x-4">
        <DetailsCard
          icon={<TbCurrencyNaira size={20} />}
          value={12300}
          label="Total Sales"
        />

        <DetailsCard
          icon={<TbCurrencyNaira size={20} />}
          value={12300}
          label="Total Sold"
        />

        <DetailsCard
          icon={<TbCurrencyNaira size={20} />}
          value={12300}
          label="Total Customer"
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

          <div>
            <p className="text-sm font-medium text-slate-600">Description</p>
            <p>{product?.product_description}</p>
          </div>

          <div className="grid grid-rows-2 grid-cols-2 gap-6 w-full ">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Category</p>
              <p>{product?.category}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Price</p>
              <p>{moneyFormatter(product?.product_price)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600">Rating</p>
              <p>4.5</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-sm px-6 py-12">
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
