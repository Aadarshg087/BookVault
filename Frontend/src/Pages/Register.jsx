import React, { useState } from "react";
import Header from "../Components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Register = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmission(data) {
    // console.log(data);
    try {
      const response = await axios.post(`${BASE_URL}/users/createUser`, data);
      const { token } = response.data;
      localStorage.setItem("userInfo", token);
      navigate("/home");
    } catch (error) {
      setErr(error.response.message);
    }
  }
  return (
    <div className="flex h-screen w-full border-4 border-red-400 items-center font-inter">
      <div className="border-2 py-20 px-15 m-auto text-center space-y-10 rounded-md ">
        <div>
          <h2 className="font-bold text-3xl">Create Account</h2>
          <p className="text-primary">Book Vault</p>
        </div>
        <div className="flex">
          <form
            action=""
            onSubmit={handleSubmit(onSubmission)}
            className="flex flex-col gap-4 text-md"
          >
            <div className="flex flex-col items-start">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                className="outline px-1 rounded-md py-1"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && <p>errors.fullName.message</p>}
            </div>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
