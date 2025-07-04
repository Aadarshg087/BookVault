const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookDetails,
  saveNotes,
} = require("../controllers/book.controller");
const { checkToken } = require("../middleware/auth.middleware");

const bookRouter = express.Router();

bookRouter.post("/bookDetails", checkToken, getBookDetails);
bookRouter.get("/getAllBooks", checkToken, getAllBooks);
bookRouter.post("/saveNotes", checkToken, saveNotes);
bookRouter.post("/addBook", checkToken, addBook);

module.exports = bookRouter;
