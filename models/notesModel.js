const mongoose = require("mongoose");

const { Schema } = mongoose;


// creating schema for user
const notesSchema = new Schema({
  user :{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  
  discription  : {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  }
});

// creating model from userSchema
const Notes = mongoose.model("notes", notesSchema);
module.exports = Notes;
