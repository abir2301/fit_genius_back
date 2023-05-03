const Sequelize = require("sequelize");

const db = require("../models/");
const User = db.user;
const Profile = db.profile;

exports.create = async (req, res) => {
  const profile = req.body;
  profile["userId"] = req.user;
  const user = await User.findByPk(req.user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const query = await Profile.findOne({ where: { userId: req.user } });
  // user does not hava a profile
  if (!query) {
    Profile.create(profile)
      .then((data) => {
        res.json({ data: data });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to create profile" });
      });
  } else {
    // profile.userId = req.id
    // query = profile.json
    query.age = profile.age ? profile.age : query.age;
    query.gender = profile.gender ? profile.gender : query.gender;
    query.height = profile.height ? profile.height : query.height;
    query.weight = profile.weight ? profile.weight : query.weight;
    // query.diet_type = profile.diet_type ? profile.diet_type : query.diet_type;
    query.activity_level = profile.activity_level
      ? profile.activity_level
      : query.activity_level;
    query.goal = profile.goal ? profile.goal : query.goal;

    query
      .save()
      .then((data) => {
        res.json({ data: query, message: "update profile " });
      })
      .catch((err) => {
        res.status(500).json({ message: "server error " });
      });
  }
};
exports.delete = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      userId: req.user,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(400).josn({ message: " user does not have a profile " });
      }
      Profile.destroy()
        .then((data) => {
          res.status(200).josn({ message: "profile deleted successfully " });
        })
        .catch((error) => {
          res.status(500).josn("server error " + error.message);
        });
    })
    .catch((error) => {
      res.status(404).send({ error: error.message });
    });
};
exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      userId: req.user,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: " user profile does not exist " });
      }
      res.status(200).json({ data: data, message: "profile" });
    })
    .catch((error) => {
      res.status(404).json({ error: error.message });
    });
};
