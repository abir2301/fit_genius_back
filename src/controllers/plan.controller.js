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
          name: "meal:01",
          isDone: false,
          fibers: 9,
          carbs: 143,
          fats: 500,
          protein: 68,
          calories: 1045,
          ingredients: [
            {
              name: "pumpkin_seeds",
              quantity: 110,
            },
            {
              name: "oranges",
              quantity: 350,
            },
            {
              name: "oregano",
              quantity: 100,
            },
          ],
        },
        {
          name: "meal:02",
          isDone: false,
          fibers: 9,
          carbs: 143,
          fats: 500,
          protein: 68,
          calories: 1045,
          ingredients: [
            {
              name: "honey",
              quantity: 110,
            },
            {
              name: "gluten-free muffins",
              quantity: 337,
            },
            {
              name: "brown_rice",
              quantity: 100,
            },
          ],
        },
        {
          name: "meal:03",
          isDone: false,
          fibers: 9,
          carbs: 143,
          fats: 700,
          protein: 68,
          calories: 1000,
          ingredients: [
            {
              name: "fish",
              quantity: 129,
            },
            {
              name: "oats",
              quantity: 216,
            },
            {
              name: "gluten-free bread",
              quantity: 100,
            },
          ],
        },
      ],
      workouts: [
        {
          desc: "here is the workout ",
          excercices: [
            {
              name: "Squat Jumps",
              image: "image",
              duration: 8,
              isDone: false,
            },
            {
              name: "Jumping Jacks",
              image: "image",
              duration: 8,
              isDone: false,
            },
            {
              name: "Squat Isometric Hold",
              image: "image",
              duration: 3,
              isDone: false,
            },
            {
              name: "Squats",
              image: "image",
              duration: 5,
              isDone: false,
            },
            {
              name: "Bicycle Crunches",
              image: "image",
              duration: 8,
              isDone: false,
            },
            {
              name: "Diamond Push-ups",
              image: "image",
              duration: 9,
              isDone: false,
            },
            {
              name: "Bicycle Crunches",
              image: "image",
              duration: 8,
              isDone: false,
            },
            {
              name: "Single-Leg Burpees",
              image: "image",
              duration: 8,
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
          "-_id  -meals._id -meals.ingredients._id -__v -workouts._id -workouts.excercices._id"
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
