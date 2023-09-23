export const fillTower = (creep) => {
  let towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));
  if (creep.transfer(emptyTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(emptyTower);
  }
};
