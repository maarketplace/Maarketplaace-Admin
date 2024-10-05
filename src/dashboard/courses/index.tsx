import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/query";
import Table from "../../utils/Table";
import { ICourse } from "../../interface/CourseInterface";
import { IErrorResponse } from "../../interface/ErrorInterface";
import { useNavigate } from "react-router-dom";
import { approveCourse } from "../../api/mutation";
import toast from "react-hot-toast";
import './Courses.css'
import { FaTimes } from "react-icons/fa";
const Courses = () => {
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState<ICourse[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [selectedOrder, setSelectedOrder] = useState<ICourse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError } = useQuery(['getAllCourses'], getAllCourses, {
        onError: (err: IErrorResponse) => {
            if (err.response.data.message == "Token expired login again") {
                localStorage.clear();
                navigate('/login')

            }
        }
    });

    useEffect(() => {
        if (data?.data?.data) {
            const coursesObject = data.data.data;
            const coursesArray: ICourse[] = Object.values(coursesObject);
            setAllCourses(coursesArray.reverse());
        }
    }, [data]);

    if (isError) {
        return <p>An error occurred while fetching the data.</p>;
    }

    const columns: Array<keyof typeof formattedData[0]> = [
        "CourseName",
        "Author",
        "Price",
        "Category",
        "Location",
        "Status",
        "Date",
    ];

    const formattedData = allCourses.map((course: ICourse) => ({
        "CourseName": course?.course_name || "N/A",
        "Author": course?.author || "N/A",
        "Price": course?.payment_price || "N/A",
        "Category": course?.course_category,
        "Location": course?.course_location || "N/A",
        "Status": course?.status || "N/A",
        "Date": new Date(course?.created_at).toLocaleDateString(),
        "id": course?.course_id,
        "course_URL": course?.course_URL,
        "course_image": course?.course_image,
        "course_description": course?.course_description,
        "what_to_expect": course?.what_to_expect,
    }));

    const filteredOrders = formattedData.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.Status === statusFilter;
    });

    const handleRowClick = (row: ICourse) => {
        setSelectedOrder(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleReject = () => {
        console.log("Rejected", selectedOrder);
        closeModal();
    };
    const handleApprove = async () => {
        if (!selectedOrder) return;
        console.log('Selected Order:', selectedOrder);
        try {
            await approveCourse(selectedOrder?.id);
            toast.success("Course approved successfully");
            closeModal();
        } catch (error) {
            toast.error("Failed to approve course");
        }
    };

    return (
        <div className="w-[95%] h-[90%] max-[650px]:w-full flex items-center justify-center mt-[50px] max-[650px]:mt-[30px] max-[650px]:p-[10px]">
            <div className="w-[100%] h-[100%] flex flex-col gap-[20px]">
                <div className="flex justify-between items-center mb-4 ">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border rounded text-black outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Approved">Approved</option>
                        <option value="Review">Review</option>
                        <option value="Rejected">Rejected</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <Table
                    data={filteredOrders as ICourse[]}
                    columns={columns}
                    loading={isLoading}
                    onRowClick={(row: ICourse) => handleRowClick(row)}
                />

                {/* Modal for approving/rejecting courses */}
                {isModalOpen && selectedOrder && (
                    <div className="fixed h-[100vh] inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-scroll flex-col">
                        <div className="bg-white h-[90%] p-6 rounded-md w-[90%] max-w-md flex flex-col gap-[10px] overflow-scroll relative">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-black rounded fixed  right-8"
                            >
                                <FaTimes />
                            </button>
                            <div>
                                <img src={selectedOrder.course_image} alt="" />
                            </div>
                            <div>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong >Course Name:</strong> {selectedOrder.CourseName}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Author:</strong> {selectedOrder.Author}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Price:</strong> {selectedOrder.Price}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Location:</strong> {selectedOrder.Location}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Status:</strong> {selectedOrder.Status}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Course Link:</strong> <a href={selectedOrder?.course_URL} className="text-[#6babeb]">click here to access course link</a></p>
                            </div>
                            <div>
                                <p>Description: </p>
                                <div className='text-[12px] mt-[10px]' dangerouslySetInnerHTML={{ __html: selectedOrder?.course_description }} />
                            </div>
                            <div>
                                <p>What to Expect: </p>
                                <div className='text-[12px] mt-[10px]' dangerouslySetInnerHTML={{ __html: selectedOrder?.what_to_expect }} />
                            </div>
                            <div className="flex justify-end mt-4 gap-4">
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
