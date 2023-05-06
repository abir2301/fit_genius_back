const mongoose = require("mongoose");
const { BOOLEAN } = require("sequelize");
const Ingredient = mongoose.Schema({
  name: String,
  quantity: Number,
});

// Define Exercise model
const Exercise = mongoose.Schema({
  name: String,
  image: String,
  duration: Number,
  isDone: Boolean,
});

// Define Meal model
const Meal = mongoose.Schema({
  name: String,
  carbs: Number,
  fats: Number,
  protein: Number,
  fibers: Number,
  calories: Number,
  isDone: Boolean,
  ingredients: [{ type: Ingredient }],
});

const Workouts = mongoose.Schema({
  desc: String,
  excercices: [{ type: Exercise }],
});

// Define Ingredient model

const Program = mongoose.model("Program", {
  desc: String,
  objectif: Number,
  meals: [{ type: Meal, required: false }],
  workouts: [{ type: Workouts, required: false }],
});
exports.Program = Program;
