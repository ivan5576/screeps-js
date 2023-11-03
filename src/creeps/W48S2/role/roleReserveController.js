export const roleReserveController = (creep) => {
  if (!(creep.room.name == 'W49S2')) {
    creep.moveTo(Game.flags.W49S2Claim);
  } else if (creep.room.name == 'W49S2') {
    if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  }
};
