export interface ICourse {
    CourseName: string;
    Author: string;
    Price: string;
    Location: string;
    id: string;
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
    created_at: string;
    updated_at: string;
    Category: string;
    Date: string;
    RawStatus: string

}

export interface IFormattedCourse {
    CourseName: string;
    Author: string;
    Price: string;
    Category: string;
    Location: string;
    status: string;
    RawStatus: string;
    Date: string;
    id: string;
    course_URL: string;
    course_image: string;
    course_description: string;
    what_to_expect: string;
    course_id?: string
    merchant_id?: string;
    course_name?: string;
    course_price?: string;
    course_discountedPrice?: string;
    payment_price?: string;
    course_category?: string;
    author?: string;
    duration?: string;
    topics?: string;
    course_location?: string;
    course_subCategory?: string;
    course_image_cloud_url?: string;
    created_at?: string;
    updated_at?: string;
}