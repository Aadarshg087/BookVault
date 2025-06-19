// add book
// remove book
// getAllBooks of a user
// change status
// need to implement the middleware to get the current user

const Book = require("../models/book.models");
const User = require("../models/user.models");

async function addBook(req, res) {
  try {
    let { bookTitle, bookAuthor, status, description, user } = req.body;
    if (!bookTitle || !status || !bookAuthor) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // const currUser = req.user; // middleware part
    // const currUser = "rahul@gmail.com";
    if (!user) {
      return res.status(400).json({
        message: "User must be logged in",
      });
    }

    const currUserId = await User.findOne({ email: user });
    const entry = await Book.create({
      bookTitle,
      bookAuthor,
      status,
      description,
      user: currUserId._id,
    });

    return res.status(200).json({ message: "Book added successfully", entry });
  } catch (error) {
    console.log(`Error in adding the book to the DB ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function getAllBooks(req, res) {
  try {
    const currUser = "rahul@gmail.com";
    const currUserId = await User.findOne(
      { email: currUser },
      { projection: { _id: 1 } }
    );

    const allBooks = await Book.find({ user: currUserId });

    return res.status(200).json(allBooks);
  } catch (error) {
    console.log(`Erro in fetching the books ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = { addBook, getAllBooks };
