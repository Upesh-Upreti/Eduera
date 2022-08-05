const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const multer = require("multer")

const app = express()

//file storage configuration for multer
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

//file filter for multer 
const filefilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
		cb(null, true)
	} else {
		cb(null, false)
	}
}


//middlewares
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(multer({ storage: fileStorage, fileFilter: filefilter }).single("image"))


dotenv.config()

//Our routes to handle different requests accordingly
//Product Routes
const userProductRoute = require("./routes/products/userProduct")
const frontendProductRoute = require("./routes/products/frontendProduct")
//Team Routes
const userTeamRoute = require("./routes/team/userTeam")
const frontendTeamRoute = require("./routes/team/frontendTeam")
//Blog Routes
const userBlogRoute = require("./routes/blogs/userBlog")
const frontendBlogRoute = require("./routes/blogs/frontendBlog")
//Tetimony Routes
const userTestimoniesRoute = require("./routes/testimonies/userTestimonies")
const frontendTestimoniesRoute = require("./routes/testimonies/frontendTestimonies")
//Career Routes
const userCareersRoute = require("./routes/careers/userCareer")
const frontendCareersRoute = require("./routes/careers/frontendCareer")
//Account Routes
const accountsRoute = require("./routes/accounts/account")
//Contact Us Routes
const contactsRoute = require("./routes/contact/contact")
//Page not found Route
const errorController = require("./controllers/error")

//Database 
const sequelize = require('./util/database')

//Route to handle the product requests
app.use("/api/v1/user", userProductRoute)
app.use("/api/v1", frontendProductRoute)
//Route to handle the team member requests
app.use("/api/v1/user", userTeamRoute)
app.use("/api/v1", frontendTeamRoute)
//Route to handle the blog requests
app.use("/api/v1/user", userBlogRoute)
app.use("/api/v1", frontendBlogRoute)
//Route to handle the testimony requests
app.use("/api/v1/user", userTestimoniesRoute)
app.use("/api/v1", frontendTestimoniesRoute)
//Route to handle the Career requests
app.use("/api/v1/user", userCareersRoute)
app.use("/api/v1/", frontendCareersRoute)
//Route to handle the account requests
app.use("/api/v1/user", accountsRoute)
//Route to handle the contact us requests
app.use("/api/v1/user", contactsRoute)

app.get("/", (req, res) => {
	res.status(200).json({ "message": "Hello there! this server is up and running" })
})

//For 404 handling
app.use(errorController.get404)

app.listen(3000, (req, res) => {
	console.log("Server is up and running at port 3000.")
})

const syncDatabase = async () => { console.log(`Sequelize Synching message : ${await sequelize.sync()}`) }

syncDatabase()
