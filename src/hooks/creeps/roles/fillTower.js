export const fillTower = (creep, emptyTowers) => {

  if (creep && Array.isArray(emptyTowers) && (emptyTowers.length > 0)) {

    if (creep.transfer(emptyTowers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(emptyTowers[0]);
    }

  } else return null;

};
