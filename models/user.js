const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  username: {
    type: String,
    required: true,
    match: /^\S*$/,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  weight: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
