import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { verify2fa } from "../../api/mutation";
import toast from "react-hot-toast";
import { IVerify2fa } from "../../interface/LoginInterface";
import { Verify2faSchema } from "../../schema/Verify2faSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Loading from "../../loader";
import { IErrorResponse } from "../../interface/ErrorInterface";
import { FaKey, FaMobileAlt, FaCheckCircle } from "react-icons/fa";

const Verify2fa = () => {
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const form = useForm<IVerify2fa>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(Verify2faSchema) as any,
  });

  const { register, handleSubmit, formState: { errors }, watch } = form;
  const tokenValue = watch("token");

  const { isLoading, mutate: verifyMutate } = useMutation(['verify2fa'], {
    mutationFn: (data: IVerify2fa) => verify2fa(data, email),
    onSuccess: (response) => {
      toast.success("Verification successful");
      localStorage.setItem(import.meta.env.VITE_TOKEN, response?.data?.data?.data);
      navigate("/admin");
    },
    onError: (error: IErrorResponse) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit: SubmitHandler<IVerify2fa> = (data) => {
    verifyMutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaMobileAlt className="text-2xl text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enter Verification Code
        </h2>
        <p className="text-gray-600">
          Open your authenticator app and enter the 6-digit code
        </p>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Token Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Authentication Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={`
                  w-full pl-12 pr-4 py-4 text-center text-lg font-mono tracking-widest
                  border-2 rounded-lg outline-none transition-all duration-200
                  ${errors.token
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }
                  ${tokenValue && tokenValue.length === 6 ? 'border-green-300 bg-green-50' : ''}
                `}
                {...register("token")}
              />
              {tokenValue && tokenValue.length === 6 && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.token && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {errors.token?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#FFC300] hover:bg-[#e6af00] active:transform active:scale-98'
              }
              focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:ring-offset-2
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loading />
                <span>Verifying...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaCheckCircle />
                <span>Verify & Complete Setup</span>
              </div>
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">
            Having trouble?
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Make sure your device's time is synchronized</li>
            <li>• Try refreshing your authenticator app</li>
            <li>• Codes expire every 30 seconds - use the latest one</li>
          </ul>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">Security Tip</p>
            <p className="text-xs text-blue-700 mt-1">
              Never share your authentication codes with anyone. They provide access to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify2fa;
