import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-background text-font  font-inter flex flex-col gap-4 items-center justify-center">
      <div className="text-3xl font-bold">Page Not Found</div>
      <button
        onClick={() => navigate("/home")}
        className="text-font w-fit  px-10 py-1 bg-primary  duration-400  mt-2 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PageNotFound;
