const router = require("express").Router();
const Post = require("../model/Post"); 

router.get("/", async (req,res)=>{
  try{
    const findPost = await Post.find()
    res.json(findPost)
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