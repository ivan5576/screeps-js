export const fillStorage = (creep, emptyStorage) => {
  const creepNotUndef = creep !== undefined;
  const emptyStorageNotUndef = emptyStorage !== undefined;

  if (creepNotUndef && emptyStorageNotUndef && emptyStorage) {
    if (creep.transfer(emptyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(emptyStorage);
    }

  } else return null;
};
