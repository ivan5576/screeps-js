// import { reserveController } from './role/reserveController';
import { harvest } from './role/harvest';
import { harvestLink } from './role/harvestLink';
import { harvestSourceOne } from './role/harvestSourceOne';
import { harvestForFillerTower } from './role/harvestForFillerTower';
import { wait } from './role/wait';
import { attack } from './role/attack';
// import { heal } from './role/heal';
import { fillSpawn } from './role/fillSpawn';
import { fillExtensions } from './role/fillExtensions';
import { fillLink } from './role/fillLink';
import { fillTower } from './role/fillTower';
import { build } from './role/build';
import { upgrade } from './role/upgrade';
import { fillStorage } from './role/fillStorage';

export const rolePrioritiesW49S3 = (creep) => {

  // spawn
  const emptySpawn = Game.spawns['SpawnW49S3'].store.getFreeCapacity(RESOURCE_ENERGY) > 0;

  // creeps
  // const creepGlobalRoleReserver = creep.memory.globalRole === 'reserver';
  const creepGlobalRoleAttacker = creep.memory.globalRole === 'attacker';
  const creepGlobalRoleHarvester = creep.memory.globalRole === 'harvester';
  const creepGlobalRoleHarvesterToLink = creep.memory.globalRole === 'harvesterToLink';
  const creepGlobalUpgrader = creep.memory.globalRole === 'upgrader';
  const creepGlobalRoleFillerTower = creep.memory.globalRole === 'fillerTower';


  const creepRoleHarvest = creep.memory.role === 'harvest';
  const creepRoleHarvestSourceOne = creep.memory.role === 'harvestSourceOne';
  const creepRoleHarvestLink = creep.memory.role === 'harvestLink';
  const creepResourceEnergy = creep.store[RESOURCE_ENERGY];
  const creepFreeCapacity = creep.store.getFreeCapacity();
  // const creepsName = Object.keys(Memory.creeps);
  const hostilesCreepsArr = Game.rooms.W49S3.find(FIND_HOSTILE_CREEPS);
  // const damagedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
  //   filter: function (object) {
  //     return object.hits < object.hitsMax;
  //   }
  // });

  // objects to build
  const objectsToBuildArr = Game.rooms.W49S3.find(FIND_CONSTRUCTION_SITES);

  // storage
  const almostFullStorage = Game.rooms.W49S3.storage.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
  // console.log(!almostFullStorage)
  // console.log(!hostilesCreepsArr.length)

  // extensions
  const extensions = _.filter(Game.spawns['SpawnW49S3'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  const emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));

  // links
  // const linkFrom = Game.rooms['W49S3'].lookForAt('structure', 20, 8)[0];
  // const linkTo = Game.rooms['W49S3'].lookForAt('structure', 11, 25)[0];
  // const emptyLinkFrom = linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  // const emptyLinkTo = linkTo.store[RESOURCE_ENERGY] == 0;

  // towers
  let towers = _.filter(Game.spawns['SpawnW49S3'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  // let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));
  let emptyTowers = true;

  const firstTowerEnergy = towers[0].store[RESOURCE_ENERGY];
  const secondTowerEnergy = towers[1].store[RESOURCE_ENERGY];
  const thirdTowerEnergy = towers[2].store[RESOURCE_ENERGY];

  if ((firstTowerEnergy > 800) && (secondTowerEnergy > 800) && (thirdTowerEnergy > 800)) {
    emptyTowers = false;
  }

  if (creepGlobalRoleAttacker) {

    if (!creepRoleHarvest && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvest';
      harvest(creep);
    } else if (creepRoleHarvest && (creepFreeCapacity === 0) && !hostilesCreepsArr.length) {
      creep.memory.role = 'wait';
      wait(creep);
    } else if (!creepRoleHarvest && (creepFreeCapacity === 0) && !hostilesCreepsArr.length) {
      creep.memory.role = 'wait';
      wait(creep);
    } else if (creepRoleHarvest && (creepFreeCapacity > 0) && !hostilesCreepsArr.length) {
      harvest(creep);
    } else if (!creepRoleHarvest && (creepResourceEnergy > 0) && !!hostilesCreepsArr.length) {
      creep.memory.role = 'attack';
      attack(creep);
    }

  } else if (creepGlobalRoleHarvester) {

    if (!creepRoleHarvest && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvest';
      harvest(creep);
    } else if (creepRoleHarvest && (creepFreeCapacity === 0)) {
      creep.memory.role = 'fillExtensions';
    } else if (creepRoleHarvest && (creepFreeCapacity > 0)) {
      harvest(creep);
    } else if (!creepRoleHarvest && (creepResourceEnergy > 0)) {

      if (emptyExtension) {
        creep.memory.role = 'fillExtensions';
        fillExtensions(creep);
      } else if (!emptyExtension && !!emptySpawn) {
        creep.memory.role = 'fillSpawn';
        fillSpawn(creep);
      } else if (!emptyExtension && !emptySpawn && !!emptyTowers && !Memory.rooms.W49S3.globalRole['fillerTower']) {
        // } else if (!emptyExtension && !emptySpawn && !!emptyTower) {
        creep.memory.role = 'fillTower';
        fillTower(creep);
      } else if (!emptyExtension && !emptySpawn && (!!Memory.rooms.W49S3.globalRole['fillerTower'] || !emptyTowers) && !!objectsToBuildArr.length) {
        // } else if (!emptyExtension && !emptySpawn && !emptyTower && !!objectsToBuildArr.length) {
        creep.memory.role = 'build';
        build(creep);
      } else if (!emptyExtension && !emptySpawn && (!!Memory.rooms.W49S3.globalRole['fillerTower'] || !emptyTowers) && !objectsToBuildArr.length && !almostFullStorage) {
        // } else if (!emptyExtension && !emptySpawn && !emptyTower && !objectsToBuildArr.length && !almostFullStorage) {
        creep.memory.role = 'fillStorage';
        fillStorage(creep);
      } else if (!emptyExtension && !emptySpawn && (!!Memory.rooms.W49S3.globalRole['fillerTower'] || !emptyTowers) && !objectsToBuildArr.length && almostFullStorage) {
        // } else if (!emptyExtension && !emptySpawn && !emptyTower && !objectsToBuildArr.length && almostFullStorage) {
        creep.memory.role = 'upgrade';
        upgrade(creep);
      }
    }
  } else if (creepGlobalRoleHarvesterToLink) {

    if (!creepRoleHarvestSourceOne && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvestSourceOne';
      harvestSourceOne(creep);
    } else if (creepRoleHarvestSourceOne && (creepFreeCapacity === 0)) {
      creep.memory.role = 'fillLink';
      fillLink(creep);
    } else if (creepRoleHarvestSourceOne && (creepFreeCapacity > 0)) {
      harvestSourceOne(creep);
    } else if (!creepRoleHarvestSourceOne && (creepResourceEnergy > 0)) {
      fillLink(creep);
    }
  } else if (creepGlobalUpgrader) {

    if (!creepRoleHarvestLink && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvestLink';
      harvestLink(creep);
    } else if (creepRoleHarvestLink && (creepFreeCapacity === 0)) {
      creep.memory.role = 'upgrade';
      upgrade(creep);
    } else if (creepRoleHarvestLink && (creepFreeCapacity > 0)) {
      harvestLink(creep);
    } else if (!creepRoleHarvestLink && (creepResourceEnergy > 0)) {
      upgrade(creep);
    }
  } else if (creepGlobalRoleFillerTower) {

    if (!creepRoleHarvest && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvestForFillerTower';
      harvestForFillerTower(creep);
    } else if (creepRoleHarvest && (creepFreeCapacity === 0)) {
      creep.memory.role = 'fillTower';
    } else if (creepRoleHarvest && (creepFreeCapacity > 0)) {
      harvestForFillerTower(creep);
    } else if (!creepRoleHarvest && (creepResourceEnergy > 0)) {

      if (emptyTowers) {
        creep.memory.role = 'fillTower';
        fillTower(creep);
      } else if (!emptyTowers && emptyExtension) {
        // creep.moveTo(12, 18, 'W49S3');
        creep.memory.role = 'fillExtensions';
        fillExtensions(creep);
      } else if (!emptyTowers && !emptyExtension) {
        creep.moveTo(12, 18, 'W49S3');
      }
    }
  }
};
