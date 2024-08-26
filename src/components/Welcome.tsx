import { motion } from "framer-motion";
import { Logo1, welcomeimg } from "../assets";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[30rem] flex justify-around gap-9 items-center flex-col"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-[50%] h-[20%] flex justify-center items-center flex-col"
      >
        <p className="text-2xl font-semibold">MarketPlace</p>
        <img src={Logo1} alt="" className="w-[35%] h-[35%] object-contain" />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-[40%] h-[80%] bg-white shadow-lg flex justify-around items-center flex-col max-md:w-[90%]"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full h-[60%] flex justify-center items-center"
        >
          <img src={welcomeimg} alt="" className="size-[20rem]" />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full h-[35%] flex justify-around items-center flex-col"
        >
          <p className="text-2xl font-semibold">Welcome to MarketPlace</p>
          <p className="text-center text-sm text-gray-400">
            Welcome to Maarketplaace internal dashboard - the secure back office
            for managing transactions, merchants and all users.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-32 py-[0.4rem] bg-[#FFC300] rounded font-semibold text-white"
            onClick={() => nav("/login")}
          >
            GET STARTED
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
