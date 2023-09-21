export const roleHarvester = (creep) => {
  if (creep.store.getFreeCapacity() > 0) {
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  } else if (creep.store.get() == 0) {
    creep.memory.role == 'upgrade';
  }
};
