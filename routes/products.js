const router = require("express").Router();
const { json } = require("body-parser");
const Product = require("../model/Product");
const multer = require('multer');
const path = require('path')
//const fs = require('fs')
//const stream = require('stream')

router.get("/", async (req, res) => {
  try {
    const findProduct = await Product.find().select("name url price")
   
    res.send(findProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

router.use(express.static(path.join(__dirname,
"public", "uploads")));

/*router.get("/:file", async (req, res) => {
  
  try {
    let file = req.params.file
    const r = fs.createReadStream(`../public/uploads/`+file) // or any other way to get a readable stream
    const ps = new stream.PassThrough() 
    
    stream.pipeline(
      r,
      ps, // <---- this makes a trick with stream error handling
      (err) => {
       if (err) {
         console.log(err) // No such file or any other kind of error
         return res.sendStatus(400); 
       }
     })
     ps.pipe(res) 
    
    // res.send('<img src=..../C:/Users/admin/Desktop/app/app-api/public/uploads/1677737663945-test.jpg />');
    // // const findProduct = await Product.findById(req.params.postId)
    
  } catch (err) {
    res.json({ message: err })
  }
})*/

//save post
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/', 'uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})


router.post("/", async (req, res) => {

  try {

    let upload = multer({ storage: storage }).single('image');


    upload(req, res, async function (err) {
      
        const product = new Product({
        name: req.body.productName,
        url: req.file.filename,
        price: req.body.productPrice,
      });
      const saveProduct = await product.save()
      res.json(saveProduct)
  

      if (!req.file) {
        return res.send("Please select image");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
    });


  } catch (err) {
    res.json({ message: err })
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updateProduct = await Product.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          name: req.body.name,
          url: req.body.url,
          price: req.body.price,
        }
      }
    )
    res.json(updateProduct)
  } catch (err) {
    res.json({ message: err })
  }
})

router.delete("/:postId", async (req, res) => {
  try {
    const deleteProduct = await Product.remove(
      { _id: req.params.postId })
    res.json(deleteProduct)
  } catch (err) {
    res.json({ message: err })
  }
})
module.exports = router;
