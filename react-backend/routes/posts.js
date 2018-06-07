const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
/* GET users listing. */
mongoose.connect(process.env.MONGO_URI);
const postModel= mongoose.model('Post');



// /posts/latest


router.get('/', function(req, res, next) {
    console.log("success");
    postModel.find({},function(err,data){
        if (err) console.log(err);

        //should return object array?
       res.json(data);
       });
  });
router.post('/updateVotes',function(req,res){

    const id=req.body.id;
    const index= Number(req.body.vote);
    postModel.findById(id,function(err,data){
     if (err) console.log(err);
     
     data.votes[index]++;
     data.update({votes: data.votes},function(err,data){
         if(err) console.log(err);
          res.redirect("back");
     });
   
    
    });
});


module.exports = router;
