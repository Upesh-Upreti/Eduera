const { Account } = require("../../models/");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const fs = require("fs");

const postAddAccount = async (req, res) => {
  //Grabbing data from the form
  const { name, email, imageAlt, show, role, password } = req.body;

  //to avoid the error
  if (name === undefined || role === undefined || password === undefined)
    return res.status(400).json({
      message: "Please at least provide the name, email, role and password.",
    });

  const findAccount = await Account.findOne({ where: { email: email } });

  if (findAccount)
    return res
      .status(409)
      .json({ message: "Oops! a user already exists with that email address" });

  //Generting salt for password
  const salt = genSaltSync(10);

  if (password.length < 8)
    return res.status(400).json({
      message: "Please provide the password with atleast of 8 characters.",
    });

  const account = await Account.create({
    name: name,
    email: email.toLowerCase(),
    imageUrl: req?.file?.filename ?? "",
    imageAlt: imageAlt,
    show: show,
    role: role,
    password: hashSync(password, salt),
  });

  if (account) {
    res.status(202).json({ message: "account was added successfully." });
  } else {
    res.status(500).json({ message: "Sorry! account isn't added" });
  }
};

const getAllAccounts = async (req, res) => {
  let accounts = await Account.findAll();

  if (!accounts || accounts.length === 0)
    return res
      .status(404)
      .json({ message: "Sorry! we didn't find any account members." });

  //To not to send the hashed password
  // accounts = accounts.filter((account) => Object.fromEntries(Object.entries(account).filter(([key]) => key.includes('password')));)

  res.status(202).json(accounts);
};

const getAccountById = async (req, res) => {
  const accountId = req.params.id;

  let account = await Account.findOne({ where: { id: accountId } });

  if (account === null) {
    res.status(404).json({
      message:
        "Oops! we didn't find the account Member that you are looking for.",
    });
  } else {
    //To not to send the hashed password
    //account.filter((acc) => Object.fromEntries(Object.entries(acc).filter(([key]) => key.includes('password')));)
    res.status(202).json(account);
  }
};

const editAccountById = async (req, res) => {
  const accountId = req.params.id;

  //Grabbing data from the form
  const { name, imageAlt, show, role } = req.body;

  //to avoid the error
  if (name === undefined || role === undefined)
    return res
      .status(400)
      .json({ message: "Please atleast provide the name, role and password." });

  //finding the account in the database
  const account = await Account.findOne({ where: { id: accountId } });

  if (account.imageUrl) {
    const path = "./file.txt";

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }

  if (account === null) {
    res.status(404).json({
      message: "Oops! we didn't find the account that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    if (account.imageUrl) {
      const path = "public/images/" + account.imageUrl;

      console.log("Deleting the previously existing image at " + path);

      try {
        fs.unlinkSync(path);
        //file removed
      } catch (err) {}
    }

    //updating the database
    const update = await account.update({
      name: name,
      imageUrl: req.file.filename,
      imageAlt: imageAlt,
      show: show,
      role: role,
    });

    //saving the updates into the database
    const saved = await update.save();

    if (saved === null) {
      res
        .status(500)
        .json({ message: "Sorry we couldn't update the database." });
    } else {
      res
        .status(202)
        .json({ message: "User account was updated sucessfully." });
    }
  }
};

const deleteAccountById = async (req, res) => {
  const accountId = req.params.id;

  const account = await Blog.findOne({ where: { id: accountId } });

  //to delete the previously existing image, if exists
  if (account.imageUrl) {
    const path = "public/images/" + account.imageUrl;

    console.log("Deleting the previously existing image at " + path);

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {}
  }

  const deleted = await Account.destroy({ where: { id: accountId } });

  if (deleted) {
    res
      .status(202)
      .json({ message: "account member was deleted successfully." });
  } else {
    res.status(404).json({
      message:
        "No such account member was found or the account member was already deleted",
    });
  }
};

const resetPassword = async (req, res) => {
  const accountId = req.params.id;
  //Grabbing data from the form
  const { password } = req.body;

  //to avoid the error
  if (password === undefined || password.length < 8)
    return res.status(400).json({
      message: "Please atleast provide the password with atleast 8 characters.",
    });

  const findAccount = await Account.findOne({ where: { id: accountId } });

  if (findAccount === null) {
    res.status(404).json({
      message:
        "Oops! we didn't find the account member that you are looking for.",
    });
  } else {
    //Generting salt for password
    const salt = genSaltSync(10);

    //updating the database
    const update = await findAccount.update({
      password: hashSync(password, salt),
    });

    //saving the updates into the database
    const saved = await update.save();

    if (saved === null) {
      res
        .status(500)
        .json({ message: "Sorry we couldn't update the database." });
    } else {
      res
        .status(202)
        .json({ message: "Password updated was updated sucessfully." });
    }
  }
};

module.exports = {
  postAddAccount,
  getAllAccounts,
  getAccountById,
  editAccountById,
  deleteAccountById,
  resetPassword,
};
