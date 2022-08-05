const express = require("express");

const router = express.Router();

const teamsController = require("../../controllers/frontend/teams");

//To get all the available team members.
router.get("/", teamsController.getAllTeamMembers);

//To get a particular team member by their id.
router.get("/:id", teamsController.getTeamMemberById);

module.exports = router;
