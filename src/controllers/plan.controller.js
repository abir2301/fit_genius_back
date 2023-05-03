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
      meals: [
        {
          name: "meal 1",
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
exports.get = async (req, res) => {};
