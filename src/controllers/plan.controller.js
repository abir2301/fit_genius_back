const { Program } = require("../models/plan");
const db = require("../models/");
const { where } = require("sequelize");
const User = db.user;
const UserProgram = db.userProgram;
exports.create = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user,
      },
    });
    const plan = new Program({
      desc: "here is the plan ",
      objectif: 2,
      meals: [
        {
          name: "meal 1",
          isDone: false,
          fibers: 1200,
          carbs: 120,
          fats: 500,
          protein: 100,
          calories: 1200,
          ingredients: [
            {
              name: "potatoes",
              quantity: 120,
            },
          ],
        },
      ],
      workouts: [
        {
          desc: "here is the workout ",
          excercices: [
            {
              name: "ex1",
              image: "image",
              duration: 10,
              isDone: false,
            },
          ],
        },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "dont find user" });
    } else {
      const result = await plan.save();
      if (result) {
        const userProgram = {
          programId: result._id.toString(),
          userId: req.user,
        };
        const data = await UserProgram.create(userProgram);
        res.json({ program: result, userprogram: data });
      } else {
        res.status(400).json({ message: "failed to add program " });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.get = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user_not_found" });
    } else {
      const userProgram = await UserProgram.findOne({
        attributes: ["id", "date", "programId"],
        order: [["date", "DESC"]],
        where: {
          userId: req.user,
        },
      });
      if (userProgram) {
        const plan = await Program.findById(
          userProgram.programId.toString()
        ).select(
          "-_id -meals._id -meals.ingredients._id -__v -workouts._id -workouts.excercices._id"
        );
        if (plan) {
          res.status(200).json({ data: plan });
        }
      } else {
        res.status(422).json({ message: "program_not_found" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPerformance = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user,
      },
    });
    if (!user) {
      res.status(404).json({ message: "user_not_found" });
    } else {
      const performance = await UserProgram.findAll({
        where: {
          userId: req.user,
        },
        attributes: [
          "id",
          "date",
          "result",
          "objectif",
          "comment",
          "programId",
        ],
      });
      if (!performance || performance.length == 0) {
        res.status(422).json({ message: "user_program_not_found" });
      } else {
        res.status(200).json({ data: performance });
      }
    }
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
