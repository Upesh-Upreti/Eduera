const { Blog } = require("../../models")

const getAllBlogs = async (req, res) => {
    const blog = await Blog.findAll()

    if (blog)
        return res.status(200).json(blog)
    return res.status(404).json({ "message": "Sorry! we didn't find any blog" })
}

const getBlogById = async (req, res) => {
    const blogId = req.params.id

    const blog = await Blog.findOne({ where: { id: blogId } });
    if (blog === null) {
        res.status(404).json({ "message": "Oops! we didn't find the blog that you are looking for." })
    } else {
        res.status(202).json(blog)
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
}