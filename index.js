const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const Post = require("./model/Post");
const bodyParser = require("body-parser");
require("dotenv/config");
const postRoute = require("./routes/posts");
const productRoute = require("./routes/products");
const cors = require('cors');


const corsOptions = {
  //origin: 'http://localhost:3000',
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION,()=>{
 // mongoose.connect("mongodb://0.0.0.0:27017/products",()=>{
    console.log("DB connected")
  },{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).catch((err)=>{
  console.log("catch ERR : "+ err)
});

app.listen(PORT, ()=>{
  console.log(`listen PORT ${PORT}`);
})

app.use("/posts", postRoute);
app.use("/products", productRoute);
app.get("/", (req,res)=>{
  console.log("log running")
   res.send("API running Index 555");
})

module.exports = app;