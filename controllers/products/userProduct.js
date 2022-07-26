const Product = require("../../models/product")

const getAllProducts = async (req, res) => {
    const products = await Product.findAll()
    res.status(200).json(products)
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

module.exports = {
    getAllProducts,
    getProductById,
}