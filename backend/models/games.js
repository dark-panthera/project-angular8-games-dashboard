const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: { type: String, required: true },
  background: { type: String, required: true },
  icon_2: { type: String, required: true }
});

gameSchema.set("collection", "data");

module.exports = mongoose.model("Game", gameSchema, 'data');
