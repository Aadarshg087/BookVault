import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  function logout() {
    localStorage.clear();
  }
  const elements = [
    { Name: "Home", url: "/home" },
    { Name: "Add Book", url: "/addBook" },
    { Name: "About Us", url: "/about" },
    { Name: "Logout", url: "/login", operation: true },
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
                onClick={item.operation ? logout : null}
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
