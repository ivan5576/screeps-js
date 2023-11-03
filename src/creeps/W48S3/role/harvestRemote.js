export const harvestRemote = (creep) => {

  if ((creep.store.getFreeCapacity() > 0) && (Game.rooms.W48S2 !== undefined)) {
    let sources = Game.rooms.W48S2.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  } else if (Game.rooms.W48S2 === undefined) {
    creep.moveTo(Game.flags.Flag2);
  }
};
