const Team = require("../../models/team")

const getAllTeamMembers = async (req, res) => {
    const team = await Team.findAll()

    if (team)
        return res.status(200).json(team)
    return res.status(404).json({ "message": "Sorry! we didn't find any team mebers" })
}

const getTeamMemberById = async (req, res) => {
    const teamId = req.params.id

    const team = await Team.findOne({ where: { id: teamId } });
    if (team === null) {
        res.status(404).json({ "message": "Oops! we didn't find the team member that you are looking for." })
    } else {
        res.status(202).json(team)
    }
}

module.exports = {
    getAllTeamMembers,
    getTeamMemberById,
}