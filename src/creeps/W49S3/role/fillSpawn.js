export const fillSpawn = (creep) => {
  if (creep.transfer(Game.spawns['SpawnW49S3'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns['SpawnW49S3']);
  }
};
