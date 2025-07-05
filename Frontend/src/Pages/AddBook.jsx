import React, { useState } from "react";
import Header from "../Components/Header";
import { useForm } from "react-hook-form";
import { useUser } from "../utils/UserContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useUser();
  async function onSubmission(data) {
    setLoading(true);
    const details = { ...data, user: currentUser.email };
    console.log(details);
    try {
      console.log(details);
      const res = await api.post("/books/addBook", details);
      if (res.status >= 200 && res.status < 300) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex flex-col font-inter h-screen">
        <Header />
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-font bg-background gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="text-md text-font-muted">Loading...</p>
          </div>
        ) : (
          <div className="flex-grow bg-background text-font">
            <form
              action=""
              onSubmit={handleSubmit(onSubmission)}
              className="flex flex-col px-40 pt-16 "
            >
              <div className=" flex flex-col  justify-around space-y-8 ">
                <h1 className="text-5xl font-bold mb-8">Add New Read</h1>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="">
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the book title"
                    className="w-94 bg-bg-light outline-none px-3 rounded-md text-sm py-2"
                    {...register("bookTitle", {
                      required: "Book title is required",
                    })}
                  />
                  {errors.bookTitle && (
                    <p className="text-red-500  text-md">
                      {errors.bookTitle.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="font-">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the author's name"
                    className="w-94 bg-bg-light outline-none px-3 rounded-md text-sm py-2"
                    {...register("bookAuthor", {
                      required: "Author is required",
                    })}
                  />
                  {errors.bookAuthor && (
                    <p className="text-red-500  text-md">
                      {errors.bookAuthor.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <label htmlFor="" className="">
                    Description
                  </label>
                  <textarea
                    type="text"
                    placeholder="Write your description here!"
                    className="min-h-28 w-94 bg-bg-light outline-none px-3 rounded-md text-sm py-2"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className=" flex justify-between items-center pt-8">
                <div className="flex flex-col">
                  <label htmlFor="" className="">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-94 bg-bg-light outline-none px-3 rounded-md text-sm py-2"
                    placeholder="Enter category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                  {errors.category && (
                    <p className="text-red-500  text-md">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-font w-fit duration-400 rounded-md outline  hover:bg-white hover:text-background hover:px-12 cursor-pointer font-medium  text-lg   bg-background  px-10 py-1 bg-primary hover:outline-2"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AddBook;
