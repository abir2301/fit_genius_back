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
async function connect() {
  await connection
    .sync({ force: true })
    .authenticate()
    .then(() => {
      console.log("connection successfully ");
    })
    .catch((error) => {
      console.log("error while connecting  to db ");
      console.log(error);
    });
}
const db = {};

db.Sequelize = Sequelize;
db.sequelize = connection;

db.user = require("./user.js")(connection, Sequelize);
db.profile = require("./profile")(connection, Sequelize);
db.hp = require("./health_problems")(connection, Sequelize);
db.userHp = require("./user_health_problem")(connection, Sequelize);
db.userProgram = require("./user_program")(connection, Sequelize);
db.user.hasOne(db.profile, { onDelete: "CASCADE" });
db.profile.belongsTo(db.user, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.user.hasOne(db.userProgram, { onDelete: "CASCADE" });
db.userProgram.belongsTo(db.user, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.user.belongsToMany(db.hp, { through: db.userHp, onDelete: "CASCADE" });
db.hp.belongsToMany(db.user, { through: db.userHp, onDelete: "CASCADE" });

module.exports = db;
