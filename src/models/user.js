// const { default: isEmail } = require("validator/lib/isEmail")
const bcrypt = require("bcrypt");
const user = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      name: {
        type: Sequelize.STRING,
        validate: {
          len: {
            args: [4, 20],
            msg: "Username must be between 4 and 20 characters ",
          },
        },
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
         unique: true,

        validate: {
          notNull: {
            msg: "email must not be null ",
          },

          isEmail: {
            msg: "please verify email format ",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(value, salt);
          console.log(bcrypt.compare(hash, value));
          this.setDataValue("password", hash);
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  return User;
};
module.exports = user;
