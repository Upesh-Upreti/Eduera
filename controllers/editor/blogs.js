const { Blog } = require("../../models");
const crypto = require("crypto")

const postAddBlog = async (req, res) => {
  //Grabbing data from the form
  const {
    title,
    category,
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
    req.file === null
  )
    return res.status(401).json({
      message:
        "Please atleast provide the title, image, short description and long descriptio.",
    });
  const blog = await Blog.create({
    id: crypto.randomBytes(16).toString("hex"),
    title: title,
    category: category,
    imageUrl: "public/images/" + req.file.filename,
    imageAlt: imageAlt,
    show: show,
    slug: slug,
    shortDescription: shortDescription,
    longDescription: longDescription,
  });

  if (blog) {
    res.status(202).json({ message: "Blog was added successfully." });
  } else {
    res.status(500).json({ message: "Sorry! blog isn't added" });
  }
};

const editBlogById = async (req, res) => {
  //Blog member id
  const blogId = req.params.id;

  //Grabbing data from the form
  const {
    title,
    category,
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

  //finding the blog member in the database
  const blog = await Blog.findOne({ where: { id: blogId } });

  if (blog === null) {
    res.status(400).json({
      message: "Oops! we didn't find the blog member that you are looking for.",
    });
  } else {
    //to delete the previously existing image, if exists
    const path = blog.imageUrl
    if (req.file) {
      try {
        fs.unlinkSync(path);
        //file removed
      } catch (err) { }
    }
    //updating the database
    const update = await blog.update({
      title: title,
      category: category,
      imageUrl: req.file ? "public/images/" + req.file.filename : path,
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

const deleteBlogById = async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findOne({ where: { id: blogId } });

  //to delete the previously existing image, if exists
  if (blog.imageUrl) {
    const path = "public/images/" + blog.imageUrl;

    console.log("Deleting the previously existing image at " + path);

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) { }
  }

  const deleted = await Blog.destroy({ where: { id: blogId } });

  if (deleted) {
    res.status(202).json({ message: "Blog member was deleted successfully." });
  } else {
    res.status(400).json({
      message:
        "No such blog member was found or the Blog member was already deleted",
    });
  }
};

module.exports = {
  postAddBlog,
  editBlogById,
  deleteBlogById,
};
