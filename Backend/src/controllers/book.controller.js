// add book
// remove book
// getAllBooks of a user
// change status
// need to implement the middleware to get the current user

const { mongoose } = require("mongoose");
const Book = require("../models/book.models");
const User = require("../models/user.models");

async function addBook(req, res) {
  try {
    let { bookTitle, bookAuthor, description, category } = req.body;
    const userEmail = req.userEmail;
    if (!bookTitle || !bookAuthor) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // const currUser = req.user; // middleware part
    // const currUser = "rahul@gmail.com";
    if (!userEmail) {
      return res.status(400).json({
        message: "User must be logged in",
      });
    }
    const cat = category.split(",").map((ele) => ele.trim());

    const currUserId = await User.findOne({ email: userEmail });
    const entry = await Book.create({
      bookTitle,
      bookAuthor,
      description,
      category: cat,
      notes: "",
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
    const user = req.userEmail;
    const currUserId = await User.findOne(
      { email: user },
      { projection: { _id: 1 } }
    );
    const allBooks = await Book.find({ user: currUserId });
    console.log(allBooks);
    return res.status(200).json(allBooks);
  } catch (error) {
    console.log(`Error in fetching the books ${error}`);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function getBookDetails(req, res) {
  try {
    const { bookId } = req.body;
    const userId = req.userId;
    if (!userId || !bookId) {
      res.status(400).json({ message: "Both user ID and Book ID is required" });
    }

    const details = await Book.findOne({ _id: bookId, user: userId });

    return res.status(200).json(details);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function saveNotes(req, res) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "User must be loggedIn",
      });
    }
    const bookId = req.body._id;
    const { notes } = req.body;
    const isSaved = await Book.findByIdAndUpdate(
      bookId,
      { notes: notes },
      { new: true }
    );
    console.log(isSaved);
    return res.status(200).json(isSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function getAllCategories(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    console.log(typeof userId);
    const categories = await Book.aggregate([
      { $match: { user: userId } },
      { $unwind: "$category" },
      { $group: { _id: null, uniqueCategories: { $addToSet: "$category" } } },
      { $project: { _id: 0, uniqueCategories: 1 } },
    ]);

    return res.status(200).json(categories[0].uniqueCategories);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Somehting went wrong",
    });
  }
}

async function getCategoryBooks(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const { category } = req.body;
    if (category === "All") {
      const books = await Book.find({
        user: userId,
      });
      return res.status(200).json(books);
    }

    const categoryBooks = await Book.find({
      user: userId,
      category,
    });
    return res.status(200).json(categoryBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = {
  addBook,
  getAllBooks,
  getBookDetails,
  saveNotes,
  getAllCategories,
  getCategoryBooks,
};
