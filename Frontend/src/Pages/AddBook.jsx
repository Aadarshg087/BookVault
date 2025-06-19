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
    <div className="flex flex-col font-inter">
      <Header />
      <div className="flex-grow">
        <form
          action=""
          onSubmit={handleSubmit(onSubmission)}
          className="flex flex-col px-40 py-6"
        >
          <div className=" flex flex-col gap-8 ">
            <h1 className="text-4xl font-bold">Add New Read</h1>
            <div className="flex flex-col items-start">
              <label htmlFor="" className="">
                Book Title
              </label>
              <input
                type="text"
                className="w-94 outline-gray-300 outline-2 px-1 rounded-md py-1"
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
                className="w-94 outline-gray-300 outline-2 px-1 rounded-md py-1"
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
              <label htmlFor="" className="font-">
                Status
              </label>
              <select
                {...register("status")}
                default="In Queue"
                className="outline-gray-300 outline-2 px-1 rounded-md py-1"
              >
                <option value="In Queue">In Queue</option>
                <option value="Reading">Reading</option>
                <option value="Finished" disabled="true">
                  Finished
                </option>
              </select>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="" className="">
                Description
              </label>
              <textarea
                type="text"
                className="min-h-28 w-94 outline-gray-300 outline-2 px-1 rounded-md py-1"
                {...register("description")}
              />
            </div>
            <button
              type="submit"
              className="text-font w-fit  px-10 py-1 bg-primary hover:bg-font hover:text-primary hover:outline duration-150  mt-2 rounded-md"
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
