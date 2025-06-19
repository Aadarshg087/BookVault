const mongoose = require("mongoose");
const User = require("./user.models");

const bookSchema = mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    bookAuthor: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Reading", "Finished", "In Queue"],
      default: "In Queue",
      required: true,
    },
    description: {
      type: String,
      default: "No description is provided for this book",
    },
    notes: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
