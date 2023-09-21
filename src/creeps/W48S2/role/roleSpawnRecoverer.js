export const roleSpawnRecoverer = (creep) => {
  if (creep.transfer(Game.spawns['SpawnOne'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns['SpawnOne']);
  }
};
