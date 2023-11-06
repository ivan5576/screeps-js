export const upgrade = (creep) => {
  const creepNotUndef = creep !== undefined;
  const controllerNotUndef = creep.room.controller !== undefined;

  if (creepNotUndef && controllerNotUndef) {

    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }

  } else return null;

};
