const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const AdminRouter = require("./routes/AdminRouter");
const app = express();
require("dotenv").config();

connectDB();

const corsOptions = {
  origin: "http://localhost:5176", // Add frontend URL here,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};
app.use(cors(corsOptions));



app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/users", productRouter);
app.use("/api/users", cartRouter);
app.use("/api/users", orderRouter);
app.use("/api/users", wishlistRouter);
app.use("/api/admin", AdminRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
