const mongoose = require("mongoose");
const RoomSchema = require("./Room");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  userInfo: String,
  accessToken: String,
  refreshToken: String,
  rooms: [RoomSchema]
});

mongoose.model("users", UserSchema);
