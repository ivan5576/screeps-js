export const fillSpawn = (creep, spawn) => {
  const creepNotUndef = creep !== undefined;
  const spawnNotUndef = spawn !== undefined;

  if (creepNotUndef && spawnNotUndef) {
    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }

  } else return null;
};
