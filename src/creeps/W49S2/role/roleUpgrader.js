export const roleUpgrader = (creep) => {
  if (creep.upgradeController(Game.rooms.W49S2.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.rooms.W49S2.controller);
  }
};
