'use strict';
const colors  = require('colors');
const EventEmitter = require('events');

class UnitEvent extends EventEmitter {
    constructor() {
        super();
    }
    static onCreated = 'oncreated';
    static onDead = 'ondead';
    static onGetDamage = 'ongetdamage';// получил урон
    static onMaxLvlAchieved = 'onmaxlvlachieved';
    static onLvlUp = 'onlvlup';
}


module.exports = UnitEvent;



