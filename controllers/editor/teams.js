const { Team } = require("../../models");
const fs = require("fs");

const postAddTeamMember = async (req, res) => {
  //Grabbing data from the form
  const {
    name,
    designation,
    imageAlt,
    show,
    orderNumber,
    facebookLink,
    instagramLink,
    twitterLink,
    linkedinLink,
  } = req.body;

  //to avoid the error
  if (name === undefined || designation === undefined || req.file === undefined)
    return res.status(401).json({
      message: "Please atleast provide the name, designation and image.",
    });

  const team = await Team.create({
    name: name,
    designation: designation,
    orderNumber: orderNumber,
    imageUrl: req.file.filename,
    imageAlt: imageAlt,
    show: show,
    facebookLink: facebookLink,
    instagramLink: instagramLink,
    twitterLink: twitterLink,
    linkedinLink: linkedinLink,
  });

  if (team) {
    res.status(202).json({ message: "Team member was added successfully." });
  } else {
    res.status(500).json({ message: "Sorry! team member isn't added" });
  }
};

const editTeamMemberById = async (req, res) => {
  //Team member id
  const teamId = req.params.id;

  //Grabbing data from the form
  const {
    name,
    designation,
    imageAlt,
    show,
    orderNumber,
    facebookLink,
    instagramLink,
    twitterLink,
    linkedinLink,
  } = req.body;

  //to avoid the error
  if (
    title === undefined ||
    shortDescription === undefined ||
    longDescription === undefined
  )
    return res.status(401).json({
      message:
        "Please atleast provide the title, short description and long descriptio.",
    });

  //finding the team member in the database
  const team = await Team.findOne({ where: { id: teamId } });

  if (team === null) {
    res.status(404).json({
      message: "Oops! we didn't find the team member that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    if (team.imageUrl) {
      const path = "public/images/" + team.imageUrl;

      console.log("Deleting the previously existing image at " + path);

      try {
        fs.unlinkSync(path);
        //file removed
      } catch (err) {}
    }
    //updating the database
    const update = await team.update({
      name: name,
      designation: designation,
      orderNumber: orderNumber,
      imageUrl: req.file.filename,
      imageAlt: imageAlt,
      show: show,
      facebookLink: facebookLink,
      instagramLink: instagramLink,
      twitterLink: twitterLink,
      linkedinLink: linkedinLink,
    });

    //saving the updates into the database
    const saved = await update.save();

    if (saved === null) {
      res
        .status(500)
        .json({ message: "Sorry we couldn't update the database." });
    } else {
      res.status(202).json({ message: "Database was updated sucessfully." });
    }
  }
};

const deleteTeamMemberById = async (req, res) => {
  const teamId = req.params.id;

  const team = await Team.findOne({ where: { id: teamId } });

  //to delete the previously existing image, if exists
  if (team.imageUrl) {
    const path = "public/images/" + team.imageUrl;

    console.log("Deleting the previously existing image at " + path);

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {}
  }

  const deleted = await Team.destroy({ where: { id: teamId } });

  if (deleted) {
    res.status(202).json({ message: "Team member was deleted successfully." });
  } else {
    res.status(404).json({
      message:
        "No such team member was found or the Team member was already deleted",
    });
  }
};

module.exports = {
  postAddTeamMember,
  editTeamMemberById,
  deleteTeamMemberById,
};
