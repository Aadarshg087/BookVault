import React from "react";
import Header from "../Components/Header";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow font-bold text-4xl  flex items-center justify-center">
        All Books
      </div>
    </div>
  );
};

export default Home;
