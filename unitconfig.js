'use strict';

let UNIT_CFG = {
    SPEC: {
        TANK:'tank',
        SUPPORT:'support',
        DAMAGER:'damager'
    },
    MAX_HEALTH:15000,
    MAX_STAMINA:13000,
    MAX_MANA:10000,
    MAX_LVL:100,
    EXP_K:2.5
}

UNIT_CFG = Object.freeze(UNIT_CFG);

module.exports = UNIT_CFG;