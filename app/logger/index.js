const winston = require('winston'); // To use as a Logger
require('winston-daily-rotate-file');
const config = require('config');
const { combine, timestamp, label, printf, prettyPrint, simple, json} = winston.format;

const fs = require('fs');

const dir = config.get('logger.logFileDir');

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

let logger = winston.createLogger({
	level: 'info',
    format: combine(
        timestamp(),
        simple(),
        json()
    ),
	transports: [
        new winston.transports.DailyRotateFile({ 
            level: 'error',
            filename: 'error.log', 
            dirname: config.get('logger.logFileDir'),
			maxsize: 20971520, //20MB
			maxFiles: 25,
			datePattern: '.dd-MM-yyyy'
        }),
        new winston.transports.DailyRotateFile({ 
            level: 'info',
            filename: 'combined.log',
            dirname: config.get('logger.logFileDir'),
			maxsize: 20971520, //20MB
			maxFiles: 25,
			datePattern: '.dd-MM-yyyy'
        }),
	]
});

if (process.env.NODE_ENV !== 'production') {
    logger = logger.add(new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true,
    }));
}


module.exports = logger