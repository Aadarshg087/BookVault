import { useEffect, useState } from "react";
import { useUser } from "../utils/UserContext";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import api from "../utils/api";
import ErrorModal from "../Components/ErrorModal";

const Home = () => {
  const { currentUser } = useUser();
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentSearchString, setCurrentSearchString] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    // if (!currentUser) return;
    // console.log(currentUser);
    const getBooks = async () => {
      try {
        setLoading(true);
        const books = await api.get("/books/getAllBooks");
        setBookList(books.data);
        setLoading(false);

        const cat = await api.get("/books/getAllCategories");
        // cat.data.push("All");
        // console.log(cat.data);
        setCategories(["All", ...cat.data]);

        // console.log(books.data);
        // console.log(bookList.data);
      } catch (error) {
        console.log("Error in getting the books", error);
        setErr(error.response?.data?.message);
      }
    };
    getBooks();
  }, []);

  const handleCategory = async (currentCat) => {
    try {
      const getBooks = await api.post("/books/getCategoryBooks", {
        category: currentCat,
      });
      setBookList(getBooks.data);
      setCurrentCategory(currentCat);
    } catch (error) {
      console.log("Got some error in fetching the category books", error);
      setErr(error.response?.data?.message);
    }
  };

  const handleSearchString = async (searchString) => {
    try {
      const resultBooks = await api.post("/books/searchBooks", {
        searchString,
      });
      // console.log(resultBooks.data);
      setCurrentSearchString(searchString);
      setBookList(resultBooks.data);
    } catch (error) {
      console.log("Got some error fetching searched items: ", error);
      setErr(error.response?.data?.message);
    }
  };

  // const boookList = [
  //   { bookTitle: "Tools of Titans", bookAuthor: "Tim Ferris" },
  //   { bookTitle: "Atomic Habits", bookAuthor: "James Clear" },
  //   { bookTitle: "Do Epic Shit", bookAuthor: "Ankur Warikoo" },
  //   { bookTitle: "Do Epic Shit", bookAuthor: "Ankur Warikoo" },
  //   { bookTitle: "Do Epic Shit", bookAuthor: "Ankur Warikoo" },
  //   { bookTitle: "Do Epic Shit", bookAuthor: "Ankur Warikoo" },
  // ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex flex-col h-screen font-inter">
        <Header />
        {err && <ErrorModal error={err} onClose={() => setErr(null)} />}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-font bg-background gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="text-md text-font-muted">Loading...</p>
          </div>
        ) : (
          <div className="flex-grow flex flex-col  bg-background text-font px-15 gap-2 space-y-4">
            <div className=" w-full text-5xl pt-20 font-bold">
              Welcome{" "}
              <span className="bg-gradient-to-l from-accent  to-accent-other bg-clip-text text-transparent">
                {currentUser?.fullName}!
              </span>
            </div>
            <div className="flex flex-col space-y-4 ">
              <div className="w-[60%] relative ">
                <input
                  type="text"
                  placeholder="Search your books here!"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchString(e.target.value);
                  }}
                  className="w-full rounded-3xl pl-4 pr-10 text-md py-3 bg-bg-light text-font font-light outline-none"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-font-muted hover:text-font cursor-pointer duration-150"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>

              <select
                onChange={(e) => handleCategory(e.target.value)}
                className="border-1 text-sm bg-bg-light w-fit px-4 py-1 rounded-md text-font-muted cursor-pointer"
              >
                {categories.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex gap-6 flex-wrap">
              {bookList.length === 0 ? (
                <div className="font-inter text-font-muted w-full text-center ">
                  {currentCategory === "All" && currentSearchString === ""
                    ? "No books here, yet!"
                    : "No books found!"}
                </div>
              ) : (
                bookList.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/view/${item._id}`}
                      className={`min-w-[300px] outline-1 h-[350px] flex flex-col items-start justify-end pl-6 pb-6 bg-white rounded-3xl bg-gradient-to-t from-black/100 via-black/50 to-transparent z-10 mb-10 hover:bg-gradient-to-t hover:from-black/95 hover:via-black/50 hover:to-transparent `}
                    >
                      <p className="text-2xl font-bold">{item.bookTitle}</p>
                      <p className="text-font-muted text-sm">
                        by {item.bookAuthor}
                      </p>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
