export const harvestSourceOne = (creep) => {
  // logger.info(creep.memory.source)
  if (!!Game.rooms.W49S3 && (!creep.memory.source)) {
    if (creep.store.getFreeCapacity() > 0) {
      let sources = Game.rooms.W49S3.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      } else if (creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      }
    }
  } else if (!!Game.rooms.W49S3 && (creep.memory.source == 'sourceOne')) {
    if (creep.store.getFreeCapacity() > 0) {
      let sources = Game.rooms.W49S3.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
    }
  }
};
