var express = require('express');
var router = express.Router();

/* GET blogs listing*/
router.get('/', function(req, res, next) {
  res.send('All blogs will be here');
});



module.exports = router;
