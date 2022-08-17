const jwt_decode = require("jwt-decode");
const withAdmin = async (req, res, next) => {
  let token = req.headers['token'];

  const payLoad = jwt_decode(token);

  if (payLoad.role !== "admin")
    return res.status(401).json({ message: "Sorry! you are not an admin." });

  next();
};

module.exports = withAdmin;
