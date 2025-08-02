export interface IAdminData {
  merchants: number;
  products: number;
  courses: number;
  orders: number;
  users: number;
}

export interface ICustomerParam {
  page: number;
  limit: number;
  productId: string;
}
