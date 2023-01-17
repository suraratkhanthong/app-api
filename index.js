const express = require("express");
const app = express();
const PORT = 4000;

app.listen(PORT, ()=>{
  console.log(`API listenin${PORT}`);
})
app.get("/", (req,res)=>{
  console.log("log running")
   res.send("API running Index");
})
app.get("/product", (req,res)=>{
  console.log("log product")
   res.send("API Product Test");
})
module.exports = app;