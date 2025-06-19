import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const elements = ["My Books", "About Us", "👤"];
  return (
    <div className="min-w-full font-inter flex justify-between border-1 border-gray-300 px-40 font-medium items-center py-4">
      <div className="text-2xl font-inter font-black ">BookVault</div>
      <div>
        <ul className="flex list-none space-x-2">
          {elements.map((item, index) => {
            return (
              <Link
                key={index}
                className="px-5 py-1.5 hover:bg-gray-200 rounded-md duration-150"
              >
                {item}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
