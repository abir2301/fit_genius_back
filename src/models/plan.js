const mongoose = require("mongoose");
const Ingredient = mongoose.Schema({
  name: String,
  quantity: Number,
});

// Define Exercise model
const Exercise = mongoose.Schema({
  name: String,
  image: String,
  duration: Number,
});

// Define Meal model
const Meal = mongoose.Schema({
  name: String,
  carbs: Number,
  fats: Number,
  protein: Number,
  calories: Number,
  ingredients: [{ type: Ingredient }],
});

const Workouts = mongoose.Schema({
  desc: String,
  excercices: [{ type: Exercise }],
});

// Define Ingredient model

const Program = mongoose.model("Program", {
  desc: String,
  meals: [{ type: Meal, required: false }],
  workouts: [{ type: Workouts, required: false }],
});
exports.Program = Program;
