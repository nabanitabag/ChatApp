const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  id: Number
  username: {
    type:String,
    required:true
  }
  email: String
})
userSchema.plugin(autoIncrement.plugin, 'user');
const User = mongoose.model("user", userSchema);
