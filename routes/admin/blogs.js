const express = require("express");

const router = express.Router();

const userController = require("../../controllers/admin/blogs");

//To add a new blog.
router.post("/add", userController.postAddBlog);

//To edit the existing blog
router.patch("/edit/:id", userController.editBlogById);

//To delete a particular blog
router.delete("/delete/:id", userController.deleteBlogById);

module.exports = router;
