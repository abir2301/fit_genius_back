const Sequelize = require("sequelize");
const { connection } = require("../config/connection.js");
const db = require("../models/");
const bcrypt = require("bcrypt");
const User = db.user;
const Profile = db.profile;
const Hp = db.hp;
const UserHp = db.userHp;
const jwt = require("jsonwebtoken");
const emailSending = require("../routes/mailsending");
const { gzipSync, gunzipSync } = require("zlib");
const { where } = require("sequelize");
const auth = require("../routes/verifyjwttoken");
//done
exports.registration = async (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const query = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (query) {
      res.status(404).json({ message: "user already exist " });
    } else {
      await User.create(user).then((data) => {
        var token = jwt.sign({ id: data.id }, "privateKey", {
          expiresIn: 86400,
        });
        //email send with code

        res.send({ user: data, token: token });
      });
    }
  } catch (err) {
    next(err);
  }
};
exports.getUserById = async (req, res) => {
  const user = await User.findOne({
    include: {
      model: Profile,
      required: false,
    },
    attributes: ["id", "name", "email"],
    where: {
      id: req.user,
    },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (user) {
    res.status(200).json({ data: user });
  } else {
    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    } else {
      res.status(500).send({
        message: err.message,
      });
    }
  }
};
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      res.send("please enter your login  credentials ");
    } else {
      const query = await User.findOne({
        attributes: ["id", "name", "email", "password"],
        where: {
          email: email,
        },
      });
      if (!query) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        const isMatch = await bcrypt.compare(password, query.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        var token = jwt.sign({ id: query.id }, "privateKey", {
          expiresIn: 86400,
        });
        //email send with code
        const user = { id: query.id, name: query.name, email: query.email };
        res.send({ user: user, token: token }).status(200);
      }
    }
  } catch (err) {
    next(err);
  }
};
exports.userLogout = async (req, res, next) => {
  try {
    res.send({ message: "Logged Out Successfully." });
  } catch (err) {
    next(err);
  }
};
exports.checkToken = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.replace(/^Bearer /, "");
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ message: "No authorization token provided" });
    // }
    // auth;
    // const user = await User.verifyToken(token);
    // if (!user) {
    //   return res.status(401).json({ message: "Invalid or expired token" });
    // }
    // res.json({ user: user, message: "You are logged in!" });
    console.log(req.user);
    const user = await User.findOne({
      where: {
        id: req.user,
      },
      attributes: ["id", "email", "name"],
    });
    if (user) {
      res.json({ user: user, message: "You are logged in!" });
    } else {
      console.log();
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (err) {
    res.send(err);
    next(err);
  }
};
exports.update = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.user } });
    if (user) {
      user.email = email ? email : user.email;
      user.name = name ? name : user.name;
      await user.save();
      return res.status(200).json({ message: "user updated ", user: user });
    } else {
      return res.status(404).json({ message: "not found user " });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
    // next(error);
  }
};
exports.destroy = async (req, res) => {
  const query = await User.destroy({
    where: {
      id: req.user,
    },
  });
  if (!query) {
    res.status(404).json({ message: "dont find user" });
  } else {
    res.status(200).json({ message: "user deleted  successfully " });
  }
};
exports.resetPassword = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };
  const query = await User.update({
    where: {
      id: req.user,
    },
  });
  if (!query) {
    res.status(404).send(" dont find user  ");
  } else {
    res.status(200).send("user updated successfully ");
  }
};
exports.getUsers = async (req, res) => {
  User.findAll({
    attributes: ["email", "name"],
    include: [
      {
        model: Profile,
      },
      {
        model: Hp,
      },
    ],
  }).then((data) => {
    res.status(200).send({ data: data });
  });
};

exports.addHP = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user,
      },
    });

    if (!user) {
      res.status(404).json({ message: "dont fint user " });
    } else {
      const hp = await Hp.findOne({
        where: {
          name: req.body.name,
        },
      });
      console.log(hp);
      if (!hp) {
        res.status(404).json({ message: "dont find  health problem " });
      } else {
        const data1 = { userId: req.user, HpId: hp.id };
        const data = await UserHp.create(data1);
        if (data) {
          res.status(200).json({ message: " user hp added succesully " });
        } else {
          res.status(500).json({ message: error.message });
        }
      }
    }
  } catch (error) {}
};
