const Sequelize = require("sequelize");
require("dotenv").config();
const connection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  }
);
async function connect(){
  await connection
   .authenticate()
   .then(() => {
     console.log("connection successfully ");
   })
   .catch((error) => {
     console.log("error while connecting  to db ");
     console.log(error);
   });
}
module.exports={connect , connection}
