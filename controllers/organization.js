const {
  Organizations,
  OrganizationMembers,
  Users,
  sequelize,
} = require("../models");

module.exports = {
  create: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { name, registrationNum, imageUrl } = req.body;
      if (!name) {
        throw { status: 400, message: "Required fields cannot be empty." };
      }
      const organizationFound = await Organizations.findOne({
        where: {
          name: name,
        },
        transaction,
      });
      if (organizationFound) {
        throw { status: 409, message: "Organization already exists." };
      }
      let organization = await Organizations.create(
        {
          name,
          registration_no: registrationNum,
          image_url: imageUrl,
        },
        {
          transaction,
        }
      );
      await transaction.commit();
      res.status(200).send({ organization });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  addMember: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { memberId } = req.query;
      const { role, joiningDate } = req.body;
      const { organization } = req;
      let organizationMember = await Users.findByPk(memberId);
      if (!organizationMember) {
        throw { status: 409, message: "Member does not registered as a User." };
      }
      if (!role) {
        throw { status: 400, message: "Required fields cannot be empty!" };
      }
      const roles = await OrganizationMembers.rawAttributes.role.values;
      if (!roles.includes(role)) {
        throw { status: 409, message: "Invalid Role." };
      }
      organizationMember = await OrganizationMembers.create({
        role,
        joining_date: joiningDate ? joiningDate : null,
        fk_user_id: memberId,
        fk_organization_id: organization.id,
      });
      await transaction.commit();
      return res.status(200).send({ organizationMember });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
