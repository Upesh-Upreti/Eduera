const { Product } = require("../../models");
const crypto = require("crypto")
const fs = require("fs");

const postAddProduct = async (req, res) => {
  //Grabbing data from the form
  const {
    title,
    category,
    price,
    imageAlt,
    show,
    slug,
    shortDescription,
    longDescription,
  } = req.body;

  //to avoid the error
  if (
    title === undefined ||
    shortDescription === undefined ||
    longDescription === undefined ||
    !req.file
  )
    return res.status(400).json({
      message:
        "Please atleast provide the title, image, short description and long descriptio.",
    });

  const product = await Product.create({
    id: crypto.randomBytes(16).toString("hex"),
    title: title,
    category: category,
    price: price,
    imageUrl: process.env.BASE_URL + "images/" + req.file.filename,
    imageAlt: imageAlt,
    show: show,
    slug: slug,
    shortDescription: shortDescription,
    longDescription: longDescription,
  });

  if (product) {
    res.status(202).json({ message: "Product was created successfully." });
  } else {
    res.status(500).json({ message: "Sorry! product isn't created" });
  }
};

const editProductById = async (req, res) => {
  //product id
  const productId = req.params.id;

  //Grabbing data from the form
  const {
    title,
    category,
    price,
    imageAlt,
    show,
    slug,
    shortDescription,
    longDescription,
  } = req.body;

  //to avoid the error
  if (
    title === undefined ||
    shortDescription === undefined ||
    longDescription === undefined
  )
    return res.status(400).json({
      message:
        "Please atleast provide the title, short description and long descriptio.",
    });

  //finding the product in the database
  const product = await Product.findOne({ where: { id: productId } });

  if (product === null) {
    res.status(404).json({
      message: "Oops! we didn't find the product that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    if (product.imageUrl !== null) {
      const path = "public/" + product.imageUrl.slice(process.env.BASE_URL.length, product.imageUrl.length)
      if (req.file) {
        try {
          fs.unlinkSync(path);
          //file removed
        } catch (err) { }
      }
    }
    //updating the database
    const update = await product.update({
      title: title,
      category: category,
      price: price,
      imageUrl: req.file ? process.env.BASE_URL + "images/" + req.file.filename : product.imageUrl,
      imageAlt: imageAlt,
      show: show,
      slug: slug,
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

const deleteProductById = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findOne({ where: { id: productId } });

  if (!product)
    return res.status(400).json({ message: "Sorry! no such product found." });

  //to delete the previously existing image, if exists

  if (product.imageUrl !== null) {
    const path = "public/" + product.imageUrl.slice(process.env.BASE_URL.length, product.imageUrl.length)

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) { }
  }
  const deleted = await Product.destroy({ where: { id: productId } });

  if (deleted) {
    res.status(202).json({ message: "Product was deleted successfully." });
  } else {
    res.status(400).json({
      message: "No such product was found or the product was already deleted",
    });
  }
};

module.exports = {
  postAddProduct,
  editProductById,
  deleteProductById,
};
