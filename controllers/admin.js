const { Admins, AdminOtps, sequelize } = require("../models");
const { generateSixDigitsOTP, checkOtpExpiry } = require("../utils/otp");
const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = {
  logIn: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        throw { status: 400, message: "Phone Number is required!" };
      }
      const admin = await Admins.findOne({
        where: {
          phone_number: phoneNumber,
        },
        transaction,
      });
      if (!admin) {
        throw { status: 400, message: "Phone Number does not exist" };
      }
      const otp = generateSixDigitsOTP();
      const adminOtp = await AdminOtps.create(
        {
          otp,
          fk_admin_id: admin.id,
        },
        { transaction, individualHooks: true }
      );
      await transaction.commit();
      return res.status(200).send({ admin, adminOtp });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong");
    }
  },
  verifyOtp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { admin } = req;
      const { otp } = req.body;
      if (otp.toString().length != 6) {
        throw { status: 400, message: "OTP must be a 6 digits number" };
      }
      const verifyOtp = await AdminOtps.findOne({
        where: {
          otp,
          fk_admin_id: admin.id,
        },
        order: [["createdAt", "DESC"]],
        transaction,
      });
      if (!verifyOtp) {
        throw { status: 400, message: "Invalid OTP" };
      }
      if (checkOtpExpiry(verifyOtp.expiry)) {
        throw { status: 403, message: "OTP is expired." };
      }
      const token = jwt.sign({ admin }, config.get("jwt_secret"));
      await transaction.commit();
      return res.status(200).send({ admin, token });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong");
    }
  },
};
