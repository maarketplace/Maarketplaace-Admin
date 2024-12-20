export interface IOrder {
    _id: string;
    user_id: string;
    merchant_id: string;
    products: string[]; 
    country: string;
    state: string;
    amount: number;
    status: string; 
    transaction_fee: number;
    payable_amount: number;
    created_at: string; 
    updated_at: string; 
  }
  