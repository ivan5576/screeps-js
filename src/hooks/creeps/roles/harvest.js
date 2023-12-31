import { logger } from "../../../util/logger";
import { findSoonActiveSource } from "../../room/findSoonActiveSource";

export const harvest = (creep, gameRoomObj, flagWhenRoomUndef, sourceForUpgrade, linkTo) => {

  if (creep && gameRoomObj) {

    const creepInTargetRoom = creep.pos.roomName === gameRoomObj.name;

    // creep in target room
    if (creepInTargetRoom) {

      const creepEmpty = creep.store.getFreeCapacity() > 0;
      const creepAlmostFull = creep.store.getCapacity() > 100;
      const creepFull = creep.store.getFreeCapacity() === 0;
      const creepGlobalRole = Memory.creeps[creep.name].globalRole ? Memory.creeps[creep.name].globalRole : null;

      const globalRoleTowerKeeper = creepGlobalRole === 'towerKeeper';
      const globalRoleHarvester = creepGlobalRole === 'harvester';
      const globalRoleUpgrader1 = creepGlobalRole === 'upgrader1';
      const globalRoleUpgrader2 = creepGlobalRole === 'upgrader2';
      const globalRoleRemoteHarvester = creepGlobalRole === 'remoteHarvester';

      // storage is exist
      const storage = gameRoomObj.storage ? gameRoomObj.storage : null;

      // globalRole === towerKeeper
      if (globalRoleTowerKeeper) {

        if (storage) {

          const storageHasEnergy = gameRoomObj.storage.store[RESOURCE_ENERGY] > 0;

          if (storageHasEnergy) {

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storage);
            }

          }
        }

        // globalRole === harvester
      } else if (globalRoleHarvester) {

        const closestActiveSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

        if (creepEmpty && closestActiveSource) {
          if (creep.harvest(closestActiveSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestActiveSource);
          }
        } else if ((creepAlmostFull && !closestActiveSource) || creepFull) {
          creep.memory.role = 'goToNextTask';

        } else if (creepEmpty && !closestActiveSource) {
          const soonActiveSource = findSoonActiveSource(creep);
          if (soonActiveSource) {
            creep.moveTo(soonActiveSource);
          }
        }
      } else if (globalRoleUpgrader1 && sourceForUpgrade) {

        if (creep.harvest(sourceForUpgrade) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sourceForUpgrade);
        }

      } else if (globalRoleUpgrader2) {

        if (linkTo && (linkTo.structureType === 'link')) {

          const linkToHasEnergy = linkTo.store[RESOURCE_ENERGY] > 0;
          const storageHasEnergy = gameRoomObj.storage.store[RESOURCE_ENERGY] > 0;

          if (linkToHasEnergy) {

            if (creep.withdraw(Game.getObjectById(linkTo.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(linkTo);
            }

          } else if (!linkToHasEnergy && storageHasEnergy) {

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storage);
            }

          }

        } else return null;

      } else if (globalRoleRemoteHarvester) {

        const closestActiveSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

        if (creepEmpty && closestActiveSource) {
          if (creep.harvest(closestActiveSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestActiveSource);
          }
        } else if ((creepAlmostFull && !closestActiveSource) || creepFull) {
          creep.memory.role = 'goToNextTask';

        } else if (creepEmpty && !closestActiveSource) {
          const soonActiveSource = findSoonActiveSource(creep);
          if (soonActiveSource) {
            creep.moveTo(soonActiveSource);
          }
        }

      } else return null;

    } else if (!creepInTargetRoom && flagWhenRoomUndef) {

      creep.moveTo(flagWhenRoomUndef);

    } else return null;

  } else if (creep && !gameRoomObj && flagWhenRoomUndef) {

    creep.moveTo(flagWhenRoomUndef);

  } else return null;

};
