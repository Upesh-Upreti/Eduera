const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
var cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

//file storage configuration for multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//file filter for multer
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//middlewares
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: filefilter }).single("image")
);

dotenv.config();

//Page not found Route
const errorController = require("./controllers/error");

//Database
const sequelize = require("./util/database");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
//? :::::::------ ROUTES -----::::::::::
//?  ------- AUTH ROUTES ---------
app.use("/api/v1/auth", require("./routes/auth"));

//?  ------- ADMIN ROUTES ---------
app.use("/api/v1/admin/accounts", require("./routes/admin/accounts"));

//?  ------- FRONTEND ROUTES ---------
app.use("/api/v1/blogs", require("./routes/frontend/blogs"));
app.use("/api/v1/products", require("./routes/frontend/products"));
app.use("/api/v1/subproducts", require("./routes/frontend/subProducts"));
app.use("/api/v1/careers", require("./routes/frontend/careers"));
app.use("/api/v1/contacts", require("./routes/frontend/contacts"));
app.use("/api/v1/teams", require("./routes/frontend/teams"));
app.use("/api/v1/testimonials", require("./routes/frontend/testimonials"));

//? ------- EDITOR ROUTES ---------
app.use("/api/v1/editor/account", require("./routes/editor/account"));
app.use("/api/v1/editor/blogs", require("./routes/editor/blogs"));
app.use("/api/v1/editor/products", require("./routes/editor/products"));
app.use("/api/v1/editor/subproducts", require("./routes/editor/subProducts"));
app.use("/api/v1/editor/careers", require("./routes/editor/careers"));
app.use("/api/v1/editor/contacts", require("./routes/editor/contacts"));
app.use("/api/v1/editor/teams", require("./routes/editor/teams"));
app.use("/api/v1/editor/testimonials", require("./routes/editor/testimonials"));
app.use("/api/v1/editor/enquiry", require("./routes/editor/enquiry"));

//?  ------- REST ROUTES ---------
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello there! this server is up and running" });
});

//For 404 handling
app.use(errorController.get404);

app.listen(3000, (req, res) => {
  console.log("Server is up and running at port 3000.");
});

const syncDatabase = async () => {
  await sequelize.sync()
};

syncDatabase();
