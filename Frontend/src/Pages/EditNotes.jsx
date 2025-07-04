import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import MyEditor from "../Components/MyEditor";
import { useUser } from "../utils/UserContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const EditNotes = () => {
  const [currentBook, setCurrentBook] = useState();
  const { currentUser } = useUser();
  const editorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function getNotes() {
      const currentLoc = location.pathname;
      // console.log("currentLoc: ", currentLoc);
      const bookId = currentLoc.split("/")[2];
      const userId = currentUser?._id;
      // console.log("currentUser:", currentUser);
      console.log(userId, bookId);
      try {
        const res = await api.post("/books/bookDetails", { bookId });
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          setCurrentBook(res.data);
        }
      } catch (error) {
        console.log("Getting error in fetching the current book: ", error);
      }
    }
    getNotes();

    // tinymce.activeEditor.setContent(currentBook.notes);
  }, []);

  useEffect(() => {
    if (currentBook) {
      editorRef.current.setContent(currentBook.notes || "<p>No notes yet</p>");
    }
  }, [currentBook]);

  const handleSave = async () => {
    const notes = editorRef.current?.getContent();
    console.log("notes: ", notes);
    try {
      currentBook.notes = notes;
      await api.post("/books/saveNotes", { currentBook });
      navigate(`/view/${currentBook?._id}`);

      // const isSaved = await
    } catch (error) {}
  };

  return (
    <div className="flex h-screen flex-col font-inter text-font  ">
      <Header />
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
          <MyEditor ref={editorRef} content={currentBook?.notes} />
        </div>
      </div>
    </div>
  );
};

export default EditNotes;
