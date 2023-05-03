const healthProblem = (sequelize, Sequelize) => {
  const Hp = sequelize.define(
    "Hp",
    {
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        //  validate: {
        //    allowNull: {
        //      msg: "health problem name must be not nul ",
        //    },
        //  },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: {
            args: [["allergies", "diseases", "deficiencies"]],
            msg: "please verify hp type  ",
          },
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Hp;
};
module.exports = healthProblem;
