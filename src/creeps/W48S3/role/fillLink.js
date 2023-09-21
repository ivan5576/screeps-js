export const fillLink = (creep) => {
  const link = Game.rooms['W48S3'].lookForAt('structure', 41, 43)[0];

  if (link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(link);
    }
  }
};
