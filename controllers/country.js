const { Countries } = require("../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const countries = await Countries.findAll();
      return res.status(200).send({ countries });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong");
    }
  },
};
