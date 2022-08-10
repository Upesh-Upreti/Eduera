const { SubProducts } = require("../../models");

const getAllSubProducts = async (req, res) => {
    const parentId = req.params.id

    const subProduct = await SubProducts.findAll({ where: { parentId: parentId } });

    if (subProduct) return res.status(200).json(subProduct);
    return res
        .status(404)
        .json({ message: "Sorry! we didn't find any SubProducts" });
};

const getSubProductById = async (req, res) => {
    const subProductId = req.params.id;

    const subProduct = await SubProducts.findOne({ where: { id: subProductId } });
    if (subProduct === null) {
        res
            .status(404)
            .json({
                message: "Oops! we didn't find the SubProduct that you are looking for.",
            });
    } else {
        res.status(202).json(subProduct);
    }
};

module.exports = {
    getAllSubProducts,
    getSubProductById,
};
