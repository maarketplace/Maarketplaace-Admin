import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/query";
import Table from "../../utils/Table";
import { ICourse, IFormattedCourse } from "../../interface/CourseInterface";
import { IErrorResponse } from "../../interface/ErrorInterface";
import { useNavigate } from "react-router-dom";
import { approveCourse, messageMerchantByEmail } from "../../api/mutation";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";


const Courses = () => {
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState<ICourse[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [selectedOrder, setSelectedOrder] = useState<ICourse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState<string>("");


    const { data, isLoading, isError } = useQuery(['getAllCourses'], getAllCourses, {
        onError: (err: IErrorResponse) => {
            if (err.response.data.message == "Token expired login again") {
                localStorage.clear();
                navigate('/login')

            }
        }
    });
    const { mutate: messageMerchantMutate, isLoading: messageMerchantLoading } = useMutation(["messageMerchant"],
        (params: { id: string; data: string }) => messageMerchantByEmail(params.id, params.data),
        {
            onSuccess: () => {
                toast.success("Message sent to merchant")
            },
            onError: () => {
                toast.error("Failed to send message to merchant")
            }
        })
    const { mutate: approveMutate, isLoading: approveLoading } = useMutation(['approveCourse'], approveCourse, {
        onSuccess: () => {
            toast.success("Course approved successfully")
        },
        onError: (err: IErrorResponse) => {
            toast.error(err.response.data.message)
        }
    })
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
        "status",
        "Date",
    ];

    const formattedData: IFormattedCourse[] = allCourses.map((course: ICourse) => {
        return {
            CourseName: course?.course_name || "N/A",
            Author: course?.author || "N/A",
            Price: course?.payment_price || "N/A",
            Category: course?.course_category,
            Location: course?.course_location || "N/A",
            status: course?.status || "N/A",
            RawStatus: course?.status || "N/A",
            Date: new Date(course?.created_at).toLocaleDateString(),
            id: course?.course_id,
            course_URL: course?.course_URL,
            course_image: course?.course_image,
            course_description: course?.course_description,
            what_to_expect: course?.what_to_expect,
        };
    });

    // Now use "RawStatus" for filtering
    const filteredOrders = formattedData.filter(order => {
        if (statusFilter === "All") {
            return true;
        }
        return order.status === statusFilter; // Compare using RawStatus
    });


    const handleRowClick = (row: ICourse) => {
        setSelectedOrder(row);
        setIsModalOpen(true);
        console.log(selectedOrder)
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
        approveMutate(selectedOrder?.id)
    };
    const handleMessageMerchant = () => {
        if (!selectedOrder) return;
        if (!content.trim()) {
            toast.error("Please enter a message before sending.");
            return;
        }
        messageMerchantMutate({ id: selectedOrder.id, data: content });
        setContent("");
    };
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "text-green-500";
            case "Review":
                return "text-orange-500";
            case "Rejected":
                return "text-red-500";
            case "Canceled":
                return "text-gray-500";
            default:
                return "text-black";
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTableCell = (key: keyof typeof formattedData[0], value: any) => {
        if (key === "status") {
            return <span className={getStatusColor(value)}>{value}</span>;
        }
        return value;
    };
    return (
        <div className="w-[95%] h-[90%] max-[650px]:w-full flex items-center justify-center mt-[50px] max-[650px]:mt-[30px] max-[650px]:p-[10px] flex-col gap-[20px]">
            <p className="w-[100%] text-[20px] text-[lightgrey]">All Courses</p>
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
                    columns={columns as (keyof IFormattedCourse)[]}
                    loading={isLoading}
                    renderCell={(column: keyof ICourse, value: unknown) => renderTableCell(column, value)}
                    onRowClick={(row: ICourse) => handleRowClick(row)}
                />

                {/* Modal for approving/rejecting courses */}
                {isModalOpen && selectedOrder && (
                    <div className="fixed h-[100vh] inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 overflow-scroll flex-col scrollbar-hide">
                        <div className="bg-white h-[90%] p-6 rounded-md w-[90%] max-w-md flex flex-col gap-[10px] overflow-scroll relative scrollbar-hide">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-black rounded fixed  right-8"
                            >
                                <FaTimes className="text-[14px]" />
                            </button>
                            <div>
                                <img src={selectedOrder?.course_image} alt="" />
                            </div>
                            <div>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong >Course Name:</strong> {selectedOrder?.CourseName}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Author:</strong> {selectedOrder?.Author}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Price:</strong> {selectedOrder?.Price}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Location:</strong> {selectedOrder?.Location}</p>
                                <p className="w-full flex justify-between font-light max-[650px]:text-[14px]"><strong>Status:</strong> {selectedOrder?.status}</p>
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
                                    className="px-4 py-2 border-[#FFC300] border text-black rounded"
                                    disabled={approveLoading}
                                >
                                    {approveLoading ? "Approving..." : "Approve"}
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Reject
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <textarea
                                    placeholder="Message"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="border border-gray-300 rounded p-2 outline-none text-[14px]"
                                />
                                <button
                                    onClick={handleMessageMerchant}
                                    className="bg-[#FFC300] text-black rounded px-4 py-2 text-[14px]"
                                    disabled={messageMerchantLoading}
                                >
                                    {messageMerchantLoading ? "Sending..." : "Send Message"}
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
