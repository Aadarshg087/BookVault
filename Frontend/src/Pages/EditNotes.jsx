import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import MyEditor from "../Components/MyEditor";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditNotes = () => {
  const [currentBook, setCurrentBook] = useState();
  const [loading, setLoading] = useState(true);
  // const { currentUser } = useUser();
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function getNotes() {
      setLoading(true);
      const currentLoc = location.pathname;
      // console.log("currentLoc: ", currentLoc);
      const bookId = currentLoc.split("/")[2];
      // const userId = currentUser?._id;
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
      }
    }

    getNotes();

    // tinymce.activeEditor.setContent(currentBook.notes);
  }, []);

  useEffect(() => {
    if (!currentBook || !editorRef.current?.isReady()) return;

    // editorRef.current.setContent("<p>No notes yet</p>");
    console.log("currentBook", currentBook);
    editorRef.current.setContent(currentBook?.notes || "<p>No notes yet!</p>");
  }, [currentBook, editorRef.current]);

  async function handleSave() {
    const notes = editorRef.current?.getContent();
    console.log("notes: ", notes);
    try {
      currentBook.notes = notes;
      console.log("currentBook, saving to the DB", currentBook);
      await api.post("/books/saveNotes", currentBook);
      navigate(`/view/${currentBook?._id}`);
      // const isSaved = await
    } catch (error) {
      console.log("Getting error in saving the notes", error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex h-screen flex-col font-inter text-font  ">
        <Header />
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-font bg-background gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="text-md text-font-muted">Loading...</p>
          </div>
        ) : (
          <div className="flex-grow  w-full flex flex-col gap-10 items-center justify-center   bg-background ">
            <div className="flex items-center w-full justify-between  px-20 mt-10">
              <div className="flex flex-col">
                <h1 className="text-5xl font-bold">{currentBook?.bookTitle}</h1>
                <p className="text-sm text-font-muted">
                  by {currentBook?.bookAuthor}
                  {console.log(currentBook)}
                </p>
              </div>
              <div className="flex items-center justify-center  h-full">
                <button
                  className="text-font w-fit  px-10 py-1 bg-primary  duration-400 rounded-md outline hover:bg-white hover:text-background hover:px-12 cursor-pointer m-auto font-medium"
                  onClick={handleSave}
                >
                  Save Notes
                </button>
              </div>
            </div>
            <div className="w-[90%] rounded-2xl mb-10">
              {editorRef.current?.isReady === false ? (
                <div className="flex flex-col items-center justify-center h-screen text-font bg-background gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
                  <p className="text-md text-font-muted">Loading...</p>
                </div>
              ) : (
                <MyEditor ref={editorRef} content={currentBook?.notes} />
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EditNotes;
