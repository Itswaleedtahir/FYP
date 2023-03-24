module.exports = async (req, res, next) => {
  try {
    const { organizationMember } = req;
    if (organizationMember.role !== "Head") {
      throw {
        status: 409,
        message: "Only Head of Organization can add Members!",
      };
    }
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
