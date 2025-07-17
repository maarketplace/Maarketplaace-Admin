import { useQuery } from "react-query";
import { getProductDetails } from "../api/query";

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["productDetails"],
    queryFn: () => getProductDetails(id),
  });
};
