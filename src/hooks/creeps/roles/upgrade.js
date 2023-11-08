import { logger } from "../../../util/logger";

export const upgrade = (creep) => {
  const creepNotUndef = creep !== undefined;
  const controllerNotUndef = creep.room.controller !== undefined;

  if (creepNotUndef && controllerNotUndef) {

    const roomName = Memory.creeps[creep.name].targetRoom;

    if (creep.upgradeController(Game.rooms[roomName].controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.rooms[roomName].controller);
    }

  } else return null;

};
