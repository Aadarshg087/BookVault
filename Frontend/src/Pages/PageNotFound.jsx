import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen  font-inter flex flex-col gap-4 items-center justify-center">
      <div className="text-3xl font-bold">Page Not Found</div>
      <button
        onClick={() => navigate("/home")}
        className="text-font w-fit  px-10 py-1 bg-primary hover:bg-font hover:text-primary hover:outline duration-150  mt-2 rounded-md"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default PageNotFound;
