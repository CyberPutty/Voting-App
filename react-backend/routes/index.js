var express = require('express');
var router = express.Router();
router.get('/profile', function(req, res) {
    console.log(req.user);
if (req.user){
       res.json(req.user);
}
res.json({failed:'not logged in'});
});


module.exports = router;
