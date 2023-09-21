export const roleAttack = (creep) => {
  const hostiles = Game.rooms.W48S2.find(FIND_HOSTILE_CREEPS);

  const target = creep.pos.findClosestByRange(hostiles);
  if (target) {
    if (creep.attack(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
};
