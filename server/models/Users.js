const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  name: String,
  mobileNumber: String,
  email: String,
  password: String,
  admin: Boolean,
});

const Users = mongoose.model("user", listSchema);

module.exports = Users;
