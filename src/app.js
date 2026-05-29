const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo Backend API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

module.exports = app;
