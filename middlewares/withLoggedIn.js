const { verify } = require("jsonwebtoken");

const withLoggedIn = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token)
    return res
      .status(201)
      .json({ message: "Access denied! you are an unauthorized user" });
  verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    console.log(error);
    if (error)
      return res
        .status(201)
        .json({ message: "Access denied! you are an unauthorized user" });

    next();
  });
};

module.exports = withLoggedIn;
