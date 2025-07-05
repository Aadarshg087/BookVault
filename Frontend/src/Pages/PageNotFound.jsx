import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="h-screen bg-background text-font  font-inter flex flex-col gap-4 items-center justify-center">
        <div className="text-3xl font-bold">Page Not Found</div>
        <button
          onClick={() => navigate("/home")}
          className="text-font w-fit  px-10 py-1 bg-primary  duration-400  mt-2 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer"
        >
          Go to Home Page
        </button>
      </div>
    </motion.div>
  );
};

export default PageNotFound;
