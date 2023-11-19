export const findClosestExtension = (creep, emptyExtensions) => {

  if (emptyExtensions) {

    const currentExtInMemory = Memory.rooms[emptyExtensions[0].room.name].closestExtensionId;

    // Check if the current closest extension exists and is already filled. If it is not filled, there is no need to update the closest extension in memory as it will be filled.
    if (currentExtInMemory) {

      const currentExtFilled = !emptyExtensions.some(extension => extension.id === currentExtInMemory);

      if (currentExtFilled) {

        const nearestEmptyExtension = creep.pos.findClosestByRange(emptyExtensions);
        Memory.rooms[emptyExtensions[0].room.name].closestExtensionId = nearestEmptyExtension.id;
        return nearestEmptyExtension;

      } else {

        const closestExtension = emptyExtensions.find(extension => extension.id === currentExtInMemory)
        return closestExtension;

      }

      // First initialization, when memory is false.
    } else {

      const nearestEmptyExtension = creep.pos.findClosestByRange(emptyExtensions);
      Memory.rooms[emptyExtensions[0].room.name].closestExtensionId = nearestEmptyExtension;
      return nearestEmptyExtension;

    }

  } else return null;

}
