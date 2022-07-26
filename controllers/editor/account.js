const { Account } = require("../../models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt_decode = require("jwt-decode");
const fs = require("fs");
const yup = require("yup");
const validate = require("../../util/validate");

const changePassword = async (req, res) => {
  const token = req.cookies.token;

  const accountId = jwt_decode(token).id;

  //Grabbing data from the form
  const { currentPassword, newPassword } = req.body;

  const passwordSchema = yup.object({
    newPassword: yup.string().required().min(8),
  });

  validate(passwordSchema, newPassword);

  //to avoid the error
  if (currentPassword === undefined || newPassword === undefined)
    return res.status(400).json({
      message: "Please provide the current passord and new password.",
    });

  if (newPassword.length < 8)
    return res.status(400).json({
      message: "Please provide the password with atleast of 8 characters.",
    });

  const findAccount = await Account.findOne({ where: { id: accountId } });

  if (!findAccount)
    return res
      .status(401)
      .json({ message: "Oops! your credentials don't match." });

  if (!compareSync(currentPassword, findAccount.password))
    return res.status(401).json({ message: "Sorry! incorrect password." });

  //Generting salt for password
  const salt = genSaltSync(10);

  const updatedAccount = await findAccount.update({
    password: hashSync(newPassword, salt),
  });

  if (updatedAccount) {
    res.status(202).json({ message: "Password change was successfully." });
  } else {
    res.status(500).json({
      message: "Sorry! password change was unsuccessful. please try again.",
    });
  }
};

const editAccountDetails = async (req, res) => {
  const token = req.cookies.token;

  const accountId = jwt_decode(token).id;

  //Grabbing data from the form
  const { name, imageAlt, show } = req.body;

  //to avoid the error
  if (name === undefined)
    return res
      .status(400)
      .json({ message: "Please atleast provide the name, role and password." });

  const findAccount = await Account.findOne({ where: { id: accountId } });

  if (findAccount === null)
    return res
      .status(400)
      .json({ message: "Oops! no such user found with that email address" });

  //to delete the previously existing image, if exists
  if (findAccount.imageUrl !== null) {
    if (req.file) {
      const path = "public/" + findAccount.imageUrl.slice(process.env.BASE_URL.length, findAccount.imageUrl.length)

      console.log("Deleting the previously existing image at " + path);

      try {
        fs.unlinkSync(path);
        //file removed
      } catch (err) { }
    }
  }

  //updating the database
  const update = await account.update({
    name: name,
    imageUrl: req.file ? process.env.BASE_URL + "images/" + req.file.filename : findAccount.imageUrl,
    imageAlt: imageAlt,
    show: show,
  });

  //saving the updates into the database
  const saved = await update.save();

  if (saved === null) {
    res.status(500).json({ message: "Sorry we couldn't update the database." });
  } else {
    res.status(202).json({ message: "Database was updated sucessfully." });
  }
};

const accountDetails = async (req, res) => {
  const token = req.cookies.token;

  const accountId = jwt_decode(token).id;

  const findAccount = await Account.findOne({ where: { id: accountId }, attributes: ['name', 'email', 'role', 'imageUrl'] });

  if (findAccount === null)
    return res
      .status(400)
      .json({ message: "Oops! no such user found with that email address" });

  return res.status(200).json(findAccount)
}
module.exports = {
  changePassword,
  editAccountDetails,
  accountDetails
};
