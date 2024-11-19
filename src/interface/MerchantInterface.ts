export interface IMerchant {
    merchant_id: string;
    password: string;
    full_name: string;
    business_name: string;
    email: string;
    role_slug: string;
    verified: boolean;
    account_status: "active" | "inactive" | "suspended"; // Replace with possible statuses
    profession: string;
    bio: string;
    address: string | null;
    image: string;
    image_cloud_url: string;
    is_admin: boolean;
    phone_number: string;
    subscribed: boolean;
    subscription_type: "Regular" | "Premium" | "Enterprise"; // Replace with actual types
    product: string | null;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  