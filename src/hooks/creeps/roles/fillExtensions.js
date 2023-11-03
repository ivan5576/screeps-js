export const fillExtensions = (creep, emptyExtensions) => {
  if ((creep !== undefined) && (Array.isArray(emptyExtensions)) && (emptyExtensions.length > 0)) {
    const nearestEmptyExtension = creep.pos.findClosestByRange(emptyExtensions);
    if (creep.transfer(nearestEmptyExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(nearestEmptyExtension);
    }
  } else return null;
};
