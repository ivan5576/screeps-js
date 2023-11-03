export const fillStorage = (creep) => {
  if (creep.transfer(Game.rooms.W49S3.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.rooms.W49S3.storage);
  }
};
