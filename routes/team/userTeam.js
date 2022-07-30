const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")

const router = express.Router()

const userController = require("../../controllers/team/userTeam")

//To get all the available team members.
router.get("/team", checkToken, userController.getAllTeamMembers)

//To get a particular team member by their id.
router.get("/team/:id", checkToken, userController.getTeamMemberById)

//To add a new team member.
router.post("/add-team-member", checkToken, userController.postAddTeamMember)

//To edit the existing team member
router.patch("/edit-team-member/:id", checkToken, userController.editTeamMemberById)

//To delete a particular team member
router.delete("/delete-team-member/:id", checkToken, userController.deleteTeamMemberById)

module.exports = router

