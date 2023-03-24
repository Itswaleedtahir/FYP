const { Organizations } = require("../models");
module.exports = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const organization = await Organizations.findByPk(organizationId);
    if (!organization) {
      throw { status: 404, message: "Organization does not exist..." };
    }
    req.organization = organization;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
