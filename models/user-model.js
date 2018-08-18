const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  identificator: String,
  thumbnail: String,
  provider: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
