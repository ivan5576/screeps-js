export const roleSpawnRecoverer = (creep) => {
  if (creep.transfer(Game.spawns['SpawnW49S2'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns['SpawnW49S2']);
  }
};
