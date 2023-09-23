export const harvestLink = (creep) => {
  const linkTo = Game.rooms['W48S3'].lookForAt('structure', 20, 34)[0];
  console.log(creep.withdraw(Game.getObjectById(linkTo.id)))
  if (creep.store.getFreeCapacity() > 0) {
    if (creep.withdraw(linkTo) == ERR_NOT_IN_RANGE) {
      creep.moveTo(linkTo);
    }
  }
};
