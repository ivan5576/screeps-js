export const hasEmptyStorage = (gameRoomObj) => {
  const gameRoomObjNotUndef = gameRoomObj !== undefined;
  const storageNotUndef = gameRoomObj.storage !== undefined;

  if (gameRoomObjNotUndef && storageNotUndef) {
    const storage = gameRoomObj.storage;
    const storageEmpty = gameRoomObj.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0;

    if (storageEmpty) {
      return storage;

    } else return false;

  } else return null;
};
