const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now()
  },
});

module.exports = mongoose.model("Product", PostSchema);