const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  spotifyID: String
});

mongoose.model('users', UserSchema);
