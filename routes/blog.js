const express = require("express");
const {addBlog , uploadBlog ,upload , BlogById}= require("../controllers/blog");

const router = express.Router();

router.get("/addBlog",addBlog);


router.post("/",upload.single("coverImage"),uploadBlog)

router.get('/:id', BlogById);


module.exports = router;