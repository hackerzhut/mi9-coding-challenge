/*jslint node: true */

var express = require('express'),
	router 	= express.Router(),
	mi9 	= require('../lib/mi9');

/* GET index page. */
//Single responsibility - Does only routing 
router.post('/', function(req, res) {
	mi9.listDrmEnabledShows(req.body, function(err, docs){
		if(err){
			res.status(400).json({ error: err });
		}else{
			res.status(200).json({response: docs });
		}
	});
});

module.exports = router;
