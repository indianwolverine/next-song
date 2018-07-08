const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  userInfo: String,
  accessToken: String,
  refreshToken: String
});

mongoose.model("users", UserSchema);
