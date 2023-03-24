const { Admins } = require("../models");
module.exports = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const admin = await Admins.findByPk(adminId);
    if (!admin) {
      throw { status: 404, message: "Admin does not exist..." };
    }
    req.admin = admin;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
