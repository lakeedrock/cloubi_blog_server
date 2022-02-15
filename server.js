const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./database/connect");
const dotenv = require("dotenv");

// Load ENV vars
dotenv.config({ path: "./config/config.env" });

// Route files
const routes = require("./routes/routes");

// Initialize Express App
const app = express();

// Using middlewares
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", routes);

// Start Express Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
  connect();
});

// Handle unhandle rejection
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error : ${error.message}`);
  // Colse server & exit process
  server.close(() => {
    process.exit(1);
  });
});
