import React from "react";
import Header from "../Components/Header";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../utils/constants";
import { useUser } from "../utils/UserContext";
import api from "../utils/api";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useUser();
  async function onSubmission(data) {
    const details = { ...data, user: currentUser };
    console.log(details);

    const res = api.post("/book/addBook", details);
  }

  return (
    <div className="flex flex-col font-inter h-screen">
      <Header />
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
              className="text-font text-lg font-semibold outline-none bg-accent  px-10 py-2   bg-primary hover:bg-accent/45 hover:text-white hover:outline-2 duration-300 rounded-2xl h-fit"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
