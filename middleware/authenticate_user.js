const jwt = require("jsonwebtoken");
const { isNil, isNull } = require("lodash");
const config = require("../config");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.header("Authorization");
    if (!token) {
      if (isNil(req.header("Authorization"))) {
        throw { status: 400, message: "Authorization Header is required" };
      }
    }

    const decoded = jwt.verify(token, config.get("jwt_secret"));
    const user = await Users.findByPk(userId);
    if (isNull(user) || user.id !== decoded.user.id) {
      throw { status: 401, message: "Invalid Token" };
    }
    if (user.phone_number_verified === false) {
      throw { status: 401, message: "User is not verified" };
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
