export const roleUpgrader = (creep) => {
  if (creep.upgradeController(Game.rooms.W48S3.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.rooms.W48S3.controller);
  }
};
