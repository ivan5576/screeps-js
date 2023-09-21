export const countCreepsW48S2 = () => {
  const roleCounts = {
    harvest: 0,
    spawnRecovery: 0,
    fillTower: 0,
    fillStorage: 0,
    allCreeps: 0,
  };

  for (let name in Memory.creeps) {
    const creepRole = Memory.creeps[name].role;
    // Увеличиваем счетчик соответствующей роли
    if ((typeof roleCounts[creepRole] === 'number') && (Memory.creeps[name].targetRoom == 'W48S2')) {
      roleCounts[creepRole]++;
      roleCounts.allCreeps++;
    }
  }
  Memory.rooms.W48S2.role = roleCounts;
};
