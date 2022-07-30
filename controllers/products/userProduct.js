const { Product } = require("../../models")

const postAddProduct = async (req, res) => {
    //Grabbing data from the form 
    const { title, category, price, imageUrl, imageAlt, show, slug, shortDescription, longDescription } = req.body

    //to avoid the error
    if (title === undefined || shortDescription === undefined || longDescription === undefined)
        return res.status(401).json({ "message": "Please atleast provide the title, short description and long descriptio." })

    const product = await Product.create({
        title: title,
        category: category,
        price: price,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
        slug: slug,
        shortDescription: shortDescription,
        longDescription: longDescription
    })

    if (product) {
        res.status(202).json({ "message": "Product was created successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! product isn't created" })
    }
}

const getAllProducts = async (req, res) => {
    const products = await Product.findAll()

    if (products)
        return res.status(200).json(products)

    return res.status(404).json({ "message": "Sorry! we didn't find any products." })
}

const getProductById = async (req, res) => {

    const productId = req.params.id

    const product = await Product.findOne({ where: { id: productId } });
    if (product === null) {
        res.status(404).json({ "message": "Oops! we didn't find the product that you are looking for." })
    } else {
        res.status(202).json(product)
    }

}

const editProductById = async (req, res) => {

    //product id
    const productId = req.params.id

    console.log(productId);

    //Grabbing data from the form 
    const { title, category, price, imageUrl, imageAlt, show, slug, shortDescription, longDescription } = req.body

    //to avoid the error
    if (title === undefined || shortDescription === undefined || longDescription === undefined)
        return res.status(401).json({ "message": "Please atleast provide the title, short description and long descriptio." })

    //finding the product in the database
    const product = await Product.findOne({ where: { id: productId } })

    if (product === null) {
        res.status(404).json({ "message": "Oops! we didn't find the product that you are looking for." })
    } else {
        //updating the database
        const update = await product.update({
            title: title,
            category: category,
            price: price,
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

const deleteProductById = async (req, res) => {

    const productId = req.params.id

    const deleted = await Product.destroy({ where: { id: productId } })

    if (deleted) {
        res.status(202).json({ "message": "Product was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such product was found or the product was already deleted" })
    }
}

module.exports = {
    postAddProduct,
    getAllProducts,
    getProductById,
    editProductById,
    deleteProductById
}