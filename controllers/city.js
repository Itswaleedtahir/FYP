const { Cities } = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const cities = await Cities.findAll({
        where: {
          fk_country_id: req.country.id,
        },
      });
      return res.status(200).send({ cities });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
};
