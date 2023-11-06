export const fillSpawn = (creep, spawn) => {

  if (creep && spawn) {
    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }

  } else return null;
};
