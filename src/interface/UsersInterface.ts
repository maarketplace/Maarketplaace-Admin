export interface IUser {
    user_id: string;
    full_name: string;
    phone_number: string;
    email: string;
    verified: boolean;
    account_status: string;
    bio: string | null;
    image: string | null;
    image_cloud_url: string | null;
    created_at: string;
    updated_at: string;
}