import { harvest } from '../../hooks/creeps/roles/harvest';
import { attack } from './role/attack';
import { claim } from './role/claim';
import { upgrade } from './role/upgrade';
import { wait } from './role/wait';
import { build } from '../../hooks/creeps/roles/build';

import { hasConstructionSites } from '../../hooks/constructions/hasConstructionSites';
import { hasEmptyTowers } from '../../hooks/constructions/hasEmptyTowers';
import { hasEmptyExtensions } from '../../hooks/constructions/hasEmptyExtensions';

import { fillExtensions } from '../../hooks/creeps/roles/fillExtensions';
import { fillTower } from '../../hooks/creeps/roles/fillTower';

export const rolePrioritiesW49S2 = (creep) => {

  // flags
  const flagW49S2 = Game.flags.GatherPoint;

  // creeps

  const creepGlobalRoleWaiter = creep.memory.globalRole === 'waiter';
  const creepGlobalRoleClaimer = creep.memory.globalRole === 'claimer';
  const creepGlobalRoleAttackerLight = creep.memory.globalRole === 'attackerLight';
  const creepGlobalRoleHarvester = creep.memory.globalRole === 'harvesterW49S2';
  // const creepGlobalUpgrader = creep.memory.globalRole === 'upgrader';
  // const creepGlobalRoleFillerTower = creep.memory.globalRole === 'fillerTower';

  const creepRoleHarvest = creep.memory.role === 'harvestW49S2';
  const creepResourceEnergy = creep.store[RESOURCE_ENERGY];
  const creepFreeCapacity = creep.store.getFreeCapacity();

  // constructions

  // Game.room object
  const gameW49S2 = Game.rooms.W49S2 || null;

  // construction sites
  const constructionSites = gameW49S2 ? hasConstructionSites(gameW49S2) : null;

  // spawn
  const gameSpawnW49S2 = Game.spawns['SpawnW49S2'] || null;
  // const emptySpawn = gameSpawnW49S2 ? gameSpawnW49S2.store.getFreeCapacity(RESOURCE_ENERGY) > 0 : null;
  const emptySpawn = false;

  // Game.spawns.filter(spawn => spawn.r)

  // storage
  const isStorageExist = gameW49S2 ? Game.rooms.W49S2.storage !== undefined : null;
  const storage = isStorageExist ? gameSpawnW49S2.storage : null;
  const emptyStorage = storage ? storage.store.getFreeCapacity(RESOURCE_ENERGY) === 0 : null;

  // extensions
  const extensions = gameW49S2 ? (_.filter(gameW49S2.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION })) : null;
  const emptyExtensions = hasEmptyExtensions(extensions);

  // towers
  const emptyTowers = gameW49S2 ? hasEmptyTowers(gameW49S2) : null;

  const towersRepairAndDefendW48S2 = (gameRoomObj) => {
    const towers = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });

    if (towers.length > 0) {
      const hostiles = towers[0].pos.findInRange(FIND_HOSTILE_CREEPS, 14);
      const invader = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: { owner: { username: 'Invader' } }
      }) || [];
      const allHostiles = hostiles.concat(invader);
      const hasHostiles = allHostiles.length;

      if (hasHostiles) {

        towers.forEach(tower => tower.attack(allHostiles[0]));

      } else if (!hasHostiles) {

        const allStructures = gameRoomObj.find(FIND_STRUCTURES);
        let emptyWalls = [];
        let emptyRamparts = [];
        let emptyRoads = [];
        let towers = [];

        allStructures.forEach((structure) => {

          if ((structure.structureType === 'rampart') && (structure.hits < 600000)) {
            emptyRamparts.push(structure);
          } else if ((structure.structureType === 'constructedWall') && (structure.hits < 600000)) {
            emptyWalls.push(structure);
          } else if ((structure.structureType === 'road') && (structure.hits < structure.hitsMax)) {
            emptyRoads.push(structure);
          } else if (structure.structureType === 'tower') {
            towers.push(structure);
          }
        });

        // all empty structures
        const allRepairStructures = emptyWalls.concat(emptyRamparts, emptyRoads);
        // console.log('W49S3 need to repair ' + allRepairStructures.length + ' structures');

        if (allRepairStructures.length) {
          towers.forEach(tower => tower.repair(allRepairStructures[0]));
        }
      }
    } else return null;
    // console.log('Err. in \'towersRepairAndDefendW48S2\' function!')

  };
  towersRepairAndDefendW48S2(gameW49S2);

  // links
  // const linkFrom = Game.rooms['W49S3'].lookForAt('structure', 20, 8)[0];
  // const linkTo = Game.rooms['W49S3'].lookForAt('structure', 11, 25)[0];
  // const emptyLinkFrom = linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  // const emptyLinkTo = linkTo.store[RESOURCE_ENERGY] == 0;


  if (creepGlobalRoleWaiter) {
    creep.memory.role = 'wait';
    wait(creep);
  } else if (creepGlobalRoleAttackerLight) {
    creep.memory.role = 'attack';
    attack(creep);
  } else if (creepGlobalRoleHarvester) {

    if (!creepRoleHarvest && (creepResourceEnergy === 0)) {
      creep.memory.role = 'harvestW49S2';
      harvest(creep, gameW49S2, flagW49S2);
    } else if (creepRoleHarvest && (creepFreeCapacity === 0)) {
      creep.memory.role = 'fillExtensions';
    } else if (creepRoleHarvest && (creepFreeCapacity > 0)) {
      harvest(creep, gameW49S2, flagW49S2);
    } else if (!creepRoleHarvest && (creepResourceEnergy > 0)) {

      if (emptyExtensions) {
        creep.memory.role = 'fillExtensions';
        fillExtensions(creep, emptyExtensions);
      } else if (!emptyExtensions && emptySpawn) {
        creep.memory.role = 'fillSpawn';
        // fillSpawn(creep);
      } else if (!emptyExtensions && !emptySpawn && emptyTowers) {
        creep.memory.role = 'fillTower';
        fillTower(creep, emptyTowers);
      } else if (!emptyExtensions && !emptySpawn && !emptyTowers && constructionSites) {
        creep.memory.role = 'build';
        build(creep, constructionSites);
      } else if (!emptyExtensions && !emptySpawn && !emptyTowers && !constructionSites && emptyStorage) {
        creep.memory.role = 'fillStorage';
        // fillStorage(creep);
      } else if (!emptyExtensions && !emptySpawn && !emptyTowers && !constructionSites && !emptyStorage) {
        creep.memory.role = 'upgrade';
        upgrade(creep);
      }

    }

  } else if (creepGlobalRoleClaimer) {
    claim(creep);
  }

};
