const { OrganizationMembers } = require("../models");
module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { organization } = req;
    const organizationMember = await OrganizationMembers.findOne({
      where: {
        fk_user_id: user.id,
        fk_organization_id: organization.id,
      },
    });
    if (!organizationMember) {
      throw { status: 404, message: "Member does not exist!" };
    }
    req.organizationMember = organizationMember;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
