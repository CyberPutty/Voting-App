const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');



/* GET users listing. */
const models= require('../models');




router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000/users');
});

router.post('/posts/delete',function(req,res){
console.log(req.body);
models.Post.findByIdAndRemove(req.body.id,function(err,data){
    console.log(data);
  const updatedPolls= req.user.polls;
  updatedPolls.filter(function(item){
    return item!==req.body.id
  });
  models.Profile.findByIdAndUpdate(req.user._id,{polls: updatedPolls},function(err,data){
    if(err) console.log(err);
    res.json({success:true});
  });


});

});
router.get('/posts/',function(req,res){
  console.log(req.query);
  models.Post.find({ _id:{ $in: req.user.polls}},function(err,data){
    if (err) console.log(err);
    console.log(data);
    res.json(data);
  });

});
router.post('/posts/new',function(req,res){
console.log(req.body);


let initVotes= [];
for(let i=0; i<req.body.field.length;i++){
  initVotes.push(0);
}
const user= req.user
const addPost= new models.Post({
 title: req.body.title,
 fields: req.body.field,
 created_By: user.name,
 date_created: new Date(),
 votes: initVotes
});

 console.log(addPost);

 addPost.save(function(err,data){
   if(err) console.log(err);
  console.log(data);
  console.log(data,'this is post');
  let polls= req.user.polls;
  polls.push(data._id);
models.Profile.findByIdAndUpdate(req.user._id,{polls: polls},function(err,data){
  console.log(data,"update successfull");
  res.json(polls);
});
   
 });

});



module.exports = router;
