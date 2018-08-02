const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  host: String,
  name: String,
  queue: [String],
  votes: String
});

mongoose.model("rooms", RoomSchema);
