const express = require("express");
const { addBook, getAllBooks } = require("../controllers/book.controller");
const { checkToken } = require("../middleware/auth.middleware");

const bookRouter = express.Router();

bookRouter.get("/getAllBooks", checkToken, getAllBooks);
bookRouter.post("/addBook", checkToken, addBook);

module.exports = bookRouter;
