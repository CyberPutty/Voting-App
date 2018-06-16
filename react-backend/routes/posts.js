const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

/* GET users listing. */
const models= require('../models');


console.log(models.Post)



// /posts/latest


router.get('/', function(req, res, next) {
 
    models.Post.find({},function(err,data){
        if (err) console.log(err);

        // should limit to top 10. or scroll
       res.json(data);
       });
  });
router.post('/updateVotes',function(req,res){

    const id=req.body.id;
    const index= Number(req.body.vote);
    models.Post.findById(id,function(err,data){
     if (err) console.log(err);

      data.votes[index]++;
     const currentPost=data;
    
     models.Profile.findById(req.user._id,function(err,user){
       
         if (user.voted.includes(data._id.toString())=== false){
           
            let voted= user.voted;
            voted.push(data._id);
             
             data.update({votes: data.votes},function(err,data){
            user.update({voted: voted},function(err,data){
                res.json(currentPost);
            });
         if(err) console.log(err);
      
          
     });
         }
         else{
             res.json({failureMessage: "Already Voted"});
         }
         
     });

  
    
   
    
    });
});


module.exports = router;
