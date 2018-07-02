var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/check_insert_hash', function(req, res){res.send(handlers.handler_database_update(req));});
module.exports = router;
