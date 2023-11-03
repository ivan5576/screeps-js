export const roleBuilder = (creep) => {
  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  console.log(target)
  if (!!target && (creep.build(target) == ERR_NOT_IN_RANGE)) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
  } else if (!target) {
    creep.moveTo(Game.rooms.W48S3.storage);
  }
};
