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
import { build } from '../W49S3/role/build';
// import { logger } from '../../util/logger';

export const rolePrioritiesW48S3 = (creep) => {

  // spawn
  const emptySpawn = Game.spawns['SpawnOne'].store.getFreeCapacity(RESOURCE_ENERGY) > 0;

  // creeps
  const creepGlobalRoleHarvester = creep.memory.globalRole === 'harvester';
  const creepGlobalRoleUpgrader = creep.memory.globalRole === 'upgrader';
  const creepGlobalRoleFillerTower = creep.memory.globalRole === 'fillerTower';
  const creepGlobalRoleRemoteHarvester = creep.memory.globalRole === 'remoteHarvester';
  const creepGlobalRoleReserver = creep.memory.globalRole === 'reserver';

  const creepRoleHarvest = creep.memory.role === 'harvest';
  const creepRoleHarvestLink = creep.memory.role === 'harvestLink';
  const creepRoleHarvestRemote = creep.memory.role === 'harvestRemote';
  const creepResourceEnergy = creep.store[RESOURCE_ENERGY];
  const creepFreeCapacity = creep.store.getFreeCapacity();
  // const creepsName = Object.keys(Memory.creeps);
  const hostilesCreepsInW48S3 = Game.rooms.W48S3.find(FIND_HOSTILE_CREEPS);

  // extensions
  const extensions = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  const emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));

  // links
  const linkFrom = Game.rooms['W48S3'].lookForAt('structure', 41, 43)[0];
  const linkTo = Game.rooms['W48S3'].lookForAt('structure', 12, 32)[0];
  const emptyLinkFrom = linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  const emptyLinkTo = linkTo.store[RESOURCE_ENERGY] == 0;

  // objects to build
  const objectsToBuildArr = Game.rooms.W48S3.find(FIND_CONSTRUCTION_SITES);

  // towers
  let towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));

  // storage
  const almostFullStorage = Game.rooms.W48S3.storage.store.getFreeCapacity(RESOURCE_ENERGY) < 200000;
  // console.log(creepGlobalRoleHarvester)
  // console.log(!hostilesCreepsArr.length)

  if (true) {
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
        } else if (!emptyExtension && emptySpawn && !Memory.rooms.W48S3.globalRole['upgrader']) {
          creep.memory.role = 'spawnRecovery';
          roleSpawnRecoverer(creep);
        } else if (emptyLinkFrom && !emptyExtension && (!emptySpawn || !!Memory.rooms.W48S3.globalRole['upgrader'])) {
          creep.memory.role = 'fillLink';
          fillLink(creep);
        } else if (!emptyLinkFrom && !emptyExtension && !!objectsToBuildArr.length && (!emptySpawn || !!Memory.rooms.W48S3.globalRole['upgrader'])) {
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
        } else if (!emptySpawn && !!objectsToBuildArr.length) {
          creep.memory.role = 'build';
          build(creep);
        } else if (!emptySpawn && !objectsToBuildArr.length) {
          creep.memory.role = 'upgrade';
          roleUpgrader(creep);
        }
      }

    } else if (creepGlobalRoleFillerTower) {

      if (!creepRoleHarvestLink && (creepResourceEnergy === 0)) {
        creep.memory.role = 'harvestLink';
        harvestLink(creep);
      } else if (creepRoleHarvestLink && (creepFreeCapacity === 0)) {
        creep.memory.role = 'fillTower';
      } else if (creepRoleHarvestLink && (creepFreeCapacity > 0)) {
        harvestLink(creep);
      } else if (!creepRoleHarvestLink && (creepResourceEnergy > 0)) {

        if (emptyTower) {
          creep.memory.role = 'fillTower';
          fillTower(creep);
        }
      }

    } else if (creepGlobalRoleRemoteHarvester) {

      if (Game.rooms.W48S2) {
        const hasEnemies = Game.rooms.W48S2.find(FIND_HOSTILE_CREEPS).length;
        if (true) {
          if ((!creepRoleHarvestRemote && (creepResourceEnergy === 0)) || (creepRoleHarvestRemote && (creepFreeCapacity > 0))) {
            creep.memory.role = 'harvestRemote';
            harvestRemote(creep);
          }
        } else {
          const remoteHarvesterWaitPos = new RoomPosition(11, 23, 'W48S3');
          if (!creepRoleHarvestRemote && (creepResourceEnergy === 0)) {
            if (creep.pos !== Game.rooms.W48S3.remoteHarvesterWaitPos) {
              creep.moveTo(Game.rooms.W48S3.remoteHarvesterWaitPos);
            }
          } else if (creepRoleHarvestRemote && (creepFreeCapacity > 0)) {
            creep.memory.role = 'fillStorage';
          }
        }
      } else {
        const remoteHarvesterWaitPos = new RoomPosition(11, 23, 'W48S3');
        if (!creepRoleHarvestRemote && (creepResourceEnergy === 0)) {
          if (creep.pos !== Game.rooms.W48S3.remoteHarvesterWaitPos) {
            creep.moveTo(Game.rooms.W48S3.remoteHarvesterWaitPos);
          }
        } else if (creepRoleHarvestRemote && (creepFreeCapacity > 0)) {
          creep.memory.role = 'fillStorage';
        }
      }

      if (creepRoleHarvestRemote && (creepFreeCapacity === 0)) {
        creep.memory.role = 'fillStorage';
      } else if (!creepRoleHarvestRemote && (creepResourceEnergy > 0)) {

        if (objectsToBuildArr.length) {
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

    } else if (creepGlobalRoleReserver) {

      if (creep.pos !== Game.flags.W48S2reserver.pos) {
        creep.moveTo(Game.flags.W48S2reserver);
      }

    }
  }
};
