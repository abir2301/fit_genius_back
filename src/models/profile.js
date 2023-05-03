const profile = (sequelize, Sequelize) => {
  const Profile = sequelize.define(
    "profile",
    {
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        //  type: Sequelize.STRING,
        allowNull: true,
        // validate: {
        //   isIn: {
        //     args: [["female", "male"]],
        //     msg: "gender  value must be female or male ",
        //   },
        // },
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
        isNumeric: true,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true,
        isNumeric: true,
      },
      // diet_type: {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      //   validate: {
      //     isIn: {
      //       msg: " please verify goal input value ",
      //       args: ["normal", "vegan", "vegitarian"],
      //     },
      //   },
      // },
      activity_level: {
        type: Sequelize.TEXT,
        type: Sequelize.ENUM(
          "sedentary",
          "lightly active",
          "moderately active",
          "very active",
          "extra active"
        ),

        allowNull: true,
        // validate: {
        //   isIn: {
        //     msg: " please verify activity level  input value ",
        //     args: [
        //       "sedentary",
        //       "lightly-active",
        //       "moderately active",
        //       "very active",
        //       "extra active",
        //     ],
        //   },
        // },
      },
      goal: {
        type: Sequelize.ENUM("lose weight", "maintain weight", "gain weight"),
        allowNull: true,
        // validate: {
        //   isIn: {
        //     msg: " please verify goal input value ",
        //     args: ["lose weight", "maintain weight", "gain weight"],
        //   },
        // },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Profile;
};
module.exports = profile;
