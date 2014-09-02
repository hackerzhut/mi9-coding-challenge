/*jslint node: true */
'use strict';
var samplePayload = require('./payload.json'),
payloadResponse = require('./payloadResponse.json'),
_ = require('underscore');


var testData = (function(){

	function getSamplePayload(data){
		return JSON.stringify({
			payload: data,
			skip: 0,
			take: data.length,
			totalRecords: data.length
		});
	}

	/* Getting functional here */
	function transform(transformFunction){
	  return function(e){
	    return transformFunction(e);
	  }
	}

	function getShowData(transformFuction){
		return _.filter(samplePayload, transform(transformFuction));	
	}
	

	return {

		invalidJSONResponse : JSON.stringify({ error: "Could not decode request: JSON parsing failed"}),
		emptyResponse 		: JSON.stringify({ response: []}),
		fullPayload  		: JSON.stringify(samplePayload),
		fullPayloadResponse : JSON.stringify(payloadResponse),
		emptyPayload 		: getSamplePayload([]),
		getPayloadWithepisodeCountZero : function(){
			return getSamplePayload(getShowData(function(e){ 
				return e.episodeCount === 0 
			}));
		},
		getPayloadWithDRMFalse : function(){
			return getSamplePayload(getShowData(function(e){ 
				return e.drm === false 
			}));
		},
		getPayloadWithOnlyOneShow: function(){
			return getSamplePayload([samplePayload.payload[0]]);
		}
	}

}());

exports = module.exports = testData;
