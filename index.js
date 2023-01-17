const express = require("express");
const app = express();
const PORT = 4000;

app.listen(PORT, ()=>{
  console.log(`API llistenin${PORT}`);
})
app.get("/", (req,res)=>{
  console.log("log running")
   res.send("API running");
})
app.get("/product", (req,res)=>{
  console.log("log product")
   res.send("API Product");
})
module.exports = app;