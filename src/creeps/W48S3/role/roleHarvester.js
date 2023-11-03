export const roleHarvester = (creep) => {
  if (creep.store.getFreeCapacity() > 0) {
    let sources = Game.rooms['W48S3'].find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  }
};
