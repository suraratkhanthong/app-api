const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const Post = require("./model/Post");
const bodyParser = require("body-parser");
require("dotenv/config");
const postRoute = require("./routes/posts");

app.use(bodyParser.json())

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION,()=>{
  
  console.log("DB connected")
});

app.listen(PORT, ()=>{
  console.log(`listen PORT ${PORT}`);
})

app.use("/posts", postRoute);
app.get("/", (req,res)=>{
  console.log("log running")
   res.send("API running Index 555");
})

module.exports = app;