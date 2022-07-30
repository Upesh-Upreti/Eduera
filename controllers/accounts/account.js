const { Account } = require("../../models/")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

const postLogin = async (req, res) => {
    const { email, password } = req.body

    const foundUser = await Account.findOne({ where: { email: email.toLowerCase() } })

    if (foundUser === null)
        return res.status(401).json({ "message": "Sorry! invalid email or password." })

    if (!compareSync(password, foundUser.password))
        return res.status(401).json({ "message": "Sorry! invalid email or password." })

    const jsonToken = sign({
        "id": foundUser.id,
        "name": foundUser.name,
        "role": foundUser.role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h"
    })

    console.log(jsonToken);

    res.cookie("token", jsonToken, { expires: new Date(Date.now() + 86400000), httpOnly: true })

    res.status(200).json({ "message": "Login was sucessful" })
}

const deleteLogout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(Date.now() - 86400000), httpOnly: true })
    res.status(202).json({ "message": "Logout was sucessful" })
}

const postAddAccount = async (req, res) => {

    //Grabbing data from the form 
    const { name, email, imageUrl, imageAlt, show, role, password } = req.body

    //to avoid the error
    if (name === undefined || role === undefined || password === undefined)
        return res.status(401).json({ "message": "Please atleast provide the name, email, role and password." })

    const findAccount = await Account.findOne({ where: { email: email } });

    if (findAccount)
        return res.status(401).json({ "message": "Oops! a user already exists with that email address" })

    //Generting salt for password
    const salt = genSaltSync(10)


    if (password.length < 8)
        return res.status(401).json({ "message": "Please provide the password with atleast of 8 characters." })

    const account = await Account.create({
        name: name,
        email: email.toLowerCase(),
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
        role: role,
        password: hashSync(password, salt),
    })

    if (account) {
        res.status(202).json({ "message": "account was added successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! account isn't added" })
    }
}

const getAllAccounts = async (req, res) => {
    let accounts = await Account.findAll()

    if (!accounts || accounts.length === 0)
        return res.status(404).json({ "message": "Sorry! we didn't find any account members." })

    //To not to send the hashed password
    // accounts = accounts.filter((account) => Object.fromEntries(Object.entries(account).filter(([key]) => key.includes('password')));)

    res.status(202).json(accounts)

}

const getAccountById = async (req, res) => {

    const accountId = req.params.id

    let account = await Account.findOne({ where: { id: accountId } });

    if (account === null) {
        res.status(404).json({ "message": "Oops! we didn't find the account Member that you are looking for." })
    } else {
        //To not to send the hashed password
        //account.filter((acc) => Object.fromEntries(Object.entries(acc).filter(([key]) => key.includes('password')));)
        res.status(202).json(account)
    }

}

const editAccountById = async (req, res) => {

    const accountId = req.params.id

    //Grabbing data from the form 
    const { name, imageUrl, imageAlt, show, role } = req.body

    //to avoid the error
    if (name === undefined || role === undefined)
        return res.status(401).json({ "message": "Please atleast provide the name, role and password." })

    //finding the account in the database
    const account = await Account.findOne({ where: { id: accountId } })

    if (account === null) {
        res.status(404).json({ "message": "Oops! we didn't find the account member that you are looking for." })
    } else {
        //updating the database
        const update = await account.update({
            name: name,
            imageUrl: imageUrl,
            imageAlt: imageAlt,
            show: show,
            role: role,
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

const deleteAccountById = async (req, res) => {

    const accountId = req.params.id

    const deleted = await Account.destroy({ where: { id: accountId } })

    if (deleted) {
        res.status(202).json({ "message": "account member was deleted successfully." })
    } else {
        res.status(404).json({ "message": "No such account member was found or the account member was already deleted" })
    }
}

const changePassword = async (req, res) => {

    const token = req.cookies.token

    const accountId = jwt_decode(token).id

    //Grabbing data from the form 
    const { currentPassword, newPassword } = req.body

    //to avoid the error
    if (currentPassword === undefined || newPassword === undefined)
        return res.status(400).json({ "message": "Please provide the current passord and new password." })

    if (newPassword.length < 8)
        return res.status(400).json({ "message": "Please provide the password with atleast of 8 characters." })

    const findAccount = await Account.findOne({ where: { id: accountId } });

    if (!findAccount)
        return res.status(404).json({ "message": "Oops! your credentials don't match." })

    if (!compareSync(currentPassword, findAccount.password))
        return res.status(401).json({ "message": "Sorry! incorrect password." })

    //Generting salt for password
    const salt = genSaltSync(10)

    const updatedAccount = await findAccount.update({
        password: hashSync(newPassword, salt),
    })

    if (updatedAccount) {
        res.status(202).json({ "message": "Password change was successfully." })
    } else {
        res.status(500).json({ "message": "Sorry! password change was unsuccessful. please try again." })
    }


}

const editAccountDetails = async (req, res) => {

    const token = req.cookies.token

    if (!token)
        return res.status(201).json({ "message": "Sorry! you are not authorized to perform the task." })

    const accountId = jwt_decode(token).id

    //Grabbing data from the form 
    const { name, imageUrl, imageAlt, show } = req.body

    //to avoid the error
    if (name === undefined)
        return res.status(401).json({ "message": "Please atleast provide the name, role and password." })


    const findAccount = await Account.findOne({ where: { id: accountId } });

    if (findAccount === null)
        return res.status(401).json({ "message": "Oops! no such user found with that email address" })

    //updating the database
    const update = await account.update({
        name: name,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        show: show,
    })

    //saving the updates into the database
    const saved = await update.save()

    if (saved === null) {
        res.status(500).json({ "message": "Sorry we couldn't update the database." })
    } else {
        res.status(202).json({ "message": "Database was updated sucessfully." })
    }
}

const resetPassword = async (req, res) => {

    const accountId = req.params.id

    //Grabbing data from the form 
    const { password } = req.body

    //to avoid the error
    if (password === undefined || password.length < 8)
        return res.status(401).json({ "message": "Please atleast provide the password with atleast 8 characters." })

    const findAccount = await Account.findOne({ where: { id: accountId } });

    if (findAccount === null) {
        res.status(404).json({ "message": "Oops! we didn't find the account member that you are looking for." })
    } else {
        //Generting salt for password
        const salt = genSaltSync(10)

        //updating the database
        const update = await findAccount.update({
            password: hashSync(password, salt),
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

module.exports = {
    postAddAccount,
    getAllAccounts,
    getAccountById,
    editAccountById,
    deleteAccountById,
    postLogin,
    deleteLogout,
    changePassword,
    editAccountDetails,
    resetPassword
}