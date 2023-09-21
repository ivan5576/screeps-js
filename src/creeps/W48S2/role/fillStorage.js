export const fillStorage = (creep) => {
  if (creep.transfer(Game.rooms.W48S3.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.rooms.W48S3.storage);
  }
};
