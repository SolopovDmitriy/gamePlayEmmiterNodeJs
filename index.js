const colors = require('colors');
const util = require('util');
const UNIT_CFG = require('./unitconfig');
const Unit = require('./Unit');
const Logger = require('./Logger');
const UnitEvent = require('./UnitEvent');
const Orc = require('./Orc');
const Undead = require('./Undead');

/*let unit = new Unit(UNIT_CFG.SPEC.DAMAGER, 1000, 2000, 3000);

/*unit.UEvents.on(UnitEvent.onCreated, function (e) {
    console.log('Персонаж создан');
});*/

/*for (var i = 0; i < 1000; i++){
    unit.addExp(50 + Math.floor(Math.random() * 150));
    console.log(colors.red(unit.getLvl()) + " " + colors.green('\t' + unit.getExp()));
}*/
/*unit.addExp(5000);
console.log(colors.red(unit.getLvl()) + " " + colors.green('\t' + unit.getExp()));
/*Logger.getLastErrors('UnitError', 3, function (data) {
    console.log(data.length);
    console.dir(data[0].code);
    console.dir(data[0].date);
    console.dir(data[0].stack);
});

Logger.getErrorsForTime(
    'UnitError',
    new Date(2020, 11, 1),
    new Date(2020, 11, 31),
    function (data) {
        console.dir(data);
    }
)*/


let orc = new Orc(UNIT_CFG.SPEC.DAMAGER, "Ork", 3000, 2000, 5000);
let zomb = new Undead(UNIT_CFG.SPEC.TANK, "Zombie", 8000, 1000, 6000);
// orc.setName("namevrijvirjv9rj");
console.log(orc.toString());
console.log(zomb.toString());

// var battleID = setInterval(function () {
//     orc.attack(zomb, 35);
//     zomb.attack(orc, 50);
// }, 500);
var orсBattleID = setInterval(function () {
    orc.attack(zomb, 350);
}, 5000);// время между ударами

var zombBattleID = setInterval(function () {
    zomb.attack(orc, 500);
}, 7100);

orc.UEvents.on(UnitEvent.onDead, function () {// подключаем слушателя к событию onDead, эта функция ждет пока запустиься событие в Unit (104)стр - _event.emit(UnitEvent.onDead);
    clearInterval(orсBattleID);
    clearInterval(zombBattleID);
    console.log(colors.red("Orc dead"));
});
zomb.UEvents.on(UnitEvent.onDead, function () {//UnitEvent.onDead -  'ondead' - имя события, function ()-анонимная функция, которая запускается, когда проиходит событие onDead
    // clearInterval(battleID);// остановить бой (таймер)
    clearInterval(orсBattleID);
    clearInterval(zombBattleID);
    console.log(colors.red("Zombie dead"));//выводим сообщение о событии
});
zomb.UEvents.on(UnitEvent.onGetDamage, function (name, health) {// зомби получил урон
    console.log(colors.red(name+" get damage. Health: " + health));
});
orc.UEvents.on(UnitEvent.onGetDamage, function (name, health) {// орк получил урон
    console.log(colors.red(name+" get damage. Health: " + health));
});