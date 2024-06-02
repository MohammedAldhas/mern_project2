const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  userId: String,
  tasks: {
    title: String,
    discription: String,
    publish: Boolean,
    importance: Boolean,
  },
});

const Tasks = mongoose.model("task", listSchema);

module.exports = Tasks;
