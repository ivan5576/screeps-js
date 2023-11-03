export const reserveController = (creep) => {
  if (Game.rooms.W49S3 !== undefined) {
    if (Game.rooms.W49S3.controller) {
      if (creep.claimController(Game.rooms.W49S3.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.rooms.W49S3.controller);
      }
    }
  } else if (Game.rooms.W49S3 === undefined) {
    creep.moveTo(Game.flags.FlagW49S3controller);
  }
};
