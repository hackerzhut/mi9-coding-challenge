/*jslint node: true */

var winston 	= require('winston'),
	path       	= require ('path'),
	fs 			= require( 'fs' ),
	logDir 		= "logs", // Or read from a configuration
	env 		= process.env.NODE_ENV || 'development',
	transports 	= [];

var colors = {
	info: 'green',
	verbose: 'green',
	debug: 'yellow',
	warn: 'blue',
	error: 'red'
};

if ( !fs.existsSync( logDir ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( logDir );
}

transports.push(new (winston.transports.Console)({ level: 'debug', colorize: true, 'timestamp':true }));
transports.push(new winston.transports.DailyRotateFile({
  name: 'file',
  level: env === 'development' ? 'debug' : 'info',
  datePattern: '.dd-MM-yyyy',
  filename: path.join(logDir, "mi9"),
  json: false
}));



winston.addColors(colors);

var logger = new winston.Logger({transports: transports});
module.exports = logger;