// packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// local function imports
const connectDB = require("./database/index");
const { userRouter } = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const { validateToken } = require("./controllers/auth.controller");
// const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CORS,
  })
);

connectDB()
  .then(() => {
    console.log(`Server is ready! 🚀`);
  })
  .catch(() => {
    console.log(`Some error occured in the server`);
  });

// morgan(":method :url :status :res[content-length] - :response-time ms");
// app.use(morgan("tiny"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
//   Routes
// auth
app.get("/api/validate-token", validateToken);

// app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT}...`);
});
