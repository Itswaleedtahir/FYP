module.exports = async (req, res, next) => {
  try {
    const { post } = req;
    if (post.fk_user_id !== req.user.id) {
      throw { status: 409, message: "Post does not belong to user." };
    }
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
