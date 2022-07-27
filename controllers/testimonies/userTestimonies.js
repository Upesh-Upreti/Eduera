const Testimony = require("../../models/testimony")

const getAllTestimonies = async (req, res) => {
    const testimonial = await Testimony.findAll()

    if (testimonial)
        return res.status(200).json(testimonial)

    return res.status(404).json({ "message": "Sorry! we didn't find any testimonial." })
}

module.exports = {
    getAllTestimonies,
}