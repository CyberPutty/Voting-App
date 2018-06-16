
const mongoose= require('mongoose');
mongoose.connect(process.env.MONGO_URI);
// view engine setup
const profileSchema= mongoose.Schema({
  name: String,
  avatar: String,
  voted:[String],
  polls: [String],
  googleId: String
  });

const postSchema= mongoose.Schema({
  title: String,
  fields: [String],
  created_By: String,
  date_created: Date,
  votes: [Number]
});
 const models = {
    Post: mongoose.model('Post',postSchema),
    Profile: mongoose.model('Profile',profileSchema)

  };
module.exports= models;