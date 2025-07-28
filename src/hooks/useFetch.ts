import { useQuery } from "react-query";
import { getProductCustomer, getProductDetails } from "../api/query";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(id),
    enabled: false,
  });
};

export const useProductCustomer = (id: string) => {
  return useQuery({
    queryKey: ["productCustomer"],
    queryFn: () => getProductCustomer(id),
    enabled: false,
  });
};
