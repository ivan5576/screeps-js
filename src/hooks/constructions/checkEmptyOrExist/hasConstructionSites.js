// import { logger } from "../../../util/logger";

export const hasConstructionSites = (gameRoomObj) => {

  if (gameRoomObj) {

    const constructionSites = gameRoomObj.find(FIND_MY_CONSTRUCTION_SITES);

    if (Array.isArray(constructionSites) && (constructionSites.length > 0)) {

      return constructionSites;
    }
    else if (Array.isArray(constructionSites) && (constructionSites.length === 0)) {

      return false;

    } else return null;

  } else return null;

};
