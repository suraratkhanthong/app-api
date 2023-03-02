const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: Date.now()
  },
});

module.exports = mongoose.model("ProductCollection", ProductSchema);