export const attack = (creep) => {
  const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (enemy) {
    if (creep.attack(enemy) == ERR_NOT_IN_RANGE) {
      creep.moveTo(enemy);
    }
  }
};
