const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
/* GET users listing. */


mongoose.connect(process.env.MONGO_URI);

const postSchema= mongoose.Schema({
  title: String,
  fields: [String],
  created_By: String,
  date_created: Date,
  votes: [Number]
});
const profileSchema= mongoose.Schema({
name: String,
avatar: String,
voted:[String],
polls: [String],
googleId: String
});
const Post= mongoose.model('Post',postSchema);
const Profile= mongoose.model('Profile',profileSchema);


router.get('/', function(req, res, next) {
  res.json({
    username: "fakeUser",
    id: "fakeId"
  });
});
router.get('/login',function(req,res){
  console.log(req.query);
  Profile.findOne({googleId: req.query.user},function(err,data){
    if(err) console.log(err)
    console.log(data);
    if(data){
        res.json(data);
    }
    else{
      res.json({found: "user not found"});
    }
  });
});

router.post('/signup',function(req,res){
Profile.findOne({googleId: req.body.googleId},function(err,data){
if(err) console.log(err)
console.log(data);
if(data){
  res.json({found: "user already exists"});
}
else{
  console.log(req.body)
  const User= new Profile({
    name: req.body.name,
    avatar: req.body.imageUrl,
    voted:[],
    polls: [],
    googleId: req.body.googleId
  });
  User.save(function(err,data){
    res.json(data);
  })
}
});
});
router.get('/posts/',function(req,res){
  console.log(req.query);
  Post.find({ created_By: req.query.user.toString()},function(err,data){
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
const user= "bob123";
Post.count({},function(err,data){
const addPost= new Post({
 title: req.body.title,
 fields: req.body.field,
 created_By: "Bob123",
 date_created: new Date(),
 votes: initVotes
});

 console.log(addPost);

 addPost.save(function(err,data){
   if(err) console.log(err);
   res.redirect('back');
 });
});
});

router.post('/avatar',function(req,resp){

  Profile.findByIdAndUpdate(req.body.userId,{avatar: req.body.avatar},function(err,data){
    if(err) console.log(err);
    res.redirect("back");
  }); 
});

module.exports = router;
