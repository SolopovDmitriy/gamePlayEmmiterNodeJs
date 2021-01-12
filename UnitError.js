'use strict';
const colors = require('colors');
const Logger = require('./Logger');

class UnitError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'UnitError'.toLowerCase();
        Logger.logError(this);
    }
}
try {
    // var err = new UnitError(100500, 'Юниту стало больно');
    // console.log(
    //     err.code + " " +
    //     err.name + " " +
    //     err.message + " " +
    //     colors.red(err.stack)
    // )
}
catch(e){
    console.dir(e);
}


module.exports = UnitError;