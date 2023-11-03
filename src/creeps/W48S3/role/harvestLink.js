export const harvestLink = (creep) => {

  const linkTo = Game.rooms['W48S3'].lookForAt('structure', 12, 32)[0];
  const hasEnergyLinkTo = linkTo.store[RESOURCE_ENERGY];

  if ((creep.store.getFreeCapacity() > 0) && !!hasEnergyLinkTo) {
    if (creep.withdraw(Game.getObjectById(linkTo.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(linkTo);
    }
  } else if ((creep.store.getFreeCapacity() > 0) && !hasEnergyLinkTo) {
    if (creep.withdraw(Game.rooms.W48S3.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.rooms.W48S3.storage);
    }
  }
};
