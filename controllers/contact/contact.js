const { Contact } = require("../../models")

const postAddContact = async (req, res) => {
    //Grabbing data from the form 
    const { fullName, email, contactNumber, message } = req.body

    //to avoid the error
    if (fullName === undefined || email === undefined || contactNumber === undefined || message === undefined)
        return res.status(401).json({ "message": "Please atleast provide the fullname, email, contactNumber and message." })

    const contact = await Contact.create({
        fullName: fullName,
        email: email,
        contactNumber: contactNumber,
        message: message,
    })

    if (contact) {
        res.status(202).json({ "message": "Contact message was sent successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! Contact message isn't added" })
    }
}

const getAllContacts = async (req, res) => {
    const contact = await Contact.findAll()

    if (contact)
        return res.status(200).json(contact)

    return res.status(404).json({ "message": "Sorry! we didn't find any contact us ." })
}

const getContactById = async (req, res) => {
    const contact = await Contact.findAll()

    if (contact)
        return res.status(200).json(contact)

    return res.status(404).json({ "message": "Sorry! we didn't find any contact ." })
}

const deleteContactById = async (req, res) => {

    const contactId = req.params.id

    const deleted = await Contact.destroy({ where: { id: contactId } })

    if (deleted) {
        res.status(202).json({ "message": "Contact  was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such contact us was found or the Contact us was already deleted" })
    }
}

module.exports = {
    postAddContact,
    getAllContacts,
    getContactById,
    deleteContactById
}