const Blog = require("../../models/blog")

const postAddBlog = async (req, res) => {
    //Grabbing data from the form 
    const { title, category, imageUrl, imageAlt, show, slug, shortDescription, longDescription } = req.body

    const blog = await Blog.create({
        title: title,
        category: category,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
        slug: slug,
        shortDescription: shortDescription,
        longDescription: longDescription
    })

    if (blog) {
        res.status(202).json({ "message": "Blog was added successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! blog isn't added" })
    }
}

const getAllBlogs = async (req, res) => {
    const blog = await Blog.findAll()

    if (blog)
        return res.status(200).json(blog)

    return res.status(404).json({ "message": "Sorry! we didn't find any blog members." })
}

const getBlogById = async (req, res) => {

    const blogId = req.params.id

    const blog = await Blog.findOne({ where: { id: blogId } });
    if (blog === null) {
        res.status(404).json({ "message": "Oops! we didn't find the blog Member that you are looking for." })
    } else {
        res.status(202).json(blog)
    }

}

const editBlogById = async (req, res) => {

    //Blog member id
    const blogId = req.params.id

    //Grabbing data from the form 
    const { title, category, imageUrl, imageAlt, show, slug, shortDescription, longDescription } = req.body

    //finding the blog member in the database
    const blog = await Blog.findOne({ where: { id: blogId } })

    if (blog === null) {
        res.status(404).json({ "message": "Oops! we didn't find the blog member that you are looking for." })
    } else {
        //updating the database
        const update = await blog.update({
            title: title,
            category: category,
            imageUrl: imageUrl,
            imageAlt: imageAlt,
            show: show,
            slug: slug,
            shortDescription: shortDescription,
            longDescription: longDescription
        })

        //saving the updates into the database
        const saved = await update.save()

        if (saved === null) {
            res.status(500).json({ "message": "Sorry we couldn't update the database." })
        } else {
            res.status(202).json({ "message": "Database was updated sucessfully." })
        }
    }
}

const deleteBlogById = async (req, res) => {

    const blogId = req.params.id

    const deleted = await Blog.destroy({ where: { id: blogId } })

    if (deleted) {
        res.status(202).json({ "message": "Blog member was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such blog member was found or the Blog member was already deleted" })
    }
}

module.exports = {
    postAddBlog,
    getAllBlogs,
    getBlogById,
    editBlogById,
    deleteBlogById
}