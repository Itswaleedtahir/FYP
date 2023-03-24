const { sequelize } = require("../models");
const { Posts, AssignedPosts } = require("../models");
const { Users } = require("../models");
const { isNil } = require("lodash");

module.exports = {
  create: async (req, res) => {
    try {
      const {
        patientName,
        attendantContact,
        description,
        bloodGroup,
        numOfBags,
        exchangePossible,
        location,
        lat,
        lng,
        patientAge,
        attendentName,
        transportAvailability,
        timeLimit,
      } = req.body;

      if (
        !patientName ||
        !attendantContact ||
        !bloodGroup ||
        !numOfBags ||
        isNil(exchangePossible) ||
        !location ||
        !patientAge ||
        !attendentName ||
        isNil(transportAvailability) ||
        !timeLimit
      ) {
        throw { status: 400, message: "Required Fields can not be empty." };
      }
      const bloodGroups = await Posts.rawAttributes.blood_group.values;
      if (!bloodGroups.includes(bloodGroup)) {
        throw { status: 409, message: "Invalid blood group." };
      }
      const timeLimitCheck = await Posts.rawAttributes.time_limit.values;
      if (!timeLimitCheck.includes(timeLimit)) {
        throw { status: 409, message: "Invalid time limit." };
      }
      const post = await Posts.create({
        patient_name: patientName,
        attendant_contact: attendantContact,
        description,
        blood_group: bloodGroup,
        number_of_bags: numOfBags,
        exchange_possible: exchangePossible,
        location,
        lat,
        lng,
        fk_user_id: req.user.id,
        patient_age: patientAge,
        attendant_name: attendentName,
        transport_availability: transportAvailability,
        time_limit: timeLimit,
      });

      res.status(200).send({ post });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  getPending: async (req, res) => {
    try {
      const posts = await Posts.findAll({
        where: {
          status: "Pending",
          verified: true,
        },
        include: {
          model: Users,
          as: "user",
        },
      });
      res.status(200).send({ posts });
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || 500)
        .send(error.message || "Something went wrong...");
    }
  },
  changeStatus: async (req, res) => {
    const transaction = sequelize.transaction();
    try {
      let { post } = req;
      const { status } = req.body;
      const statuses = await Posts.rawAttributes.status.values;
      if (!statuses.includes(status)) {
        throw { status: 409, message: "Invalid Status" };
      }
      post = await post.update(
        {
          status,
        },
        { transaction }
      );
      res.status(200).send({ post });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "something went wrong....");
    }
  },
  donate: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { user } = req;
      const { post } = req;
      if (post.status !== "Pending") {
        throw { status: 409, message: "Status is not Pending" };
      }
      const postFound = await AssignedPosts.findOne({
        where: {
          fk_post_id: post.id,
          archived: false,
        },
        transaction,
      });
      if (postFound) {
        throw { status: 404, message: "Post already assigned to other user" };
      }
      let changeStatus = await post.update({
        status: "Confirmed",
      });
      const assignPost = await AssignedPosts.create(
        {
          fk_user_id: user.id,
          fk_post_id: post.id,
        },
        { transaction }
      );
      await transaction.commit();
      res.status(200).send({ changeStatus, assignPost });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "something went wrong....");
    }
  },
};
