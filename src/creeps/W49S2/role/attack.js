// import { logger } from "../../../util/logger";

export const attack = (creep) => {

  if (true) {
    const playerAttackIgnore = ['nrei'];
    const hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
      .filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1);
    const target = creep.pos.findClosestByRange(hostiles);

    if (creep.hits < creep.hitsMax) {
      creep.heal(creep);
    }

    // creep.moveTo(Game.flags.GatherPoint);
    creep.moveTo(Game.flags.RainbowTower);

    creep.rangedAttack(target);

  } else if (false) {
    const playerAttackIgnore = ['nrei'];
    const hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
      .filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1);
    const tower = creep.room.find(FIND_STRUCTURES)
      .filter((structure) => structure.structureType === STRUCTURE_SPAWN);

    if (creep.hits < creep.hitsMax) {
      creep.heal(creep);
    }

    if (tower.length) {

      creep.moveTo(tower[0], { range: 1 });
      creep.rangedAttack(tower[0]);

    } else if (!tower.length && hostiles) {
      const target = creep.pos.findClosestByRange(hostiles);

      creep.moveTo(target, { range: 1 });
      creep.rangedAttack(target);
    }

  }



  // if (!(creep.room.name == 'W49S2')) {
  //   creep.moveTo(Game.flags.W49S2Claim);
  // }
  // else if (creep.room.name == 'W49S2') {

  //   const playerAttackIgnore = ['nrei'];
  //   const hostiles = creep.room.find(FIND_HOSTILE_CREEPS)
  //     .filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1)

  //   if (creep.hits < creep.hitsMax) {
  //     creep.heal(creep);
  //   }

  //   if (hostiles) {
  //     const target = creep.pos.findClosestByRange(hostiles);

  //     creep.moveTo(target, { range: 1 });
  //     creep.rangedAttack(target)
  //   }

  // }
};
