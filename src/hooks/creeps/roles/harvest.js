export const harvest = (creep, gameRoomObj, flagWhenRoomUndef) => {
  const creepNotUndef = creep !== undefined;
  const gameRoomObjNotUndef = gameRoomObj !== undefined;
  const flagNotUndef = flagWhenRoomUndef !== undefined;
  const creepEmpty = creepNotUndef ? creep.store.getFreeCapacity() > 0 : null;
  const creepAlmostFull = creepNotUndef ? creep.store.getCapacity() > 100 : null;
  const creepFull = creepNotUndef ? creep.store.getFreeCapacity() === 0 : null;

  if (creepNotUndef && gameRoomObjNotUndef) {
    const creepInTargetRoom = creep.pos.roomName === gameRoomObj.name;

    if (creepInTargetRoom) {
      const nearestfilledSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

      if (creepEmpty && nearestfilledSource) {
        if (creep.harvest(nearestfilledSource) == ERR_NOT_IN_RANGE) {
          creep.moveTo(nearestfilledSource);
        }
      } else if ((creepAlmostFull && !nearestfilledSource) || creepFull) {
        creep.memory.role = 'goToNextTask';
      }

    } else if (!creepInTargetRoom && flagNotUndef) {
      creep.moveTo(flagWhenRoomUndef);

    } else return null;

  } else return null;

};
