import { useProductCustomer } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Table from "../../utils/Table";

const Customer = () => {
  const { id } = useParams();
  const { data } = useProductCustomer({
    productId: id as string,
    limit: 10,
    page: 1,
  });
  const customers = data?.data.data?.customers;

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-2xl font-bold">Customer</p>
        <p className="text-slate-600">Manage and view customer information</p>
      </div>

      <Table
        data={customers || []}
        columns={[
          "Name",
          "Email",
          "Telephone",
          "Total Spent(₦)",
          "Status",
          "Last Purchase",
        ]}
      />
    </div>
  );
};

export default Customer;
