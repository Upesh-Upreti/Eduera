const Team = require("../../models/team")

const postAddTeamMember = async (req, res) => {
    //Grabbing data from the form 
    const { name, designation, imageUrl, imageAlt, show, orderNumber, facebookLink, instagramLink, twitterLink, linkedinLink } = req.body

    const team = await Team.create({
        name: name,
        designation: designation,
        orderNumber: orderNumber,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        twitterLink: twitterLink,
        linkedinLink: linkedinLink
    })

    if (team) {
        res.status(202).json({ "message": "Team member was added successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! team member isn't added" })
    }
}

const getAllTeamMembers = async (req, res) => {
    const team = await Team.findAll()

    if (team)
        return res.status(200).json(team)

    return res.status(404).json({ "message": "Sorry! we didn't find any team members." })
}

const getTeamMemberById = async (req, res) => {

    const teamId = req.params.id

    const team = await Team.findOne({ where: { id: teamId } });
    if (team === null) {
        res.status(404).json({ "message": "Oops! we didn't find the team Member that you are looking for." })
    } else {
        res.status(202).json(team)
    }

}

const editTeamMemberById = async (req, res) => {

    //Team member id
    const teamId = req.params.id

    //Grabbing data from the form 
    const { name, designation, imageUrl, imageAlt, show, orderNumber, facebookLink, instagramLink, twitterLink, linkedinLink } = req.body

    //finding the team member in the database
    const team = await Team.findOne({ where: { id: teamId } })

    if (team === null) {
        res.status(404).json({ "message": "Oops! we didn't find the team member that you are looking for." })
    } else {
        //updating the database
        const update = await team.update({
            name: name,
            designation: designation,
            orderNumber: orderNumber,
            imageUrl: imageUrl,
            imageAlt: imageAlt,
            show: show,
            facebookLink: facebookLink,
            instagramLink: instagramLink,
            twitterLink: twitterLink,
            linkedinLink: linkedinLink
        })

        //saving the updates into the database
        const saved = await update.save()

        if (saved === null) {
            res.status(500).json({ "message": "Sorry we couldn't update the database." })
        } else {
            res.status(202).json({ "message": "Database was updated sucessfully." })
        }
    }
}

const deleteTeamMemberById = async (req, res) => {

    const teamId = req.params.id

    const deleted = await Team.destroy({ where: { id: teamId } })

    if (deleted) {
        res.status(202).json({ "message": "Team member was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such team member was found or the Team member was already deleted" })
    }
}

module.exports = {
    postAddTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    editTeamMemberById,
    deleteTeamMemberById
}