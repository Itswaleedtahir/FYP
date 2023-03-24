const convict = require("convict");

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: String,
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: Number,
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  jwt_secret: {
    doc: "JWT secret key",
    format: String,
    default: "",
    env: "JWT_SECRET",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
      env: "DB_NAME",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
      env: "DB_USERNAME",
    },
    password: {
      doc: "db password",
      format: String,
      default: null,
      env: "DB_PASSWORD",
    },
  },
});

// Load environment dependent configuration
let env = config.get("env");
if (env === "development") {
  config.loadFile(__dirname + "/environments/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
