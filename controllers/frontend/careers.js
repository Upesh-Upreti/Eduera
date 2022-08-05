const { Career } = require("../../models");

const getAllCareers = async (req, res) => {
  const career = await Career.findAll();

  if (career) return res.status(200).json(career);

  return res
    .status(404)
    .json({ message: "Sorry! we didn't find any career ." });
};

const getCareerById = async (req, res) => {
  const careerId = req.params.id;

  const career = await Career.findOne({ where: { id: careerId } });
  if (career === null) {
    res
      .status(404)
      .json({
        message:
          "Oops! we didn't find the career Member that you are looking for.",
      });
  } else {
    res.status(202).json(career);
  }
};

module.exports = {
  getAllCareers,
  getCareerById,
};
