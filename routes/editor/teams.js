const express = require("express");
const router = express.Router();
const teamsController = require("../../controllers/editor/teams");
const withLoggedIn = require("../../middlewares/withLoggedIn");

//? middleware
router.use(withLoggedIn);

//To add a new team member.
router.post("/add", teamsController.postAddTeamMember);

//To edit the existing team member
router.patch("/edit/:id", teamsController.editTeamMemberById);

//To delete a particular team member
router.delete("/delete/:id", teamsController.deleteTeamMemberById);

module.exports = router;
