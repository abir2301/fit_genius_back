module.exports = (sequelize, Sequelize) => {
  const UserHp = sequelize.define(
    "userHp",
    {},
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return UserHp;
};
