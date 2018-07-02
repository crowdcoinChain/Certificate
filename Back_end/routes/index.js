var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){console.log(req.params);res.send(handlers.home(req));});
router.post('/', function(req, res){res.send(handlers.home(req));});


module.exports = router;
