const { Account } = require("../../models/");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await Account.findOne({
    where: { email: email.toLowerCase() },
  });

  if (foundUser === null)
    return res
      .status(401)
      .json({ message: "Sorry! invalid email or password." });

  if (!compareSync(password, foundUser.password))
    return res
      .status(401)
      .json({ message: "Sorry! invalid email or password." });

  const jsonToken = sign(
    {
      id: foundUser.id,
      name: foundUser.name,
      role: foundUser.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", jsonToken, {
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
    sameSite: "None",
  });

  res.status(200).json({ message: "Login was sucessful", token: jsonToken });
};

const deleteLogout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() - 86400000),
    httpOnly: true,
    sameSite: "None",
  });
  res.status(202).json({ message: "Logout was sucessful" });
};

module.exports = {
  postLogin,
  deleteLogout,
};
