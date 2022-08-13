const { SubProducts } = require("../../models");
const crypto = require("crypto")
const fs = require("fs");

const postAddSubProduct = async (req, res) => {
    const parentId = req.params.id

    //Grabbing data from the form
    const {
        title,
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
        req.file === null
    )
        return res.status(400).json({
            message:
                "Please atleast provide the title, image, short description and long description.",
        });

    const subProduct = await SubProducts.create({
        id: crypto.randomBytes(16).toString("hex"),
        title: title,
        parentId: parentId,
        price: price,
        imageUrl: req.file ? "images/" + req.file.filename : null,
        imageAlt: imageAlt,
        show: show,
        slug: slug,
        shortDescription: shortDescription,
        longDescription: longDescription,
    });

    if (subProduct) {
        res.status(202).json({ message: "SubProducts was created successfully." });
    } else {
        res.status(500).json({ message: "Sorry! subProduct isn't created" });
    }
};

const editSubProductById = async (req, res) => {
    //subProduct id
    const subProductId = req.params.id;

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

    //finding the subProduct in the database
    const subProduct = await SubProducts.findOne({ where: { id: subProductId } });

    if (subProduct === null) {
        return res.status(404).json({
            message: "Oops! we didn't find the subProduct that you are looking for.",
        });
    } else {
        //to delete the previously existing image, if exists
        const path = "public/" + subProduct.imageUrl;
        if (req.file) {
            try {
                fs.unlinkSync(path);
                //file removed
            } catch (err) { }
        }
        //updating the database
        const update = await subProduct.update({
            title: title,
            category: category,
            price: price,
            imageUrl: req.file ? "images/" + req.file.filename : subProduct.imageUrl,
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

const deleteSubProductById = async (req, res) => {
    const subProductId = req.params.id;

    const subProduct = await SubProducts.findOne({ where: { id: subProductId } });

    if (!subProduct)
        return res.status(400).json({ message: "Sorry! no such subProduct found." });

    const path = "public/" + subProduct.imageUrl;
    console.log("Deleting the previously existing image at " + path);

    try {
        fs.unlinkSync(path);
        //file removed
    } catch (err) { }


    const deleted = await SubProducts.destroy({ where: { id: subProductId } });

    if (deleted) {
        res.status(202).json({ message: "SubProducts was deleted successfully." });
    } else {
        res.status(400).json({
            message: "No such subProduct was found or the subProduct was already deleted",
        });
    }
};

module.exports = {
    postAddSubProduct,
    editSubProductById,
    deleteSubProductById,
};
