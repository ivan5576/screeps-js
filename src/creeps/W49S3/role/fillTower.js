// import { logger } from "../../../util/logger";

export const fillTower = (creep) => {
  let towers = _.filter(Game.spawns['SpawnW49S3'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
  // let emptyTower = towers.find((tower) => tower.store.getFreeCapacity(RESOURCE_ENERGY));

  const firstTower = towers[0];
  const secondTower = towers[1];
  const thirdTower = towers[2];

  const firstTowerEnergy = towers[0].store[RESOURCE_ENERGY];
  const secondTowerEnergy = towers[1].store[RESOURCE_ENERGY];
  const thirdTowerEnergy = towers[2].store[RESOURCE_ENERGY];


  if (firstTowerEnergy < 800) {
    if (creep.transfer(firstTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(firstTower);
    }
  }
  else if ((firstTowerEnergy > 800) && (secondTowerEnergy < 800)) {
    if (creep.transfer(secondTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(secondTower);
    }
  }
  else if ((firstTowerEnergy > 800) && (secondTowerEnergy > 800) && (thirdTowerEnergy < 800)) {
    if (creep.transfer(thirdTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(thirdTower);
    }
  }
};
