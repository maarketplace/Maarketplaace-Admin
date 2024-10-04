export interface ICourse {
    Author: ReactNode;
    Price: ReactNode;
    Location: ReactNode;
    Status: ReactNode;
    id: string ;
    course_id: string;
    merchant_id: string;
    course_name: string;
    course_price: string;
    course_discountedPrice: string;
    payment_price: string;
    course_description: string;
    course_image: string;
    course_category: string;
    status: string;
    author: string;
    duration: string;
    topics: string;
    what_to_expect: string;
    course_location: string;
    course_subCategory: string;
    course_image_cloud_url: string;
    course_URL: string;
    created_at: string;  // or Date if you convert it
    updated_at: string;  // or Date if you convert it
}
