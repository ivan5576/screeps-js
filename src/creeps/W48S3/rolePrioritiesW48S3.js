import { roleBuilder } from './role/roleBuilder';
import { roleHarvester } from './role/roleHarvester';
import { roleSpawnRecoverer } from './role/roleSpawnRecoverer';
import { roleUpgrader } from './role/roleUpgrader';
import { roleFillExtensions } from './role/fillExtensions';
import { fillStorage } from './role/fillStorage';
import { fillTower } from './role/fillTower';
import { fillLink } from './role/fillLink';
import { harvestLink } from './role/harvestLink';
import { harvestRemote } from './role/harvestRemote';

export const rolePrioritiesW48S3 = (creep) => {

  // spawn
  const emptySpawn = Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY) > 0;

  // creeps
  const creepGlobalRoleHarvester = creep.memory.globalRole === 'harvester';
  const creepGlobalRoleUpgrader = creep.memory.globalRole === 'upgrader';
  const creepGlobalRoleRemoteHarvester = creep.memory.globalRole === 'remoteHarvester';

  const creepRoleHarvest = creep.memory.role === 'harvest';
  const creepRoleHarvestLink = creep.memory.role === 'harvestLink';
  const creepRoleHarvestRemote = creep.memory.role === 'harvestRemote';
  const creepResourceEnergy = creep.store[RESOURCE_ENERGY];
  const creepFreeCapacity = creep.store.getFreeCapacity();
  // const creepsName = Object.keys(Memory.creeps);
  const hostilesCreepsArr = Game.rooms.W48S3.find(FIND_HOSTILE_CREEPS);

  // extensions
  const extensions = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  const emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));

  // links
  const linkFrom = Game.rooms['W48S3'].lookForAt('structure', 41, 43);
  const emptyLinkFrom = linkFrom[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0;

  // objects to build
  const objectsToBuildArr = Game.rooms.W48S3.find(FIND_CONSTRUCTION_SITES);

  // towers
  let towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));

  // storage
  const almostFullStorage = Game.rooms.W48S3.storage.store.getFreeCapacity(RESOURCE_ENERGY) < 200000;
  // console.log(creepGlobalRoleHarvester)
  // console.log(!hostilesCreepsArr.length)

  if (!hostilesCreepsArr.length) {
    // console.log(creepGlobalRoleHarvester)

    if (creepGlobalRoleHarvester) {
      if (!creepRoleHarvest && (creepResourceEnergy === 0)) {
        creep.memory.role = 'harvest';
        roleHarvester(creep);
      } else if (creepRoleHarvest && (creepFreeCapacity === 0)) {
        creep.memory.role = 'fillExtensions';
      } else if (creepRoleHarvest && (creepFreeCapacity > 0)) {
        roleHarvester(creep);
      } else if (!creepRoleHarvest && (creepResourceEnergy > 0)) {

        if (emptyExtension) {
          creep.memory.role = 'fillExtensions';
          roleFillExtensions(creep);
        } else if (emptyLinkFrom && !emptyExtension) {
          creep.memory.role = 'fillLink';
          fillLink(creep);
        } else if (!emptyLinkFrom && !emptyExtension && !!objectsToBuildArr.length) {
          creep.memory.role = 'build';
          roleBuilder(creep);
        }
      }
    } else if (creepGlobalRoleUpgrader) {

      if (!creepRoleHarvestLink && (creepResourceEnergy === 0)) {
        creep.memory.role = 'harvestLink';
        harvestLink(creep);
      } else if (creepRoleHarvestLink && (creepFreeCapacity === 0)) {
        creep.memory.role = 'spawnRecovery';
      } else if (creepRoleHarvestLink && (creepFreeCapacity > 0)) {
        harvestLink(creep);
      } else if (!creepRoleHarvestLink && (creepResourceEnergy > 0)) {

        if (emptySpawn) {
          creep.memory.role = 'spawnRecovery';
          roleSpawnRecoverer(creep);
        } else if (!emptySpawn && emptyTower) {
          creep.memory.role = 'fillTower';
          fillTower(creep);
        } else if (!emptySpawn && !emptyTower) {
          creep.memory.role = 'upgrade';
          roleUpgrader(creep);
        }
      }
    } else if (creepGlobalRoleRemoteHarvester) {

      if (!creepRoleHarvestRemote && (creepResourceEnergy === 0)) {
        creep.memory.role = 'harvestRemote';
        harvestRemote(creep);
      } else if (creepRoleHarvestRemote && (creepFreeCapacity === 0)) {
        creep.memory.role = 'fillStorage';
      } else if (creepRoleHarvestRemote && (creepFreeCapacity > 0)) {
        harvestRemote(creep);
      } else if (!creepRoleHarvestRemote && (creepResourceEnergy > 0)) {

        if (!!objectsToBuildArr.length) {
          creep.memory.role = 'build';
          roleBuilder(creep);
        } else if (!objectsToBuildArr.length && !almostFullStorage) {
          creep.memory.role = 'fillStorage';
          fillStorage(creep);
        } else if (!objectsToBuildArr.length && almostFullStorage) {
          creep.memory.role = 'upgrade';
          roleUpgrader(creep);
        }
      }
    }
  }
};
