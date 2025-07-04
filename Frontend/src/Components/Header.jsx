import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const elements = [
    { Name: "Home", url: "/home" },
    { Name: "Add Book", url: "/addBook" },
    { Name: "About Us", url: "/about" },
    {
      Name: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      url: "/my-profile",
    },
  ];
  return (
    <div className="min-w-full font-inter flex justify-between border-b-1 bg-background border-b-gray-500  px-40 font-medium items-center py-4 text-base">
      <div className="text-2xl font-inter font-black text-font ">
        <Link to={"/home"}> BookVault</Link>
      </div>
      <div>
        <ul className="flex list-none space-x-2">
          {elements.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.url}
                className="px-5 py-1.5 text-font hover:bg-bg-light rounded-md duration-150"
              >
                {item.Name}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
