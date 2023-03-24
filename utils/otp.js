const moment = require("moment");
module.exports = {
  generateSixDigitsOTP: () => {
    return Math.floor(Math.random() * 1000000);
  },
  checkOtpExpiry: (check) => {
    return moment().unix() > check ? true : false;
  },
};
