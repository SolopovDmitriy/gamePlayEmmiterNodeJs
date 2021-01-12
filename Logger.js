'use strict';
const fs = require('fs');

class Logger {
    static pathDir = './errors/';

    static logError(error) {
        var data = JSON.stringify({
            code: error.code,
            date: new Date(),
            stack: error.stack
        }) + "\n";
        fs.writeFile(Logger.pathDir + error.name + '.log', data, {
            encoding: 'utf8',
            flag: 'a'
        }, function (err) {
            if (err) throw err;
        })
    }

    static getLastErrors(errorType, count = 0, callback) {
        let pathToFile = Logger.pathDir + errorType + '.log';
        fs.stat(pathToFile, function (err, stats) {
            if (err) throw err;
            if (stats.isFile()) {
                fs.readFile(pathToFile, function (err, data) {
                    if (err) throw err;
                    data = data.toString().split('\n');
                    data.length--;
                    data = data.slice(data.length - count, data.length);
                    data.forEach(function (item, index) {
                        data[index] = JSON.parse(item);
                    });
                    if(typeof callback === 'function'){
                        callback(data);
                    }
                });
            }
        })
    }

    static getErrorsForTime(errorType, dateStart, dateEnd, callback) {
        let pathToFile = Logger.pathDir + errorType + '.log';
        fs.stat(pathToFile, function (err, stats) {
            if (err) throw err;
            if (stats.isFile()) {
                fs.readFile(pathToFile, function (err, data) {
                    if (err) throw err;
                    data = data.toString().split('\n');
                    data.length--;

                    data.forEach(function (item, index) {
                        data[index] = JSON.parse(item);
                    });
                    if(typeof callback === 'function'){
                        callback(data);
                    }
                });
            }
        })
    }
}

module.exports = Logger;