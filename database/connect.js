const mongoose = require("mongoose");

function connect() {
  const dbURL = process.env.DB_URL;

  return mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Database error", error);
      process.exit(1);
    });
}
module.exports = connect;
