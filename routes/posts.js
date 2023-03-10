const router = require("express").Router();
const { json } = require("body-parser");
const Post = require("../model/Post"); 


router.get("/", async (req,res)=>{
  try{
    const findPost = await Post.find().select("name url title")
    //const findPost = [{"_id":"63e9190ec41e8bc8ca005868","name":"bbbbbbbbbb","url":"https://drive.google.com/uc?id=1ZhSDuOpBT9VmLm9EzOCknRxbj9cWUMZr","title":"bbbbbbbbb"},{"_id":"63e91922c41e8bc8ca00586a","name":"bbbbbbbbbb","url":"https://drive.google.com/uc?id=1ZhSDuOpBT9VmLm9EzOCknRxbj9cWUMZr","title":"bbbbbbbbb"},{"_id":"63e91923c41e8bc8ca00586c","name":"bbbbbbbbbb","url":"https://drive.google.com/uc?id=1ZhSDuOpBT9VmLm9EzOCknRxbj9cWUMZr","title":"bbbbbbbbb"}]
    
    res.send(findPost)
  }catch(err){
    res.json({message: err})
  }
})
router.get("/:postId", async (req,res)=>{
  try{
    const findPost = await Post.findById(req.params.postId)
    res.json(findPost)
  }catch(err){
    res.json({message: err})
  }
})

//save post
router.post("/", async (req,res)=>{
  const post = new Post({
    name: req.body.name,
    url: req.body.url,
    title: req.body.title,
    showImg: req.body.showImg,
  });
  
  try{
    const savePost = await post.save()
    res.json(savePost)
  }catch(err){
    res.json({message: err})
  }
  });
  
  router.patch("/:postId", async (req,res)=>{
  try{
    const updatePost = await Post.updateOne(
      {_id: req.params.postId},
      {$set:{
        name: req.body.name,
        url: req.body.url,
        title: req.body.title,
        showImg: req.body.showImg,
      }}
      )
    res.json(updatePost)
  }catch(err){
    res.json({message: err})
  }
})

router.delete("/:postId", async (req,res)=>{
  try{
    const deletePost = await Post.remove(
      {_id: req.params.postId})
    res.json(deletePost)
  }catch(err){
    res.json({message: err})
  }
})
module.exports = router;