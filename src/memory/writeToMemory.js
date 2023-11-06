export const writeToMemory = (gameRoomObj) => {
  const gameRoomObjNotUndef = gameRoomObj ? gameRoomObj : null;
  if (gameRoomObjNotUndef) {

    const roomName = gameRoomObj.name;

    let rolesObj = {
      attack: 0,
      build: 0,
      claim: 0,
      harvest: 0,
      heal: 0,
      fillExtension: 0,
      fillLink: 0,
      fillStorage: 0,
      fillSpawn: 0,
      fillTower: 0,
      upgrade: 0,
      wait: 0,
    };

    let globalRolesObj = {
      towerKeeper: 0,
      harvester: 0,
      upgrader1: 0,
      upgrader2: 0,
    };

    let bornTimeObj = {
      towerKeeper: 0,
      harvester: 0,
      upgrader1: 0,
      upgrader2: 0,
    }

    for (let name in Memory.creeps) {
      const creepIsFromTargetRoom = Memory.creeps[name].targetRoom === roomName;
      const creepGlobalRole = Memory.creeps[name].globalRole;
      const creepRole = Memory.creeps[name].role;
      const creepBornTime = Memory.creeps[name].bornTime;

      // Увеличиваем счетчик соответствующей роли
      if (creepIsFromTargetRoom) {

        if (typeof globalRolesObj[creepGlobalRole] === 'number') {
          globalRolesObj[creepGlobalRole]++;
        }

        if (typeof rolesObj[creepRole] === 'number') {
          rolesObj[creepRole]++;
        }

        if (typeof bornTimeObj[creepGlobalRole] === 'number') {
          bornTimeObj[creepGlobalRole] = creepBornTime;
        }

      }
    }

    Memory.rooms[roomName].globalRole = globalRolesObj;
    Memory.rooms[roomName].role = rolesObj;
    Memory.rooms[roomName].bornTime = bornTimeObj;

  } else return null;
};
