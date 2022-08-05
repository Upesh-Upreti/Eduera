const jwt_decode = require("jwt-decode")
const isAdmin = async (req, res, next) => {
    let token = req.cookies.token

    const payLoad = jwt_decode(token)

    if (payLoad.role !== "admin")
        return res.status(401).json({ "message": "Sorry! you are not an admin." })

    next()
}

module.exports = {
    isAdmin
}