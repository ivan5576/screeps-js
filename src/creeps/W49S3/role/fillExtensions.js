export const fillExtensions = (creep) => {
  let extensions = _.filter(Game.spawns['SpawnW49S3'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  let emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));

  if (creep.transfer(emptyExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(emptyExtension);
  }
};
