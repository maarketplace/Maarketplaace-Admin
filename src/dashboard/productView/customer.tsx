import { FiMail, FiMapPin, FiPhone, FiSearch } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { moneyFormatter } from "../../utils";

const Customer = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">Customer</p>
          <p className="text-slate-600">Manage and view customer information</p>
        </div>
        <div className="flex items-center border border-slate-300 rounded-md px-4 py-2 gap-x-2 ">
          <FiSearch color="#64748b" />
          <input
            type="search"
            placeholder="Search customers..."
            className="outline-none w-[300px]"
          />
        </div>
      </div>

      <div className="flex mt-6 justify-between w-full items-center gap-3 px-4 hover:shadow-md transition-all duration-500 py-8 rounded-md">
        <div className="flex items-center gap-x-3">
          <RxAvatar size={36} />
          <div>
            <p>Sarah Johnson</p>
            <div className="flex text-sm items-center gap-x-3 text-slate-600">
              <div className="flex items-center gap-1">
                <FiMail />
                <span>sarah.j@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <FiPhone />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 ">
          <div>
            <p>Active</p>
            <p>{`Total Spent: ${moneyFormatter(1240)}`}</p>
            <p>Last Purchase: 2 days ago</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-slate-300 rounded-md px-4 py-2 bg-inherit">
              View
            </button>
            <button className="border border-slate-300 rounded-md px-4 py-2 bg-inherit">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
