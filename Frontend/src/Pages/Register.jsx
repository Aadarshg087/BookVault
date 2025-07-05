import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

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
      const response = await axios.post(`${BASE_URL}/users/createUser`, data);
      const { token } = response.data;
      localStorage.setItem("userInfo", token);
      navigate("/home");
    } catch (error) {
      setErr(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex flex-col h-screen w-full items-center gap-10 pt-20 font-inter bg-background text-font">
        <h1 className="text-center text-5xl italic font-bold">BookVault</h1>
        <div className="border-1 pt-10 pb-10 flex flex-col items-center   text-center space-y-10 rounded-2xl bg-gradient-to-t from-[#0e0e0e]  to-[#3f3f3f]">
          <h2 className="font-bold text-3xl">Create Account</h2>
          <div className="flex">
            <form
              action=""
              onSubmit={handleSubmit(onSubmission)}
              className="flex flex-col  text-md  mx-10 min-x-[100px] w-[300px] "
            >
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="outline-none bg-background px-2 w-full rounded-md py-2 text-sm"
                  {...register("fullName", { required: "Name is required" })}
                />
                {errors && (
                  <p className={`text-sm text-red-400 }`}>
                    {errors.fullName?.message
                      ? errors.fullName.message
                      : "\u00A0"}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-1">
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
              <div className="flex flex-col items-start gap-1">
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
              {err && <p className="text-sm text-red-500">{err}</p>}
              <button
                type="submit"
                className="text-font w-fit  px-10 py-1 bg-primary  duration-400  mt-2 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer m-auto font-medium"
              >
                Create Account
              </button>
              <Link
                to={"/login"}
                className="text-xs text-accent-other mt-2 underline"
              >
                Already have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
