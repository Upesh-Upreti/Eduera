const { Career } = require("../../models")
const fs = require("fs")

const postAddCareer = async (req, res) => {
    //Grabbing data from the form 
    const { title, jobType, imageAlt, show, shortDescription, longDescription } = req.body
    //to avoid the error
    if (title === undefined || longDescription === undefined)
        return res.status(401).json({ "message": "Please atleast provide the title and long description." })

    const career = await Career.create({
        title: title,
        jobType: jobType,
        imageUrl: req.file.filename,
        imageAlt: imageAlt,
        show: show,
        shortDescription: shortDescription,
        longDescription: longDescription
    })

    if (career) {
        res.status(202).json({ "message": "Career was added successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! career isn't added" })
    }
}

const getAllCareers = async (req, res) => {
    const career = await Career.findAll()

    if (career)
        return res.status(200).json(career)

    return res.status(404).json({ "message": "Sorry! we didn't find any career ." })
}

const getCareerById = async (req, res) => {

    const careerId = req.params.id

    const career = await Career.findOne({ where: { id: careerId } });
    if (career === null) {
        res.status(404).json({ "message": "Oops! we didn't find the career Member that you are looking for." })
    } else {
        res.status(202).json(career)
    }

}

const editCareerById = async (req, res) => {

    //Career  id
    const careerId = req.params.id

    //Grabbing data from the form 
    const { title, jobType, imageAlt, show, shortDescription, longDescription } = req.body

    //to avoid the error
    if (title === undefined || shortDescription === undefined || longDescription === undefined)
        return res.status(401).json({ "message": "Please atleast provide the title, short description and long descriptio." })

    //finding the career  in the database
    const career = await Career.findOne({ where: { id: careerId } })

    if (career === null) {
        res.status(404).json({ "message": "Oops! we didn't find the career  that you are looking for." })
    } else {

        //to delete the previously existing image, if exists
        if (career.imageUrl) {

            const path = "public/images/" + career.imageUrl

            console.log("Deleting the previously existing image at " + path);

            try {
                fs.unlinkSync(path)
                //file removed
            } catch (err) {

            }
        }

        //updating the database
        const update = await career.update({
            title: title,
            jobType: jobType,
            imageUrl: req.file.filename,
            imageAlt: imageAlt,
            show: show,
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

const deleteCareerById = async (req, res) => {

    const careerId = req.params.id

    const career = await Career.findOne({ where: { id: careerId } })

    //to delete the previously existing image, if exists
    if (career.imageUrl) {

        const path = "public/images/" + career.imageUrl

        console.log("Deleting the previously existing image at " + path);

        try {
            fs.unlinkSync(path)
            //file removed
        } catch (err) {

        }
    }

    const deleted = await Career.destroy({ where: { id: careerId } })

    if (deleted) {
        res.status(202).json({ "message": "Career  was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such career  was found or the Career  was already deleted" })
    }
}

module.exports = {
    postAddCareer,
    getAllCareers,
    getCareerById,
    editCareerById,
    deleteCareerById
}