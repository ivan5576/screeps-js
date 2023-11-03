export const harvest = (creep) => {
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
      } else if (creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
        }
      } else if ((sources[0].energy === 0) && (sources[0].energy === 0) && (Game.rooms.W49S3.storage.store[RESOURCE_ENERGY] > 500000)) {
        if (creep.withdraw(Game.rooms.W49S3.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.rooms.W49S3.storage);
        }
      }
    }
  } else if (!!Game.rooms.W49S3 && (creep.memory.source == 'sourceTwo')) {
    if (creep.store.getFreeCapacity() > 0) {
      let sources = Game.rooms.W49S3.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      } else if (creep.harvest(sources[0]) == ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1]);
        }
      } else if ((creep.harvest(sources[1]) == ERR_NOT_ENOUGH_RESOURCES) && (creep.harvest(sources[0]) == ERR_NOT_ENOUGH_RESOURCES) && (Game.rooms.W49S3.storage.store[RESOURCE_ENERGY] > 500000)) {
        if (creep.withdraw(Game.rooms.W49S3.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.rooms.W49S3.storage);
        }
      }
    }
  } else if (!Game.rooms.W49S3) {
    creep.moveTo(Game.flags.FlagW49S3Source1);
  }

};
