import { attack } from './../../creeps/W49S2/role/attack';
import { claim } from '../../creeps/W49S2/role/claim';
import { wait } from '../../creeps/W49S2/role/wait';
import { harvest } from './roles/harvest';
import { build } from './roles/build';
import { upgrade } from './roles/upgrade';
import { fillSpawn } from './roles/fillSpawn';
import { fillExtension } from './roles/fillExtension';
import { fillTower } from './roles/fillTower';
import { fillStorage } from './roles/fillStorage';
import { fillLink } from './roles/fillLink';

import { hasConstructionSites } from '../constructions/checkEmptyOrExist/hasConstructionSites';
import { hasEmptyTowers } from '../constructions/checkEmptyOrExist/hasEmptyTowers';
import { hasEmptyExtensions } from '../constructions/checkEmptyOrExist/hasEmptyExtensions';
import { hasEmptyStorage } from '../constructions/checkEmptyOrExist/hasEmptyStorage';
import { logger } from '../../util/logger';

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
      const constructionSites = hasConstructionSites(gameRoomObj);

      // spawn
      const spawn = Game.spawns['SpawnW49S3'] || null; // temporary hardcode!!!
      const emptySpawn = spawn ? spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0 : null; // temporary hardcode!!!

      // storage
      const emptyStorage = hasEmptyStorage(gameRoomObj);

      // extensions
      const extensions = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
      const emptyExtensions = hasEmptyExtensions(extensions);

      // towers
      const emptyTowers = hasEmptyTowers(gameRoomObj);

      // links
      const links = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_LINK });
      const linkFrom = links[0]; // temporary hardcode!!!
      const linkTo = links[1]; // temporary hardcode!!!
      const linkToNotEmpty = linkTo.store[RESOURCE_ENERGY] > 0;

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
            // } else if (!emptyExtensions && !emptyTowers && emptySpawn) {
            //   creepRole = 'fillSpawn';
            //   fillSpawn(creep, spawn);
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
          fillLink(creep, linkFrom);
        }

      } else if (globalRoleUpgrader2) {

        if (!roleHarvest && creepEmpty) {
          creepRole = 'harvest';
        } else if (roleHarvest && creepNotFull) {

          if (linkToNotEmpty) {
            // creep.moveTo(roomFlag);
            harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
          } else {
            creepRole = 'upgrade';
          }

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

      creep.memory.role = creepRole;

    } else if (!gameRoomObj && roomFlag) {

      creep.moveTo(roomFlag);

    } else return null;

  } else return null;

};
