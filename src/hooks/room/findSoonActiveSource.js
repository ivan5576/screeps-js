export const findSoonActiveSource = (creep) => {
  const ticksToRegeneration = [];
  const sources = creep.pos.find(FIND_SOURCES);
  sources.forEach(source => ticksToRegeneration.push(source.ticksToRegeneration));

  const findIdxSource = () => {
    let minNum = Infinity;
    let idxOfMinNum = -1;

    for (let i = 0; i < ticksToRegeneration.length; i++) {
      if (ticksToRegeneration[i] < minNum) {
        minNum = ticksToRegeneration[i];
        idxOfMinNum = i;
      }
    }
    return idxOfMinNum;
  }
  return findIdxSource() !== -1 ? sources[findIdxSource()] : null;
}
