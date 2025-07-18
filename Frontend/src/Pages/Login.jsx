import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorModal from "../Components/ErrorModal";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmission(data) {
    try {
      const response = await axios.post(`${BASE_URL}/users/loginUser`, data);
      const { token } = response.data;
      localStorage.setItem("userInfo", token);
      navigate("/home");
    } catch (error) {
      console.log("error: ", error.response.data.message);
      setErr(error.response?.data?.message);
    }
  }

  const loginAsJohnWalker = async () => {
    const details = {
      email: "John@gmail.com",
      password: "John@gmail.com",
    };
    try {
      await onSubmission(details);
    } catch (error) {
      setErr(error.response?.data?.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // enter from below, transparent
      animate={{ opacity: 1, y: 0 }} // fade in and rise
      exit={{ opacity: 0, y: -20 }} // fade out and move up
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {err && <ErrorModal error={err} onClose={() => setErr(null)} />}
      <div className="flex flex-col h-screen w-full items-center gap-10 pt-20 font-inter bg-background text-font">
        <h1 className="text-center text-5xl italic font-bold">BookVault</h1>
        <div className="border-1 pt-10 pb-10 flex flex-col items-center   text-center space-y-10 rounded-2xl bg-gradient-to-t from-[#0e0e0e]  to-[#3f3f3f]">
          <h2 className="font-bold text-3xl">Welcome Back</h2>
          <div className="flex">
            <form
              action=""
              onSubmit={handleSubmit(onSubmission)}
              className="flex flex-col space-y-2 text-md  mx-10 min-x-[100px] w-[300px] "
            >
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="outline-none bg-background px-2 w-full rounded-md py-2 text-sm"
                  {...register("email", { required: "Email is required" })}
                />
                {errors && (
                  <p className={`text-sm text-red-400 }`}>
                    {errors.email?.message ? errors.email.message : "\u00A0"}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="">Password</label>
                <input
                  placeholder="Enter password"
                  className="outline-none bg-background px-2 w-full rounded-md py-2 text-sm"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors && (
                  <p className="text-sm text-red-400">
                    {errors.password?.message
                      ? errors.password.message
                      : "\u00A0"}
                  </p>
                )}
              </div>

              {/* <button
              type="submit"
              className="bg-white h-fit w-fit m-auto font-bold  mt-2 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-login-botton-light hover:to-login-button  transition-all "
            >
              <span className="px-15 py-1 block  bg-gradient-to-r from-login-botton-light to-login-button bg-clip-text text-transparent hover:bg-none hover:text-white hover:px-20 transition-all duration-400  ease-in-out  ">
                Log In
              </span>
            </button> */}
              <button
                type="submit"
                className="text-font w-fit  px-10 py-1 bg-primary  duration-400  mt-2 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer m-auto font-medium"
              >
                Log In
              </button>
              <Link
                to={"/register"}
                className="text-xs text-accent-other underline mt-2 cursor-pointer"
              >
                Create Account?
              </Link>
              <div
                className="text-xs text-accent-other underline mt-8 cursor-pointer hover:text-font-muted duration-150"
                onClick={loginAsJohnWalker}
              >
                Login as John Walker
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
