const express = require("express")

const router = express.Router()

const adminController = require("../../controllers/team/adminTeam")

//To get all the available team members.
router.get("/team", adminController.getAllTeamMembers)

//To get a particular team member by their id.
router.get("/team/:id", adminController.getTeamMemberById)

//To add a new team member.
router.post("/add-team-member", adminController.postAddTeamMember)

//To edit the existing team member
router.patch("/edit-team-member/:id", adminController.editTeamMemberById)

//To delete a particular team member
router.delete("/delete-team-member/:id", adminController.deleteTeamMemberById)

module.exports = router

