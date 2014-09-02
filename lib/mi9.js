/*jslint node: true */
'use strict';

var async 	= require('async'),
	logger 	= require('../util/logger');


var mi9 = (function(){

	//Checks Schema for the json
	function isValidSchema(jsonDoc){
		return (jsonDoc.hasOwnProperty("payload") && jsonDoc.hasOwnProperty("skip") && jsonDoc.hasOwnProperty("take") && jsonDoc.hasOwnProperty("totalRecords"));
	}

	return {
		listDrmEnabledShows: function(jsonDoc, callback){
			var results = [];
			if(isValidSchema(jsonDoc)){
				//Async library is chosen for faster results incase of huge payload and maintainable code
				async.forEach(jsonDoc.payload, function(show, callback){
					//Checks whether the show is DRM enabled with at least one episode
					if(show.episodeCount > 0 && show.drm === true){
						results.push({image: show.image.showImage, slug: show.slug, title:show.title});
						callback();	
					}else{
						callback();
					}
				}, function(err){
					//Any error in processing is considered as parsing failure
					if(err){
						logger.error((new Date()).toUTCString() + ' Error iterating payload:', err.message);
	  					logger.error(err.stack);
						callback("Could not decode request: JSON parsing failed", null);
					}else{
						callback(null, results);
					}
				});
			}else{
				//Return JSON error as the JSON has a invalid schema
				callback("Could not decode request: JSON parsing failed", null);
			}
		}
	};

}());

exports = module.exports = mi9;	



