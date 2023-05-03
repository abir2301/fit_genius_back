const userProgram = (sequelize, Sequelize) => {
  const UserProgram = sequelize.define(
    "userProgram",
    {
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      result: {
        type: Sequelize.FLOAT,

        allowNull: true,
      },
      objectif: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      programId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return UserProgram;
};
module.exports = userProgram;
