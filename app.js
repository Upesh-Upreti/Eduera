const express = require("express")
const dotenv = require("dotenv")

const app = express()

app.use(express.json())
dotenv.config()

//Our routes to handle different requests accordingly
const adminProductRoute = require("./routes/products/adminProduct")
const userProductRoute = require("./routes/products/userProduct")
const errorController = require("./controllers/error")

//Database 
const sequelize = require('./util/database')

//Route to handle the admin requests
app.use("/api/v1/admin", adminProductRoute)

//Route to handle the users requests
app.use("/api/v1", userProductRoute)

app.get("/", (req, res) => {
	res.status(200).send("<h1>Hello World!</h1>")
})

//For 404 handling
app.use(errorController.get404)

app.listen(3000, (req, res) => {
	console.log("Server is up and running at port 3000.")
})

const syncDatabase = async () => { console.log(`Sequelize Synching message : ${await sequelize.sync()}`) }

syncDatabase()
