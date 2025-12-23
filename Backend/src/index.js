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

const app = express();
// http://IP:300
// /fsdhfsdkjf/sdfkljsdf/sdfjksldnf

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    // origin: "https://book-vault-frontend-ashen.vercel.app",
    origin: process.env.CORS,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// app.options("*", cors());

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
// Routes

// health api
app.get("/health", async (req, res) => {
  try {
    const url =
      "https://demo-sand.oddr.com/invoiceservice/api/v1/clients/8oy9/matters/ufxn?properties=Contacts&properties=PaymentPromises&properties=PaymentPlans&properties=Payors";

    const token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwMDhvMlBCREJtbUZ0MzFmTmVqeWN1eHdEX1lwSmdGWXM4NlJzWUpnX1hZIn0.eyJleHAiOjE3NjAzODQ1OTIsImlhdCI6MTc2MDM4Mjc5MiwiYXV0aF90aW1lIjoxNzYwMzgyNzkxLCJqdGkiOiJvbnJ0YWM6MTgwYTNlNzAtN2E5Ny1hYzRhLTA3YmEtYTRiZjAxODJmMjVkIiwiaXNzIjoiaHR0cHM6Ly9pZG0tc2FuZC5vZGRyLmNvbS9yZWFsbXMvZGVtby1zYW5kIiwiYXVkIjpbImF1ZGllbmNlLWludm9pY2UiLCJhY2NvdW50Il0sInN1YiI6ImNlYjMwZDUwLWExOTktNGM3OC1hMjJiLWI4MGMwZjAzMzIxNyIsInR5cCI6IkJlYXJlciIsImF6cCI6Imludm9pY2UtYXBwIiwic2lkIjoiNzc4OTk5ZGMtMzNmMy00N2E2LTg5OWUtMGQ5MTBiNGM2MjA5IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRlbW8tc2FuZCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIEludm9pY2VBcHAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImh0dHBzOi8vd3d3Lm9kZHIuY29tL3RlbmFudGFsaWFzIjoiZGVtby1zYW5kIiwibmFtZSI6IkNocmlzIENvbGxlY3RvciIsImdyb3VwcyI6WyJkZWZhdWx0LXJvbGVzLWRlbW8tc2FuZCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2hyaXMuY29sbGVjdG9yQG9kZHJkZW1vLmNvbSIsImdpdmVuX25hbWUiOiJDaHJpcyIsImZhbWlseV9uYW1lIjoiQ29sbGVjdG9yIiwiaHR0cHM6Ly93d3cub2Rkci5jb20vdGVuYW50aWQiOjF9.SuPgqsvjlpukWV9KLevnAwRrn6z5GioAsnpbiDHyMbj6RV5ANPRrLLhAAk8SHdevbETLR7mdzqHp0TLRyyCQawOFswjbFr7B5_bdqT_65FWG7OuDzAayJLkHrBCD0ANEpMbyDiA1CpbNFJ3vNLa8baOj1kDhtL069wOP18QlxsjW10Jfs3jBRLzBlq1YRCMf30cd4qsdA8J5g7Wao0VAJgTqbO-iQuV8qJ1AaOXXAZ_PmRu7fSrQiqhh6PgyQ_1kHaUAVwmOHqXmiTA39ccB2g-txvSeMOcfI-9ASsxihTHWQEhEF7Jn7OkRTqNqUKukeV7fjQBoNXegUhUm_6xX_Q`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res1 = await response.json();
    console.log(res1);
    console.log("External API status:", response.status);

    if (response.status === 200) {
      return res.status(200).json({ message: "API is working !!!" });
    } else {
      return res.status(400).json({ message: "API is not working !!!" });
    }
  } catch (error) {
    console.error("Error calling external API:", error.message);
    return res.status(500).json({
      message: "API health check failed!",
      error: error.message,
    });
  }
});

// link, -> parameter
// app.get("http://abc/something", () => {
//   return res.status(200).json({
//     message: "yay",
//   });
// });

// auth
app.get("/api/validate-token", validateToken);

// app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.PORT}...`);
});
