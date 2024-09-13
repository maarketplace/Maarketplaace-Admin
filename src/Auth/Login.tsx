import { useState } from "react";
import { motion } from "framer-motion";
import { Logo1 } from "../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { ILoginInterface } from "../interface/LoginInterface";
import { LoginSchema } from "../schema/LoginSchema";
import { adminLogin } from "../api/mutation";
import Loading from "../loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<ILoginInterface>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(LoginSchema) as any,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { isLoading, mutate } = useMutation(["adminLogin"], adminLogin, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit: SubmitHandler<ILoginInterface> = (data) => {
    mutate(data);
  };
  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 max-[650px]:w-[90%]"
      >
        <div className="flex justify-center mb-8  items-center flex-col">
          <img src={Logo1} alt="Logo" className=" size-20" />
          <p className=" text-[24px]">maarketplaace</p>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300  focus:outline-none"
              required
            />
          </div>
          <b className="w-[70%] text-[red] text-[12px] max-[650px]:w-[90%]">
            {errors.email?.message}
          </b>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300  focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.9rem] text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <b className="w-[70%] text-[red] text-[12px] max-[650px]:w-[90%]">
            {errors.password?.message}
          </b>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>
            <a href="#" className="text-sm text-[#FFC300] hover:underline">
              Forgot Password?
            </a>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            onClick={handleButtonClick}
            disabled={isLoading}
            className="w-full bg-[#FFC300] cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none"
          >
            {isLoading ? <Loading /> : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
