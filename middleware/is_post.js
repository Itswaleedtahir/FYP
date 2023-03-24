const { Posts } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findByPk(postId);
    if (!post) {
      throw { status: 404, message: "Post does not exist..." };
    }
    req.post = post;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
