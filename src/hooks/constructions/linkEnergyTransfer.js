export const linkEnergyTransfer = (linkFrom, linkTo) => {

  if (linkFrom && linkTo) {

    if (linkTo.store[RESOURCE_ENERGY] < 799) {
      linkFrom.transferEnergy(linkTo);
    }

  }

};
