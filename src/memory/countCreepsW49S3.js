export const countCreepsW49S3 = () => {
  let roleCounts = {
    attack: 0,
    build: 0,
    fillStorage: 0,
    fillExtensions: 0,
    fillLink: 0,
    fillSpawn: 0,
    fillTower: 0,
    harvest: 0,
    harvestSourceOne: 0,
    harvestLink: 0,
    heal: 0,
    reserveController: 0,
    upgrade: 0,
    wait: 0,
    failPlace: 0,
    allCreeps: 0,
  };

  let globalRoleCounts = {
    reserver: 0,
    attacker: 0,
    harvester: 0,
    upgrader: 0,
    harvesterToLink: 0,
    fillerTower: 0,
  }

  let sourceCount = {
    sourceOne: 0,
    sourceTwo: 0,
  }

  for (let name in Memory.creeps) {
    const creepRole = Memory.creeps[name].role;
    const creepGlobalRole = Memory.creeps[name].globalRole;


    // Увеличиваем счетчик соответствующей роли
    if ((typeof globalRoleCounts[creepGlobalRole] === 'number') && (Memory.creeps[name].targetRoom == 'W49S3')) {
      globalRoleCounts[creepGlobalRole]++;

      if (typeof roleCounts[creepRole] === 'number') {
        roleCounts[creepRole]++;
        roleCounts.allCreeps++;

        if (Memory.creeps[name].source) {
          const creepSource = Memory.creeps[name].source;
          if (typeof sourceCount[creepSource] === 'number') {
            sourceCount[creepSource]++;
          }
        }
      }
    }
  }
  Memory.rooms.W49S3.role = roleCounts;
  Memory.rooms.W49S3.globalRole = globalRoleCounts;
  Memory.rooms.W49S3.source = sourceCount;
};
