const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema({
  count: Number,
  accessToken: String,
  refreshToken: String
});

mongoose.model("tokens", TokenSchema);
