export const hasEmptyTowers = (gameRoomObj) => {

  if (gameRoomObj !== undefined) {
    const towers = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });

    if (Array.isArray(towers) && (towers.length > 0)) {
      const emptyTowers = towers.filter(tower => tower.store[RESOURCE_ENERGY] < 800);
      if (emptyTowers.length > 0) {
        return emptyTowers;

      } else return false;

    } else if (Array.isArray(towers) && (towers.length === 0)) {
      return false;

    } else return null;

  } else return null;

};
