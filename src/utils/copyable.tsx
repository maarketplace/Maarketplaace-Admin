import toast from "react-hot-toast";

export const copyToClipboard = (text: string ) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    toast.success('copied successfully!');
};

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return ''; // Handle empty or undefined input
    return str.charAt(0).toUpperCase() + str.slice(1);
};