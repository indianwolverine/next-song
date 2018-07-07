const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema({
  userID: String,
  userInfo: String,
  accessToken: String,
  refreshToken: String
});

mongoose.model("tokens", TokenSchema);
