/*jslint node: true */

var winston 	= require('winston'),
	path       = require ('path'),
	transports = [];

var colors = {
	info: 'green',
	verbose: 'green',
	debug: 'yellow',
	warn: 'blue',
	error: 'red'
};


transports.push(new (winston.transports.Console)({ level: 'debug', colorize: true, 'timestamp':true }));
transports.push(new winston.transports.DailyRotateFile({
  name: 'file',
  level: 'debug',
  datePattern: '.dd-MM-yyyy',
  filename: path.join("logs", "mi9"),
   json: false
}));

winston.addColors(colors);

var logger = new winston.Logger({transports: transports});
module.exports = logger;