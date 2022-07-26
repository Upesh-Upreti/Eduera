const express = require("express")

const router = express.Router()

const userController = require("../../controllers/team/userTeam")

//To get all the available team members.
router.get("/team", userController.getAllTeamMembers)

//To get a particular team member by their id.
router.get("/team/:id", userController.getTeamMemberById)

module.exports = router