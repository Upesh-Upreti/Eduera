const { Career } = require("../../models");
const crypto = require("crypto")
const fs = require("fs");

const postAddCareer = async (req, res) => {
  //Grabbing data from the form
  const { title, jobType, imageAlt, show, shortDescription, longDescription } =
    req.body;
  //to avoid the error
  if (!title || !longDescription)
    return res.status(401).json({
      message: "Please atleast provide the title and long description.",
    });

  const career = await Career.create({
    id: crypto.randomBytes(16).toString("hex"),
    title: title,
    jobType: jobType,
    imageUrl: req.file ? process.env.BASE_URL + "images/" + req.file.filename : null,
    imageAlt: imageAlt,
    show: show,
    shortDescription: shortDescription,
    longDescription: longDescription,
  });

  if (career) {
    res.status(202).json({ message: "Career was added successfully." });
  } else {
    res.status(500).json({ message: "Sorry! career isn't added" });
  }
};

const editCareerById = async (req, res) => {
  //Career  id
  const careerId = req.params.id;

  //Grabbing data from the form
  const { title, jobType, imageAlt, show, shortDescription, longDescription } =
    req.body;

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

  //finding the career  in the database
  const career = await Career.findOne({ where: { id: careerId } });

  if (career === null) {
    res.status(404).json({
      message: "Oops! we didn't find the career  that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    if (career.imageUrl !== null) {
      const path = "public/" + career.imageUrl.slice(process.env.BASE_URL.length, career.imageUrl.length)
      if (req.file) {
        try {
          fs.unlinkSync(path);
          //file removed
        } catch (err) { }
      }
    }

    //updating the database
    const update = await career.update({
      title: title,
      jobType: jobType,
      imageUrl: req.file ? process.env.BASE_URL + "images/" + req.file.filename : career.imageUrl,
      imageAlt: imageAlt,
      show: show,
      shortDescription: shortDescription,
      longDescription: longDescription,
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

const deleteCareerById = async (req, res) => {
  const careerId = req.params.id;

  const career = await Career.findOne({ where: { id: careerId } });

  if (career === null)
    res.status(404).json({
      message: "Oops! we didn't find the career that you are looking for.",
    });

  if (career.imageUrl !== null) {
    const path = "public/" + career.imageUrl.slice(process.env.BASE_URL.length, career.imageUrl.length)

    //to delete the previously existing image, if exists
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) { }
  }
  const deleted = await Career.destroy({ where: { id: careerId } });

  if (deleted) {
    res.status(202).json({ message: "Career  was deleted successfully." });
  } else {
    res.status(404).json({
      message: "No such career  was found or the Career  was already deleted",
    });
  }
};

module.exports = {
  postAddCareer,
  editCareerById,
  deleteCareerById,
};
