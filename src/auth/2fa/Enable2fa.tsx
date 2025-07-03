import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { enable2fa } from "../../api/mutation";
import { FaCopy, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { copyToClipboard } from "../../utils/copyable";
import { IErrorResponse } from "../../interface/ErrorInterface";
import Verify2fa from "./Verify2fa";

const Enable2faComponent = () => {
  const email = localStorage.getItem("userEmail");
  const [data, setData] = useState<{ code: string; image: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { mutate: enable2faMutate, isLoading } = useMutation(['enable2fa'], {
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

  const handleCopyCode = () => {
    copyToClipboard(data?.code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <img 
            src="/MARKET.svg" 
            alt="Logo" 
            className="w-20 h-20 mx-auto mb-6 drop-shadow-sm" 
          />
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShieldAlt className="text-2xl text-yellow-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Enable Two-Factor Authentication
            </h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Secure your account with an additional layer of protection
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Setting up your 2FA...</p>
            </div>
          ) : data ? (
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${currentStep >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm font-semibold`}>
                      1
                    </div>
                    <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-gray-700' : 'text-gray-500'}`}>Scan QR Code</span>
                  </div>
                  <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${currentStep >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm font-semibold`}>
                      2
                    </div>
                    <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-gray-700' : 'text-gray-500'}`}>Verify Code</span>
                  </div>
                </div>
              </div>

              {currentStep === 1 ? (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Scan QR Code
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6 mb-4">
                      <img 
                        src={data.image} 
                        alt="QR Code for 2FA setup" 
                        className="w-48 h-48 mx-auto rounded-lg shadow-sm border border-gray-200" 
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Use your authenticator app to scan this QR code
                    </p>
                  </div>

                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Or Enter Code Manually
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        If you can't scan the QR code, enter this code manually in your authenticator app:
                      </p>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-gray-800 break-all flex-1 mr-3">
                            {data.code}
                          </code>
                          <button
                            onClick={handleCopyCode}
                            className="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-500 text-black rounded-md transition-colors duration-200 text-sm font-medium"
                          >
                            {copied ? (
                              <>
                                <FaCheckCircle className="text-sm text-black" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <FaCopy className="text-sm text-black" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-500 text-black rounded-lg transition-colors duration-200 font-medium"
                      >
                        Already Scanned? Continue
                        <FaArrowRight className="text-sm" />
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="w-full">

                  <div className="mb-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
                    >
                      <FaArrowLeft className="text-sm" />
                      Back to QR Code
                    </button>
                  </div>

                  <Verify2fa />
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Failed to load 2FA setup. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enable2faComponent;
