export const hasEmptySpawn = (gameRoomObj) => {

  if (gameRoomObj) {

    const spawns = Game.spawns;
    const emptySpawn = Object.values(spawns).find(spawn => (spawn.room.name === gameRoomObj.name) && (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0)) || false;

    return emptySpawn;

  } else return null;

};
