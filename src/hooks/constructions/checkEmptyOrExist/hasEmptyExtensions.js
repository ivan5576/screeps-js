export const hasEmptyExtensions = (arrOfExtensions) => {
  if (Array.isArray(arrOfExtensions) && (arrOfExtensions.length > 0)) {
    const emptyExtensions = arrOfExtensions.filter(extension => extension.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
    if (emptyExtensions.length > 0) { return emptyExtensions; }
    else return false;
  } else if (Array.isArray(arrOfExtensions) && (arrOfExtensions.length === 0)) { return false; }
  else return null;
};
