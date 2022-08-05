const express = require("express")

const router = express.Router()

const frontendController = require("../../controllers/team/frontendTeam")

//To get all the available team members.
router.get("/team", frontendController.getAllTeamMembers)

//To get a particular team member by their id.
router.get("/team/:id", frontendController.getTeamMemberById)

module.exports = router