const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true,},
  password: {type: String,required: true,},
  role: {type: String, required: true, enum: ["user", "admin"], default: "user",},
  fav: [{type: Schema.Types.ObjectId, ref: 'Recipe', default: null}],
  history: [{type: Schema.Types.ObjectId, ref: 'Recipe', default: null}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
