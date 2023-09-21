export const countCreepsW48S3 = () => {
  let roleCounts = {
    harvest: 0,
    attack: 0,
    fillExtensions: 0,
    fillLink: 0,
    spawnRecovery: 0,
    build: 0,
    upgrade: 0,
    reserveController: 0,
    allCreeps: 0,
  };

  for (let name in Memory.creeps) {
    const creepRole = Memory.creeps[name].role;

    // Увеличиваем счетчик соответствующей роли
    if ((typeof roleCounts[creepRole] === 'number') && (Memory.creeps[name].targetRoom == 'W48S3')) {
      roleCounts[creepRole]++;
      roleCounts.allCreeps++;
    }
  }
  // Game.rooms['W48S3'].memory.role = roleCounts;
  Memory.rooms.W48S3.role = roleCounts;
};
