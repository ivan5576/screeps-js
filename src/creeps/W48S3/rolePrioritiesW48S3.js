import { roleBuilder } from './role/roleBuilder';
import { roleHarvester } from './role/roleHarvester';
import { roleSpawnRecoverer } from './role/roleSpawnRecoverer';
import { roleUpgrader } from './role/roleUpgrader';
import { roleFillExtensions } from './role/fillExtensions';
// import { roleFillTower } from './role/fillTower';
import { fillLink } from './role/fillLink';

export const rolePrioritiesW48S3 = (creep, name) => {
  // has empty extensions
  const extensions = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  const emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));
  // has empty towers
  let towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));
  // console.log(emptyTower);

  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  // const target = 0;
  const numOfAllCreeps = Game.rooms['W48S3'].memory.role.allCreeps;
  const creepsName = Object.keys(Memory.creeps);
  // console.log(creepsName[4]);

  const link = Game.rooms['W48S3'].lookForAt('structure', 41, 43);
  const emptyLink = link[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  const emptySpawn = Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  // console.log(emptySpawn)


  if (!(creep.memory.role == 'harvest') && (creep.store[RESOURCE_ENERGY] == 0)) {
    creep.memory.role = 'harvest';
    roleHarvester(creep);
  } else if ((creep.memory.role == 'harvest') && (creep.store.getFreeCapacity() == 0)) {
    creep.memory.role = 'upgrade';
  } else if ((creep.memory.role == 'harvest') && (creep.store.getFreeCapacity() > 0)) {
    roleHarvester(creep);
  } else if (!(creep.memory.role == 'harvest') && (creep.store[RESOURCE_ENERGY] > 0)) {

    if (emptyExtension) {
      // console.log('fill extensions');
      creep.memory.role = 'fillExtensions';
      roleFillExtensions(creep);
    } else if (emptyLink && !emptyExtension) {
      creep.memory.role = 'fillLink';
      fillLink(creep);
    } else if (!emptyLink && !emptyExtension && emptySpawn) {
      // console.log('fill spawn');
      creep.memory.role = 'spawnRecovery';
      roleSpawnRecoverer(creep);
      // } else if (emptyTower && !emptyExtension) {
      //   console.log('fillTower - ' + name)
      //   creep.memory.role = 'fillTower';
      //   roleFillTower(creep);
    } else if (!emptyLink && !emptyExtension && !emptySpawn && target) {
      // console.log('building');
      creep.memory.role = 'build';
      roleBuilder(creep);
    } else if (!emptyLink && !emptyExtension && !emptySpawn && !target) {
      // console.log('upgrade controller');
      creep.memory.role = 'upgrade';
      roleUpgrader(creep);
    }
  }
};
