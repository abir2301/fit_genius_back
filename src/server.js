const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./config/connection");
const db = require("./models");
require("dotenv").config();
const users = require("./routes/user");
const profiles = require("./routes/profile.route");
const healthProblem = require("./routes/hp.route");
const plan = require("./routes/plan.route");
const os = require("os");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// mongoose.connect("mongodb://localhost/mini_projet", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db1 = mongoose.connection;
// db1.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose
  .connect("mongodb://localhost/fitness_app")

  .then(() => {
    console.log("program db is connected  ");
  })
  .catch((error) => {
    console.log("error connecting to program mongoDB:", error.message);
  });
dbConnection.connect();
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.get("/", (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const interfaces = Object.values(networkInterfaces);
  let ipAddress = "";

  // interfaces.forEach((interfaceArray) => {
  //   interfaceArray.forEach((networkInterface) => {
  //     if (networkInterface.family === "IPv4" && !networkInterface.internal) {
  //       ipAddress = networkInterface.address;
  //       console.log(ipAddress);
  //     }
  //   });
  // });

  res.send("heyy appiii");
});
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/hp", healthProblem);
app.use("/api/plans", plan);
const port = process.env.PORT ? process.env.PORT : 3000;

const ipAddress = process.env.IP_ADDRESS || "0.0.0.0";

app.listen(port, ipAddress, () => {
  console.log("app run on port ", port, "address ", ipAddress);
});
