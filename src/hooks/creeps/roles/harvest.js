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
      const globalRoleharvesterW49S2 = creepGlobalRole === 'harvesterW49S2';  // temporary role

      // globalRole === towerKeeper
      if (globalRoleTowerKeeper) {

        const storage = gameRoomObj.storage ? gameRoomObj.storage : null;

        if (storage) {

          const storageHasEnergy = gameRoomObj.storage.store[RESOURCE_ENERGY] > 0;

          if (storageHasEnergy) {

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storage);
            }

          }
        }



        // globalRole === harvester
      } else if (globalRoleHarvester || globalRoleharvesterW49S2) {

        const closestActiveSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

        if (creepEmpty && closestActiveSource) {
          if (creep.harvest(closestActiveSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestActiveSource);
          }
        } else if ((creepAlmostFull && !closestActiveSource) || creepFull) {
          creep.memory.role = 'goToNextTask';

        } else if (creepEmpty && !closestActiveSource) {
          const soonActiveSource = findSoonActiveSource();
          if (soonActiveSource) {
            creep.moveTo(soonActiveSource);
          }
        }
      } else if (globalRoleUpgrader1 && sourceForUpgrade) {

        const sourceHasEnergy = sourceForUpgrade.energy;

        if (sourceHasEnergy) {

          if (creep.harvest(sourceForUpgrade) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sourceForUpgrade);
          }

        } else if (!sourceHasEnergy && creepAlmostFull) {
          creep.memory.role = 'fillLink';
        }

      } else if (globalRoleUpgrader2) {

        if (linkTo && (linkTo.length > 0) && (linkTo.structureType === 'link')) {

          const linkToHasEnergy = linkTo.store[RESOURCE_ENERGY] > 0;

          if (creepEmpty && linkToHasEnergy) {

            if (creep.withdraw(Game.getObjectById(linkTo.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(linkTo);
            }

          }

        } else return null;

      } else return null;

    } else if (!creepInTargetRoom && flagWhenRoomUndef) {

      creep.moveTo(flagWhenRoomUndef);

    } else return null;
  } else return null;

  const findSoonActiveSource = () => {
    const ticksToRegeneration = [];
    const sources = creep.pos.find(FIND_SOURCES);
    sources.forEach(source => ticksToRegeneration.push(source.ticksToRegeneration));

    const findIdxSource = () => {
      let minNum = Infinity;
      let idxOfMinNum = -1;

      for (let i = 0; i < ticksToRegeneration.length; i++) {
        if (ticksToRegeneration[i] < minNum) {
          minNum = ticksToRegeneration[i];
          idxOfMinNum = i;
        }
      }
      return idxOfMinNum;
    }
    return findIdxSource() !== -1 ? sources[findIdxSource()] : null;
  }

};
