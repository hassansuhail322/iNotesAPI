const mongoose = require("mongoose");

const { Schema } = mongoose;


// creating schema for user
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  }
});

// creating model from userSchema
const User = mongoose.model("user", userSchema);
module.exports = User;
