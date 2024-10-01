const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const ChatUserRouter = require("./routes/ChattingRouter");
const UserRouter = require("./routes/UserRouter");
const GeneralUserRouter = require("./routes/GeneralUserRouter");
const UserAuthRouter = require("./routes/UserAuthRouter");
const FileRouter = require("./routes/FileRouter");
const InventoryRouter = require("./routes/InventoryRouter");
const ProductRouter = require("./routes/ProductRouter");
const NotificationRouter = require("./routes/NotificationRouter");
const StoreRouter = require("./routes/StoreRouter");
const DashboardRouter = require("./routes/DashboardRouter");
const ArticleRouter = require("./routes/ArticleRouter.js");
const config = require("./config/config");
const ArticleCatRouter = require("./routes/ArticleCatRouter.js");
const HomeProductRouter = require("./routes/homeProductRouter");
// const User = require("./Models/UnreadModel");

const app = express();
app.use(cors(""));

//connect mongodb
const db = require("./config/config").MONGOURI;
mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("err");
  });

//body-parser

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

//passport initialize
app.use(passport.initialize());
app.use(fileUpload());
const PORT = process.env.PORT || 5000;

app.use("/api/chat", ChatUserRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/inventory", InventoryRouter);
app.use("/api/generaluser", GeneralUserRouter);
app.use("/api/auth", UserAuthRouter);
app.use("/api/file", FileRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api/store", StoreRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/article", ArticleRouter);
app.use("/api/articlecat", ArticleCatRouter);
app.use("/api/homeproduct", HomeProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
