export const harvest = (creep, gameRoomObj, flagWhenRoomUndef) => {
  if ((creep !== undefined) && (gameRoomObj !== undefined)) {
    const nearestfilledSources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if ((creep.store.getFreeCapacity() > 0) && nearestfilledSources) {
      if (creep.harvest(nearestfilledSources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(nearestfilledSources);
      }

    } else if ((creep.store.getCapacity() > 100) && !nearestfilledSources) {
      creep.memory.role = 'goToNextTask';

    } else if (creep.store.getFreeCapacity() === 0) {
      creep.memory.role = 'goToNextTask';
    }

  } else if ((gameRoomObj === undefined) && (flagWhenRoomUndef !== undefined)) {
    creep.moveTo(flagWhenRoomUndef);

  } else return null;

};
