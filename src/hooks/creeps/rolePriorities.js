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
import { hasEmptySpawn } from '../constructions/checkEmptyOrExist/hasEmptySpawn';
import { logger } from '../../util/logger';

export const rolePriorities = (creep, gameRoomObj, roomFlag, remoteHarvestFlag) => {

  if (creep) {

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
        const globalRoleRemoteHarvester = creepGlobalRole === 'remoteHarvester';

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
        // const linkFromNotEmpty = linkFrom.store[RESOURCE_ENERGY] > 0;

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

            const emptySpawn = hasEmptySpawn(gameRoomObj);

            if (emptyExtensions) {
              creepRole = 'fillExtension';
              fillExtension(creep, emptyExtensions);
            } else if (!emptyExtensions && emptyTowers) {
              creepRole = 'fillTower';
              fillTower(creep, emptyTowers);
            } else if (!emptyExtensions && !emptyTowers && emptySpawn) {
              creepRole = 'fillSpawn';
              fillSpawn(creep, emptySpawn);
            } else if (!emptyExtensions && !emptyTowers && !emptySpawn) {
              creepRole = 'upgrade';
              upgrade(creep);
            }
          }

        } else if (globalRoleHarvester) {

          if (!roleHarvest && creepEmpty) {
            creepRole = 'harvest';
          } else if (roleHarvest && creepNotFull) {
            harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
          } else if (roleHarvest && creepFull) {
            creepRole = 'fillStorage';
          } else if (!roleHarvest && creepNotEmpty) {

            if (constructionSites) {
              creepRole = 'build';
              build(creep, constructionSites);
            } else if (!constructionSites && emptyStorage) {
              creepRole = 'fillStorage';
              fillStorage(creep, emptyStorage);
            } else if (!constructionSites && !emptyStorage) {
              creepRole = 'upgrade';
              upgrade(creep);
            }

          }

        } else if (globalRoleUpgrader1) {

          const sourceHasEnergy = sourceForUpgrade.energy;

          if (!roleHarvest && creepEmpty) {
            creepRole = 'harvest';
          } else if (roleHarvest && creepNotFull) {

            if (sourceHasEnergy) {
              harvest(creep, gameRoomObj, roomFlag, sourceForUpgrade, linkTo);
            } else if (!sourceHasEnergy) {
              creepRole = 'linkFrom';
            }

          } else if (roleHarvest && creepFull) {
            creepRole = 'linkFrom';
          } else if (!roleHarvest && creepNotEmpty) {
            fillLink(creep, linkFrom);
          }

        } else if (globalRoleUpgrader2) {

          if (!roleHarvest && creepEmpty) {
            creepRole = 'harvest';
          } else if (roleHarvest && creepNotFull) {

            const storageNotEmpty = gameRoomObj.storage ? gameRoomObj.storage.store[RESOURCE_ENERGY] > 100000 : null;

            if (linkToNotEmpty || storageNotEmpty) {
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
        } else if (globalRoleRemoteHarvester) {

          if (remoteHarvestFlag) {

            const remoteGameRoomObj = Game.rooms[remoteHarvestFlag.pos.roomName] ? Game.rooms[remoteHarvestFlag.pos.roomName] : null;

            if (!roleHarvest && creepEmpty) {
              creepRole = 'harvest';
            } else if (roleHarvest && creepNotFull) {
              harvest(creep, remoteGameRoomObj, remoteHarvestFlag);
            } else if (roleHarvest && creepFull) {
              creepRole = 'upgrade';
            } else if (!roleHarvest && creepNotEmpty) {
              creepRole = 'upgrade';
              upgrade(creep);
            }

          }

        }

        creep.memory.role = creepRole;

      } else if (!gameRoomObj && roomFlag) {

        creep.moveTo(roomFlag);

      } else return null;

    } else return null;

  } else return null;

};
