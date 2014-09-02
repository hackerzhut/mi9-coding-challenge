/*jslint node: true */
'use strict';

var express     = require('express'),
    bodyParser = require('body-parser'),
    routes     = require('./routes/index'),
    logger  = require('./util/logger');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

/*
* Error handler for JSON parsing error from body parser.
* All json parsing errors will have status 400 and appropriate error message
*/
app.use(function(err, req, res, next){
     if(err.message.indexOf("invalid json")!== -1){
        res.status(400).json({error: "Could not decode request: JSON parsing failed" });
     }else{
        logger.error((new Date()).toUTCString() + ' Error:', err.message);
        logger.error(err.stack);
        res.status(500).json({error: err.message });
     }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).json({error: 'Not Found' });
});


module.exports = app;
