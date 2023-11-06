import { attack } from './role/attack';
import { claim } from './role/claim';
import { wait } from './role/wait';
import { harvest } from '../../hooks/creeps/roles/harvest';
import { build } from '../../hooks/creeps/roles/build';
import { upgrade } from '../../hooks/creeps/roles/upgrade';
import { fillSpawn } from '../../hooks/creeps/roles/fillSpawn';
import { fillExtension } from '../../hooks/creeps/roles/fillExtension';
import { fillTower } from '../../hooks/creeps/roles/fillTower';
import { fillStorage } from '../../hooks/creeps/roles/fillStorage';
import { fillLink } from '../../hooks/creeps/roles/fillLink';

import { hasConstructionSites } from '../../hooks/constructions/checkEmptyOrExist/hasConstructionSites';
import { hasEmptyTowers } from '../../hooks/constructions/checkEmptyOrExist/hasEmptyTowers';
import { hasEmptyExtensions } from '../../hooks/constructions/checkEmptyOrExist/hasEmptyExtensions';
import { hasEmptyStorage } from '../../hooks/constructions/checkEmptyOrExist/hasEmptyStorage';

export const rolePriorities = (creep, gameRoomObj, roomFlag) => {

  const creepGlobalRole = creep.memory.globalRole ? creep.memory.globalRole : null;
  const creepRole = creep.memory.role ? creep.memory.role : null;

  if (creepGlobalRole && creepRole) {

    if (gameRoomObj) {

      // sources
      const sources = gameRoomObj.find(FIND_SOURCES);
      const sourceForUpgrade = sources[1]; // temporary hardcode!!!

      // creep globalRole
      const globalRoleWaiter = creepGlobalRole === 'waiter';
      const globalRoleClaimer = creepGlobalRole === 'claimer';
      const globalRoleAttackerLight = creepGlobalRole === 'attackerLight';
      const globalRoleTowerKeeper = creepGlobalRole === 'towerKeeper';
      const globalRoleHarvester = creepGlobalRole === 'harvester';
      const globalRoleUpgrader1 = creepGlobalRole === 'upgrader1';
      const globalRoleUpgrader2 = creepGlobalRole === 'upgrader2';
      const globalRoleharvesterW49S2 = creepGlobalRole === 'harvesterW49S2'; // temporary hardcode!!!

      // creep role and store
      let creepRole = creep.memory.role;
      const roleHarvest = creepRole === 'harvest';
      const creepEmpty = creep.store[RESOURCE_ENERGY] === 0;
      const creepNotEmpty = creep.store[RESOURCE_ENERGY] > 0;
      const creepNotFull = creep.store.getFreeCapacity() > 0;
      const creepFull = creep.store.getFreeCapacity() === 0;

      // constructions

      // construction sites
      const constructionSites = hasConstructionSites(gameRoomObj).length > 0 ? hasConstructionSites(gameRoomObj) : false;

      // spawn
      const spawn = Game.spawns['SpawnW49S2'] || null; // temporary hardcode!!!
      const emptySpawn = spawn ? spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0 : null; // temporary hardcode!!!

      // storage
      const emptyStorage = hasEmptyStorage(gameRoomObj);

      // extensions
      const extensions = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
      const emptyExtensions = hasEmptyExtensions(extensions);

      // towers
      const emptyTowers = hasEmptyTowers(gameRoomObj);

      towersRepairAndDefendW48S2(gameRoomObj);

      // links
      const links = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_LINK });
      const linkFrom = links[0]; // temporary hardcode!!!
      const linkTo = links[1]; // temporary hardcode!!!

      if (globalRoleTowerKeeper) {

        if (!roleHarvest && creepEmpty) {
          creepRole = 'harvest';
        } else if (roleHarvest && creepNotFull) {
          harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
        } else if (roleHarvest && creepFull) {
          creepRole = 'fillExtension';
        } else if (!roleHarvest && creepNotEmpty) {

          if (emptyExtensions) {
            creepRole = 'fillExtension';
            fillExtension(creep, emptyExtensions);
          } else if (!emptyExtensions && emptyTowers) {
            creepRole = 'fillTower';
            fillTower(creep, emptyTowers);
          } else if (!emptyExtensions && !emptyTowers && emptySpawn) {
            creepRole = 'fillSpawn';
            fillSpawn(creep, spawn);
          }

        }

      } else if (globalRoleHarvester || globalRoleharvesterW49S2) {

        if (!roleHarvest && creepEmpty) {
          creepRole = 'harvest';
        } else if (roleHarvest && creepNotFull) {
          harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
        } else if (roleHarvest && creepFull) {
          creepRole = 'fillStorage';
        } else if (!roleHarvest && creepNotEmpty) {

          if (emptyStorage) {
            creepRole = 'fillStorage';
            fillStorage(creep, emptyStorage);
          } else if (!emptyStorage && constructionSites) {
            creepRole = 'build';
            build(creep, constructionSites);
          } else if (!emptyStorage && !constructionSites) {
            creepRole = 'upgrade';
            upgrade(creep);
          }

        }

      } else if (globalRoleUpgrader1) {

        if (!roleHarvest && creepEmpty) {
          creepRole = 'harvest';
        } else if (roleHarvest && creepNotFull) {
          harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
        } else if (roleHarvest && creepFull) {
          creepRole = 'linkFrom';
        } else if (!roleHarvest && creepNotEmpty) {
          fillLink(creep);
        }

      } else if (globalRoleUpgrader2) {

        if (!roleHarvest && creepEmpty) {
          creepRole = 'harvest';
        } else if (roleHarvest && creepNotFull) {
          harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
        } else if (roleHarvest && creepFull) {
          creepRole = 'upgrade';
        } else if (!roleHarvest && creepNotEmpty) {
          upgrade(creep);
        }

      } else if (globalRoleWaiter) {
        creep.memory.role = 'wait';
        wait(creep);
      } else if (globalRoleAttackerLight) {
        creep.memory.role = 'attack';
        attack(creep);
      } else if (globalRoleClaimer) {
        claim(creep);
      }

    } else if (!gameRoomObj && roomFlag) {

      creep.moveTo(roomFlag);

    } else return null;

  } else return null;

};

const towersRepairAndDefendW48S2 = (gameRoomObj) => {
  const towers = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });

  const playerAttackIgnore = ['nrei'];
  const hostilesIgnoreNrei = creep.room.find(FIND_HOSTILE_CREEPS)
    .filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1);

  if (towers.length > 0) {
    const hostiles = towers[0].pos.findInRange(hostilesIgnoreNrei, 14);
    const invader = towers[0].pos.findClosestByRange(hostilesIgnoreNrei, {
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

        if ((structure.structureType === 'rampart') && (structure.hits < 300000)) {
          emptyRamparts.push(structure);
        } else if ((structure.structureType === 'constructedWall') && (structure.hits < 300000)) {
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
