export const countCreepsW48S3 = () => {
  let roleCounts = {
    harvest: 0,
    harvestLink: 0,
    harvestRemote: 0,
    fillExtensions: 0,
    fillLink: 0,
    fillTower: 0,
    fillStorage: 0,
    spawnRecovery: 0,
    build: 0,
    upgrade: 0,
    reserveController: 0,
    attack: 0,
    allCreeps: 0,
  };

  let globalRoleCounts = {
    harvester: 0,
    upgrader: 0,
    fillerTower: 0,
    remoteHarvester: 0,
    attacker: 0,
    reserver: 0,
  }

  for (let name in Memory.creeps) {
    const creepRole = Memory.creeps[name].role;
    const creepGlobalRole = Memory.creeps[name].globalRole;

    // Увеличиваем счетчик соответствующей роли
    if ((typeof globalRoleCounts[creepGlobalRole] === 'number') && (Memory.creeps[name].targetRoom == 'W48S3')) {
      globalRoleCounts[creepGlobalRole]++;

      if ((typeof roleCounts[creepRole] === 'number') && (Memory.creeps[name].targetRoom == 'W48S3')) {
        roleCounts[creepRole]++;
        roleCounts.allCreeps++;
      }
    }
  }

  Memory.rooms.W48S3.role = roleCounts;
  Memory.rooms.W48S3.globalRole = globalRoleCounts;
};
