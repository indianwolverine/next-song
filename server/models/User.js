const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  userInfo: String,
  accessToken: String,
  refreshToken: String,
  playlistID: String,
  queue: [String],
  votes: String,
  roomName: String
});

mongoose.model("users", UserSchema);
