/*jslint node: true */

var request 	= require('superagent'),
	chai 		= require('chai'),
	expect 		= chai.expect,
	testData 	= require('./testdata'),
	serverURL 	= 'http://localhost:5000';

chai.use(require('chai-json-schema'));

describe('Mi9 JSON Webservice testing: ', function(){

	it("Service live testing", function(done){
		request.post(serverURL).end(function(res){
			expect(res.status).to.equal(400);
		    done();
		});
	});	


	it("404 error", function(done){
		request.post(serverURL+"/test").end(function(res){
			expect(res.status).to.equal(404);
		    done();
		});
	});	

	it("Invalid JSON - null data", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(null)
		.end(function(res){
			expect(res.status).to.equal(400);
			done();
		});
	});

	it("Invalid JSON - empty json", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send({})
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.invalidJSONResponse);
			done();
		});
	});

	it("Invalid JSON - invalid schema", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send({payloads: [], name: "saravana"})
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.invalidJSONResponse);
			done();
		});
	});


	it("Invalid JSON - non json", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send("dadsa")
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.invalidJSONResponse);
			done();
		});
	});

	it("Empty payload", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(testData.emptyPayload)
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.emptyResponse);
			done();
		});
	});

	it("Payload with all shows with zero episodes", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(testData.getPayloadWithepisodeCountZero())
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.emptyResponse);
			done();
		});
	});

	it("Payload with all shows with DRM false", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(testData.getPayloadWithDRMFalse())
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.emptyResponse);
			done();
		});
	});

	it("Payload with only one show", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(testData.getPayloadWithOnlyOneShow())
		.end(function(res){
			expect(res.body.response).to.have.length(1);
			var resValue = res.body.response[0];
			expect(resValue).to.have.property('image');
			expect(resValue).to.have.property('slug');
			expect(resValue).to.have.property('title');
			expect(resValue).to.have.deep.property('title', '16 Kids and Counting');
			done();
		});
	});

	it("Full payload", function(done){
		request.post(serverURL)
		.set('Content-Type', 'application/json')
		.send(testData.fullPayload)
		.end(function(res){
			expect(JSON.stringify(res.body)).to.equal(testData.fullPayloadResponse);
			expect(res.body.response).to.have.length(7);
			var resValue = res.body.response[0];
			expect(resValue).to.have.property('image');
			expect(resValue).to.have.property('slug');
			expect(resValue).to.have.property('title');
			done();
		});
	});	
});