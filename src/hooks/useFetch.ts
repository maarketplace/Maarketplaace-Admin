import { useQuery } from "react-query";
import { getProductCustomer, getProductDetails } from "../api/query";
import { ICustomerParam } from "../interface/AdminInterface";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(id),
  });
};

export const useProductCustomer = (param: ICustomerParam) => {
  return useQuery({
    queryKey: ["productCustomer"],
    queryFn: () => getProductCustomer(param),
  });
};
