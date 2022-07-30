const { Testimony } = require("../../models")

const postAddTestimony = async (req, res) => {
    //Grabbing data from the form 
    const { name, designation, imageUrl, imageAlt, show, testimony } = req.body

    //to avoid the error
    if (name === undefined || designation === undefined || imageUrl === undefined || testimony === undefined)
        return res.status(401).json({ "message": "Please atleast provide the name, designation, imageUrl and testimony." })

    const testimonial = await Testimony.create({
        name: name,
        designation: designation,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
        testimony: testimony
    })

    if (testimonial) {
        res.status(202).json({ "message": "Testimony  was added successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! testimonial  isn't added" })
    }
}

const getAllTestimonies = async (req, res) => {
    const testimonial = await Testimony.findAll()

    if (testimonial)
        return res.status(200).json(testimonial)

    return res.status(404).json({ "message": "Sorry! we didn't find any testimonial ." })
}

const editTestimonyById = async (req, res) => {

    //Testimony  id
    const testimonyId = req.params.id

    //Grabbing data from the form 
    const { name, designation, imageUrl, imageAlt, show, testimony } = req.body

    //to avoid the error
    if (name === undefined || designation === undefined || imageUrl === undefined || testimony === undefined)
        return res.status(401).json({ "message": "Please atleast provide the name, designation, imageUrl and testimony." })

    //finding the testimonial  in the database
    const testimonial = await Testimony.findOne({ where: { id: testimonyId } })

    if (testimonial === null) {
        res.status(404).json({ "message": "Oops! we didn't find the testimonial  that you are looking for." })
    } else {
        //updating the database
        const update = await testimonial.update({
            name: name,
            imageUrl: imageUrl,
            imageAlt: imageAlt,
            show: show,
            testimony: testimony
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

const deleteTestimonyById = async (req, res) => {

    const testimonyId = req.params.id

    const deleted = await Testimony.destroy({ where: { id: testimonyId } })

    if (deleted) {
        res.status(202).json({ "message": "Testimony  was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such testimonial  was found or the Testimony  was already deleted" })
    }
}

module.exports = {
    postAddTestimony,
    getAllTestimonies,
    editTestimonyById,
    deleteTestimonyById
}