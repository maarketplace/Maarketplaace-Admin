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

const Verify2fa = () => {
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const form = useForm<IVerify2fa>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(Verify2faSchema) as any,
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const { isLoading, mutate: verifyMutate } = useMutation(['verify2fa'], {
    mutationFn: (data: IVerify2fa) => verify2fa(data, email),
    onSuccess: (response) => {
      toast.success("Verification successful");
      localStorage.setItem(import.meta.env.VITE_TOKEN, response?.data?.data?.data); // Save the token
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
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-[10px]">
      <img src="/MARKET.svg" alt="" className="w-[80px] mb-[50px]" />
      <div className="w-[40%] p-[20px] flex max-[650px]:flex-col max-[650px]:w-[100%] bg-white shadow-[2px_2px_8px_2px_rgba(0,0,0,0.1)] max-[650px]:shadow-none">
        <div className="w-full flex flex-col items-center justify-center gap-[20px]">
          <span className="w-[90%]">
            <p className="text-center">Enter the token from your Authenticator app.</p>
          </span>
          <span className="w-[90%]">
            <input
              type="text"
              placeholder="Token"
              className="border w-full p-[10px] outline-none"
              {...register("token")}
            />
            <b className="text-[red] text-[12px]">{errors.token?.message}</b>
          </span>
          <button className="w-[90%] h-[35px] bg-[#FFC300]" onClick={handleSubmit(onSubmit)}>
            {isLoading ? <Loading /> : "Verify"}
          </button>
          {/* <p onClick={()=> navigate('/enable2fa')}>Enable 2fa</p> */}
        </div>
      </div>
    </div>
  );
};

export default Verify2fa;
