const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")

const router = express.Router()

const userController = require("../../controllers/blogs/userBlog")

//To get all the available blogs .
router.get("/blogs", checkToken, userController.getAllBlogs)

//To get a particular blogs  by its id.
router.get("/blog/:id", checkToken, userController.getBlogById)

//To add a new blog.
router.post("/add-blog", checkToken, userController.postAddBlog)

//To edit the existing blog 
router.patch("/edit-blog/:id", checkToken, userController.editBlogById)

//To delete a particular blog 
router.delete("/delete-blog/:id", checkToken, userController.deleteBlogById)

module.exports = router

