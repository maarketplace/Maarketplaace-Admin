export interface IProduct {
    product_id: string;
    merchant_id: string;
    product_name: string;
    product_price: string;
    payment_price: string;
    discount_price: string;
    quantity: string;
    in_stock: boolean;
    product_description: string;
    eBook: string | null;
    author: string;
    pages: number;
    duration: string;
    topics: string;
    what_to_expect: string;
    product_image: string;
    category: string;
    sub_category: string;
    created_at: string;
    updated_at: string;
    status: null
  }