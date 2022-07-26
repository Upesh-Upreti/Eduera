const { Testimony } = require("../../models");
const crypto = require("crypto")
const fs = require("fs");

const postAddTestimony = async (req, res) => {
  //Grabbing data from the form
  const { name, designation, imageAlt, show, testimony } = req.body;

  //to avoid the error
  if (
    name === undefined ||
    designation === undefined ||
    !req.file ||
    testimony === undefined
  )
    return res.status(401).json({
      message:
        "Please atleast provide the name, designation, image and testimony.",
    });

  const testimonial = await Testimony.create({
    id: crypto.randomBytes(16).toString("hex"),
    name: name,
    designation: designation,
    imageUrl: process.env.BASE_URL + "images/" + req.file.filename,
    imageAlt: imageAlt,
    show: show,
    testimony: testimony,
  });

  if (testimonial) {
    res.status(202).json({ message: "Testimony  was added successfully." });
  } else {
    res.status(500).json({ message: "Sorry! testimonial  isn't added" });
  }
};

const editTestimonyById = async (req, res) => {
  //Testimony  id
  const testimonyId = req.params.id;

  //Grabbing data from the form
  const { name, designation, imageAlt, show, testimony } = req.body;

  //to avoid the error
  if (
    name === undefined ||
    designation === undefined ||
    testimony === undefined
  )
    return res.status(400).json({
      message:
        "Please atleast provide the name, designation and testimony.",
    });

  //finding the testimonial  in the database
  const testimonial = await Testimony.findOne({ where: { id: testimonyId } });

  if (testimonial === null) {
    res.status(400).json({
      message:
        "Oops! we didn't find the testimonial  that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    const path = "public/" + testimonial.imageUrl.slice(process.env.BASE_URL.length, testimonial.imageUrl.length)
    if (req.file) {
      try {
        fs.unlinkSync(path);
        //file removed
      } catch (err) {
        console.error(err);
      }
    }
    //updating the database
    const update = await testimonial.update({
      name: name,
      imageUrl: req.file ? process.env.BASE_URL + "images/" + req.file.filename : testimonial.imageUrl,
      imageAlt: imageAlt,
      show: show,
      testimony: testimony,
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

const deleteTestimonyById = async (req, res) => {
  const testimonyId = req.params.id;

  const testimony = await Testimony.findOne({ where: { id: testimonyId } });

  if (!testimony)
    return res.status(400).json({
      message: "Oops! we didn't find the testimony that you are looking for.",
    })

  //to delete the previously existing image, if exists
  const path = "public/" + testimony.imageUrl.slice(process.env.BASE_URL.length, testimony.imageUrl.length)

  console.log("Deleting the previously existing image at " + path);

  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) { }

  const deleted = await Testimony.destroy({ where: { id: testimonyId } });

  console.log(deleted);

  if (deleted) {
    res.status(202).json({ message: "Testimony  was deleted successfully." });
  } else {
    res.status(400).json({
      message:
        "No such testimonial  was found or the Testimony  was already deleted",
    });
  }
};

module.exports = {
  postAddTestimony,
  editTestimonyById,
  deleteTestimonyById,
};
