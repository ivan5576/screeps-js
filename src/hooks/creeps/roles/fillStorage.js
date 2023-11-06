export const fillStorage = (creep, emptyStorage) => {

  if (creep && emptyStorage) {

    if (creep.transfer(emptyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(emptyStorage);
    }

  } else return null;
};
