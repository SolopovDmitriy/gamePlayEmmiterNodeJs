'use strict';
const colors = require('colors');
const UNIT_CFG = require('./unitconfig');
const UnitSpec = require('./unitspec');
const UnitError = require('./UnitError');
const UnitEvent = require('./UnitEvent');

class Unit extends UnitSpec {
    constructor(spec, name, health, mana, stamina) {
        super(spec); //вызов конструктора базового класса
        var _event = new UnitEvent();
        var _health = 0; //private
        var _mana = 0; //private
        var _stamina = 0; //private
        var _name = "";

        var _lvl = 0; //текущий уровень
        var _exp = 1; //текущий опыт
        var _expPoints = [UNIT_CFG.MAX_LVL];//контрольные точки опыт/уровень

        this.getLvl = function () {
            return _lvl;
        }
        this.getExp = function () {
            return _exp;
        }
        this.getExpPoint = function (indexOfPoint = 0) {
            if (_expPoints.length > 0) {
                if (indexOfPoint >= 0 && indexOfPoint < _expPoints.length) {
                    return _expPoints[indexOfPoint];
                }
            }
            throw  new UnitError(100500, 'index out of range');
        }
        this.addExp = function (exp = 0) {
            if (exp > 0) {
                _exp += exp;
                lvlUp(); //поднять лвл если опыта достаточно
                return;
            }
            throw  new UnitError(100501, 'exp incorrect value');
        }
        var lvlUp = function () {
            if (_lvl + 1 == UNIT_CFG.MAX_LVL) {
                setTimeout(function () {
                    _event.emit(UnitEvent.onMaxLvlAchieved);
                }, 0);
                return;
            }
            var nextExpPoint = null;
            do {
                nextExpPoint = Math.floor(UNIT_CFG.EXP_K * _expPoints[_lvl]);
                if (_exp > nextExpPoint) {
                    _lvl++;
                    setTimeout(function () {
                        _event.emit(UnitEvent.onLvlUp);
                    }, 0);
                    _expPoints.push(nextExpPoint);
                }
            } while (nextExpPoint < _exp);
        }
        var lvlReset = function () {
            _exp = _expPoints[_lvl];
        }


        this.getHealth = function () {
            return _health;
        }
        this.getStamina = function () {
            return _stamina;
        }
        this.getMana = function () {
            return _mana;
        }
        this.getEvent = function () {
            return _event;
        }
        this.getName = function () {
            return _name;
        }
        this.addMana = function (mana = 0) {
            if (!isNaN(parseInt(mana))) {
                if (mana >= 0 && _mana + mana <= UNIT_CFG.MAX_MANA) {
                    _mana += mana;
                } else {
                    throw  new UnitError("Incorrect Mana value");
                }
            } else {
                throw new UnitError("Vrong datatype Mana value");
            }
        }
        this.setStamina = function (stamina) {
            if (!isNaN(parseInt(stamina))) {
                if (stamina >= 0 && stamina <= UNIT_CFG.MAX_STAMINA) {
                    _stamina = stamina;
                } else {
                    throw  new UnitError("Incorrect stamina value");
                }
            } else {
                throw new UnitError("Vrong datatype stamina value");
            }
        }
        this.turnDownHealth = function (damage) {
            _health -= damage;
            setTimeout(function () {// параллельное создание события
                _event.emit(UnitEvent.onGetDamage, _name, _health);// создание события onGetDamage
            }, 0);
            if(_health <= 0) {
                setTimeout(function () {// параллельное создание события
                    _event.emit(UnitEvent.onDead);// создание события onDead
                }, 0);
                lvlReset();
            }
        }
        this.attack = function (unit, damage) {
            unit.turnDownHealth(this.getDamageBuff() * damage);
        }
        this.setHealth = function (health) {
            if (!isNaN(parseInt(health))) {
                if (health >= 0 && health <= UNIT_CFG.MAX_HEALTH) {
                    _health = health;
                } else {
                    throw  new UnitError("Incorrect health value");
                }
            } else {
                throw new UnitError("Vrong datatype health value");
            }
        }
        this.setName = function (name) {
                    _name = name;
        }

        this.setHealth(health);
        this.addMana(mana);
        this.setStamina(stamina);
        this.setName(name);
        setTimeout(function () {
            _event.emit(UnitEvent.onCreated); //триггерим событие
        }, 0);
    }

    get UEvents() {
        return this.getEvent();
    }

    get Health() { //"ПолЕ для чтения"
        return this.getHealth();
    }

    set Health(health) { //"ПолЕ для записи"
        this.setHealth(health);
    }

    get Mana() { //"ПолЕ для чтения"
        return this.getMana();
    }

    set Mana(mana) { //"ПолЕ для записи"
        this.addMana(mana);
    }

    get Stamina() { //"ПолЕ для чтения"
        return this.getStamina();
    }

    set Stamina(stamina) { //"ПолЕ для записи"
        this.setStamina(stamina);
    }

    toString() {
        return colors.red("name: " + this.getName() +
            " Health: " + this.Health + "; " +
            "Mana: " + this.Mana + "; " +
            "Stamina: " + this.Stamina + "; ");
    }
}

if (module.parent != null) {
    module.exports = Unit;
} else {
    console.log(colors.red("Module: Unit"));
}
