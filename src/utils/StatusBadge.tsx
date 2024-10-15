import React from 'react';

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "text-yellow-500";
            case "processing":
                return "text-blue-500";
            case "completed":
                return "text-green-500";
            case "canceled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <span className={getStatusClass(status)}>
            {status}
        </span>
    );
};

export default StatusBadge;


export const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending":
            return "text-yellow-500";
        case "processing":
            return "text-blue-500";
        case "completed":
            return "text-green-500";
        case "canceled":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
};