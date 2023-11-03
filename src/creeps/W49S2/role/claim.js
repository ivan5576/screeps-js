export const claim = (creep) => {
  // console.log('okk!')

  if (creep.pos.isNearTo(Game.flags.ControllerW49S1)) {

    // creep.attackController(creep.room.controller)
    logger.info(creep.attackController(creep.room.controller))
    // if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //   creep.moveTo(Game.rooms.W49S1.controller);
    // }
  } else {
    creep.moveTo(Game.flags.ControllerW49S1);
    console.log('else!')

  }

};
