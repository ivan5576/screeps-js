export const build = (creep) => {

  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if ((target) && (creep.build(target) == ERR_NOT_IN_RANGE)) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
  }
};
