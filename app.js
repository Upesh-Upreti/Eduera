const express = require("express")
const dotenv = require("dotenv")

const app = express()

app.use(express.json())
dotenv.config()

//Our routes to handle different requests accordingly
//Product Routes
const adminProductRoute = require("./routes/products/adminProduct")
const userProductRoute = require("./routes/products/userProduct")
//Team Routes
const adminTeamRoute = require("./routes/team/adminTeam")
const userTeamRoute = require("./routes/team/userTeam")
//Page not found Route
const errorController = require("./controllers/error")

//Database 
const sequelize = require('./util/database')

//Route to handle the product requests
app.use("/api/v1/admin", adminProductRoute)
app.use("/api/v1", userProductRoute)
//Route to handle the team member requests
app.use("/api/v1/admin", adminTeamRoute)
app.use("/api/v1", userTeamRoute)

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
