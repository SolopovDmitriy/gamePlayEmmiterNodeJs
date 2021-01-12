'use strict';
const colors = require('colors');
const UNIT_CFG = require('./unitconfig');

//базовый
class UnitSpec {
    constructor(spec) {
        let _spec = null;
        let _damageK = 1;       //урона
        let _defenceK = 1;      //броня
        let _agility = 1;       //уворот

        let isValidSpec = function(spec) {
            for (const key in UNIT_CFG.SPEC) {
                if(UNIT_CFG.SPEC[key] == spec){
                    _spec = UNIT_CFG.SPEC[key];
                    return true;
                }
            }
            return false;
        }
        isValidSpec(spec);
        switch (_spec) {
            case UNIT_CFG.SPEC.TANK: {
                _damageK = 1.5;
                _defenceK = 4;
                _agility = 0;
                break;
            }
            case UNIT_CFG.SPEC.DAMAGER: {
                _damageK = 3;
                _defenceK = 1.5;
                _agility = 1.3;
                break;
            }
            case UNIT_CFG.SPEC.SUPPORT: {
                _damageK = 0.5;
                _defenceK = 2;
                _agility = 1.5;
                break;
            }
        }
        this.getDamageBuff = function () {
            return _damageK;
        }
        this.getDefenceBuff = function () {
            return _defenceK;
        }
        this.getAgilityBuff = function () {
            return _agility;
        }
    }
}

module.exports = UnitSpec;