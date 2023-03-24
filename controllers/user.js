const { Users, UserOtps, Cities, sequelize } = require("../models");
const { generateSixDigitsOTP, checkOtpExpiry } = require("../utils/otp");
const { isNil } = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  signUp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { cityId } = req.query;
      if (!cityId) {
        throw { status: 400, message: "City ID is required" };
      }
      const city = await Cities.findByPk(cityId, {
        transaction,
      });
      if (!city) {
        throw { status: 409, message: "City does not exist" };
      }
      const { name, phoneNumber } = req.body;
      if (!name || !phoneNumber) {
        throw { status: 400, message: "Required fields cannot be empty." };
      }
      const phoneNumberFound = await Users.findOne({
        where: {
          phone_number: phoneNumber,
        },
        transaction,
      });
      if (phoneNumberFound) {
        throw { status: 409, message: "Phone Number already exists." };
      }
      let user = await Users.create(
        {
          name,
          phone_number: phoneNumber,
          fk_city_id: cityId,
        },
        {
          transaction,
        }
      );
      const otp = generateSixDigitsOTP();
      const userOtp = await UserOtps.create(
        {
          otp,
          fk_user_id: user.id,
        },
        { individualHooks: true, transaction }
      );
      await transaction.commit();
      res.status(200).send({ user, userOtp });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  logIn: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        throw { status: 400, message: "Phone Number cannot be empty." };
      }
      let user = await Users.findOne({
        where: { phone_number: phoneNumber },
        transaction,
      });
      if (!user) {
        throw { status: 404, message: "Phone number does not exist." };
      }
      const otp = generateSixDigitsOTP();
      const userOtp = await UserOtps.create(
        {
          otp,
          fk_user_id: user.id,
        },
        { individualHooks: true, transaction }
      );
      await transaction.commit();
      res.status(200).send({ userOtp, user });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  update: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        name,
        phoneNumber,
        email,
        dob,
        bloodGroup,
        gender,
        cityId,
        available,
        lat,
        lng,
        address,
        imageUrl,
      } = req.body;
      const { user } = req;
      if (cityId) {
        const city = await Cities.findByPk(cityId, { transaction });
        if (!city) {
          throw { status: 400, message: "Invalid city ID" };
        }
      }
      let checkEmail = await Users.findOne({
        where: {
          email,
        },
        transaction,
      });
      if (checkEmail) {
        throw { error: 409, message: "Email already exists" };
      }
      let updatedUser = await user.update(
        {
          name: name ? name : user.name,
          phone_number: phoneNumber ? phoneNumber : user.phone_number,
          dob: dob ? dob : user.dob,
          blood_group: bloodGroup ? bloodGroup : user.blood_group,
          gender: gender ? gender : user.gender,
          fk_city_id: cityId ? cityId : user.fk_city_id,
          available: isNil(available) ? user.available : available,
          lat: lat ? lat : user.lat,
          lng: lng ? lng : user.lng,
          address: address ? address : user.address,
          image_url: imageUrl ? imageUrl : user.image_url,
        },
        { transaction }
      );
      if (!user.email) {
        updatedUser = await updatedUser.update(
          {
            email: email ? email : user.email,
          },
          { transaction }
        );
      }
      await transaction.commit();
      res.status(200).send({
        updatedUser,
      });
    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  verifyOtp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      let { user } = req;
      const { otp } = req.body;
      if (otp.toString().length != 6) {
        throw { error: 400, message: "OTP must be a 6 digits number." };
      }
      const verifyOtp = await UserOtps.findOne({
        where: {
          otp,
          fk_user_id: user.id,
        },
        order: [["createdAt", "DESC"]],
        transaction,
      });
      if (!verifyOtp) {
        throw { status: 409, message: "Invalid OTP" };
      }
      if (checkOtpExpiry(verifyOtp.expiry)) {
        throw { status: 403, message: "OTP is expired." };
      }
      if (user.phone_number_verified === false) {
        user = await user.update(
          {
            phone_number_verified: true,
          },
          { transaction }
        );
      }
      const token = jwt.sign({ user }, config.get("jwt_secret"));
      await transaction.commit();
      res.status(200).send({ token, user });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  resendOtp: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = req;
      const otp = generateSixDigitsOTP();
      const userOtp = await UserOtps.create(
        {
          otp,
          fk_user_id: user.id,
        },
        { individualHooks: true, transaction }
      );
      await transaction.commit();
      res.status(200).send({ userOtp, user });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  changeAvailability: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = req;
      const { availability } = req.body;
      let updatedUser = await user.update(
        {
          available: isNil(availability) ? user.available : availability,
        },
        {
          transaction,
        }
      );
      await transaction.commit();
      res.status(200).send({ updatedUser });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "something went wrong!");
    }
  },
};
