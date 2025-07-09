import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import api from "../utils/api";
import { motion } from "framer-motion";
import ErrorModal from "../Components/ErrorModal";

const ViewNotes = () => {
  const [currentBook, setCurrentBook] = useState();
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getCurrentBook() {
      setLoading(true);
      const currentLoc = location.pathname;
      console.log("currentLoc: ", currentLoc);
      const bookId = currentLoc.split("/")[2];
      // const userId = currentUser._id;
      // console.log("currentUser:", currentUser);
      // console.log(userId, bookId);
      try {
        const res = await api.post("/books/bookDetails", { bookId });
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          setCurrentBook(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log("Getting error in fetching the current book: ", error);
        setErr(error.response?.data?.message);
      }
    }
    getCurrentBook();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex h-screen flex-col font-inter text-font">
        <Header />
        {err && <ErrorModal error={err} onClose={() => setErr(null)} />}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-font bg-background gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="text-md text-font-muted">Loading...</p>
          </div>
        ) : (
          <div className=" flex-grow space-y-4 bg-background pt-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl font-bold">{currentBook?.bookTitle}</h1>
              <p className="text-font-muted text-sm">
                by {currentBook?.bookAuthor}
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate(`/edit/${currentBook._id}`)}
                className="text-font w-fit  px-10 py-1 bg-primary  duration-400  mt-2 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer m-auto font-medium "
              >
                Edit Notes
              </button>
            </div>
            <div className="w-full bg-background">
              {currentBook?.notes === "" ? (
                <div className="bg-bg-light mx-15 my-10 rounded-lg p-10 text-font-muted text-center ">
                  "No notes here, yet!"
                </div>
              ) : (
                <div
                  className="prose prose-invert max-w-none bg-bg-light mx-15 my-10 rounded-lg p-10 text-font text-left"
                  dangerouslySetInnerHTML={{ __html: currentBook?.notes }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewNotes;
