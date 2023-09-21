export const roleReserveController = (creep) => {
  if (!(creep.room.name == 'W48S2')) {
    creep.moveTo(Game.flags.Flag1);
  } else if (creep.room.name == 'W48S2') {
    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  }
};
