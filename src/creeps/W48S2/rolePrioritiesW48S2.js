// import { roleBuilder } from './role/roleBuilder';
import { roleHarvester } from './role/roleHarvester';
// import { roleUpgrader } from './role/roleUpgrader';
// import { roleRepair } from './role/roleRepair';
import { roleFillTower } from './role/fillTower';
import { fillStorage } from './role/fillStorage';
// import { roleSpawnRecoverer } from '../W48S3/role/roleSpawnRecoverer';
import { roleSpawnRecoverer } from './role/roleSpawnRecoverer';

export const rolePrioritiesW48S2 = (creep) => {

  let towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));
  // const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  // const target = 0;
  // const spawnRecovery = Game.rooms['W48S3'].memory.role.spawnRecovery;
  // console.log(spawnRecovery);

  if (!(creep.memory.role == 'harvest') && (creep.store[RESOURCE_ENERGY] == 0)) {
    creep.memory.role = 'harvest';
    roleHarvester(creep);
  } else if ((creep.memory.role == 'harvest') && (creep.store.getFreeCapacity() == 0)) {
    creep.memory.role = 'fillStorage';
  } else if ((creep.memory.role == 'harvest') && (creep.store.getFreeCapacity() > 0)) {
    roleHarvester(creep);
  } else if (!(creep.memory.role == 'harvest') && (creep.store[RESOURCE_ENERGY] > 0)) {

    if (Game.rooms.W48S2 !== undefined) {
      const roads = Game.rooms.W48S2.find(FIND_STRUCTURES, {
        filter: { structureType: STRUCTURE_ROAD }
      });
      const roadNeedToRepair = roads.find((object) => object.hits < object.hitsMax);
      if (roadNeedToRepair) {
        creep.memory.role = 'repair';
        roleRepair(creep);
      }
    }

    if (emptyTower) {
      // console.log('fill tower');
      creep.memory.role = 'fillTower';
      roleFillTower(creep);
    } else if (!emptyTower && !!Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY)) {
      // console.log('fill spawn');
      creep.memory.role = 'spawnRecovery';
      roleSpawnRecoverer(creep);
      // } else if (!emptyTower && !Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY) && !Memory.rooms.W48S3.role.allCreeps) {
      //   // console.log('fillExtensions');
      //   creep.memory.role = 'fillExtensions';
      //   roleFillExtensions(creep);
      // } else if (!emptyTower && !Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY) && target) {
      //   // console.log('building');
      //   creep.memory.role = 'build';
      //   roleBuilder(creep);
    } else if (!emptyTower) {
      // console.log('building');
      creep.memory.role = 'fillStorage';
      fillStorage(creep);
    }
    // else if (!emptyTower) {
    //   // console.log('upgrade controller');
    //   creep.memory.role = 'upgrade';
    //   roleUpgrader(creep);
    // }
  }
};
