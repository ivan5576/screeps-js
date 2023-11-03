export const fillLink = (creep) => {
  const link = Game.rooms['W49S3'].lookForAt('structure', 20, 8)[0];

  if (link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(link);
    }
  }
};
