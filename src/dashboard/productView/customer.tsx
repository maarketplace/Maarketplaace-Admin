import { moneyFormatter } from "../../utils";
import { useProductCustomer } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Table from "../../utils/Table";

const Customer = () => {
  const { id } = useParams();
  const { data, isFetched } = useProductCustomer(id as string);
  console.log(data, isFetched);

  const customerData = [
    {
      Name: "Sarah Johnson",
      Email: "sarah.j@example.com",
      Telephone: "+1 (555) 123-4567",
      "Total Spent(₦)": moneyFormatter(1240),
      Status: "Active",
      "Last Purchase": "2 days ago",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-2xl font-bold">Customer</p>
        <p className="text-slate-600">Manage and view customer information</p>
      </div>

      <Table
        data={customerData}
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
