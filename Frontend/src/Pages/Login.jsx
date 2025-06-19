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
      setErr(error.response.data.message);
    }
  }

  return (
    <div className="flex h-screen w-full items-center font-inter">
      <div className="border-2 py-20 px-15 m-auto text-center space-y-10 rounded-md ">
        <h2 className="font-bold text-3xl">Welcome Back</h2>
        <div className="flex">
          <form
            action=""
            onSubmit={handleSubmit(onSubmission)}
            className="flex flex-col gap-4 text-md"
          >
            <div className="flex flex-col items-start">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="outline px-1 rounded-md py-1"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p>errors.email.message</p>}
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="">Password</label>
              <input
                className="outline px-1 rounded-md py-1"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p>errors.password.message</p>}
            </div>
            {err ? <p className="text-red-500  text-md ">{err}</p> : null}
            <button
              type="submit"
              className="text-font w-fit m-auto px-10 py-1 bg-primary hover:bg-font hover:text-primary hover:outline duration-150  mt-2 rounded-md"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
