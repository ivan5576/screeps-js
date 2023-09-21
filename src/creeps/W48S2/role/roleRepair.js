export const roleRepair = (creep) => {
  const roads = Game.rooms.W48S2.find(FIND_STRUCTURES, {
    filter: { structureType: STRUCTURE_ROAD }
  });
  const roadNeedToRepair = roads.find((object) => object.hits < object.hitsMax);

  if ((roadNeedToRepair) && (creep.repair(roadNeedToRepair) == ERR_NOT_IN_RANGE)) {
    creep.moveTo(roadNeedToRepair);
  }
};
