import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { enable2fa } from "../../api/mutation";
import { FaCopy } from "react-icons/fa";
import { copyToClipboard } from "../../utils/copyable";
import { IErrorResponse } from "../../interface/ErrorInterface";
import Verify2fa from "./Verify2fa";
const Enable2faComponent = () => {

  const email = localStorage.getItem("userEmail");
  const [data, setData] = useState<{ code: string; image: string } | null>(null);

  const { mutate: enable2faMutate } = useMutation(['enable2fa'], {
    mutationFn: () => enable2fa(email),
    onSuccess: (response) => {
      toast.success("2FA enabled successfully");
      setData(response?.data?.data);
    },
    onError: (error: IErrorResponse) => {
      toast.error(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    enable2faMutate();
  }, [enable2faMutate]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-[10px]">
      <img src="/MARKET.svg" alt="" className="w-[80px] mb-[50px]" />
      <div className="w-[60%] p-[20px] flex max-[650px]:flex-col max-[650px]:w-[100%] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] max-[650px]:shadow-none">
        {data ? (
          <div className="flex flex-col w-full max-[650px]:w-full p-[20px]">
            <p className="text-center">Scan this QR code or copy this code to enable 2FA</p>
            <img src={data.image} alt="QR Code" className="w-[200px] mx-auto" />
            <div className="flex justify-center items-center gap-2 mt-4">
              <p className="truncate">{data.code}</p>
              <FaCopy className="text-[30px]" onClick={() => copyToClipboard(data.code)} />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Verify2fa/>
    </div>
  );
};

export default Enable2faComponent;
