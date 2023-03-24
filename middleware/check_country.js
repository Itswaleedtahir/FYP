const { Countries } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { countryId } = req.params;
    const country = await Countries.findByPk(countryId);
    if (!country) {
      throw { status: 409, message: "Country doesn't exist" };
    }
    req.country = country;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
