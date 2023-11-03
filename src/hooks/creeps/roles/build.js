export const build = (creep, constructionSites) => {
  const nearestConstructionSite = creep.pos.findClosestByRange(constructionSites);

  if (creep.build(nearestConstructionSite) == ERR_NOT_IN_RANGE) {
    creep.moveTo(nearestConstructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
  }
};
