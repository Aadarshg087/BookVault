import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

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
      setErr(error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-full items-center gap-10 pt-20 font-inter bg-background text-font">
      <h1 className="text-center text-5xl italic font-bold">BookVault</h1>
      <div className="border-1 pt-10 pb-10 flex flex-col items-center   text-center space-y-10 rounded-2xl bg-gradient-to-t from-[#0e0e0e]  to-[#3f3f3f]">
        <h2 className="font-bold text-3xl">Welcome Back</h2>
        <div className="flex">
          <form
            action=""
            onSubmit={handleSubmit(onSubmission)}
            className="flex flex-col gap-5 text-md  mx-10 min-x-[100px] w-[300px] "
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
                {...register("password", { required: "Password is required" })}
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
              className="bg-white h-fit w-fit m-auto font-bold  mt-2 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-login-botton-light hover:to-login-button  transition-all "
            >
              <span className="px-15 py-1 block  bg-gradient-to-r from-login-botton-light to-login-button bg-clip-text text-transparent hover:bg-none hover:text-white hover:px-20 transition-all duration-400  ease-in-out  ">
                Log In
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
