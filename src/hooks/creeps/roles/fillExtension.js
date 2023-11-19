import { findClosestExtension } from "../../constructions/findClosestExtension";
import { logger } from "../../../util/logger";

export const fillExtension = (creep, emptyExtensions) => {

  if ((creep !== undefined) && (Array.isArray(emptyExtensions)) && (emptyExtensions.length > 0)) {

    const closestEmptyExtension = findClosestExtension(creep, emptyExtensions);

    if (creep.transfer(closestEmptyExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

      creep.moveTo(closestEmptyExtension);
    }

  } else return null;

};
