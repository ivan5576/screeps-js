import { TOWERKEEPER, HARVESTER, UPGRADER1, UPGRADER2 } from "./constants";

export const spawnCreep = (gameRoomObj) => {
  if (gameRoomObj) {

    const spawns = gameRoomObj.spawns.length !== 0 ? gameRoomObj.spawns : null;

    if (spawns) {

      const filterSpawnsNotSpawning = spawns.filter(spawn => !spawn.spawning);
      const freeSpawns = filterSpawnsNotSpawning.length !== 0 ? filterSpawnsNotSpawning : null;

      if (freeSpawns) {

        const roomName = gameRoomObj.name;

        // creep name
        const towerKeeperName = 'towerKeeper' + Game.time.toString().slice(4);
        const harvesterName = 'harvester' + Game.time.toString().slice(4);
        const upgrader1Name = 'upgrader1' + Game.time.toString().slice(4);
        const upgrader2Name = 'upgrader2' + Game.time.toString().slice(4);

        // creep global role
        const towerKeeper = Memory.rooms[roomName].globalRole.towerKeeper;
        const harvester = Memory.rooms[roomName].globalRole.harvester;
        const upgrader1 = Memory.rooms[roomName].globalRole.upgrader1;
        const upgrader2 = Memory.rooms[roomName].globalRole.upgrader2;

        // creep lifetime
        const bornTime = Memory.creeps[roomName].bornTime;
        const currTime = Game.time;
        const towerKeeperBornTime = (currTime - Memory.rooms[roomName].bornTime.towerKeeper) > 1400;
        const harvesterBornTime = (currTime - Memory.rooms[roomName].bornTime.harvester) > 1400;
        const upgrader1BornTime = (currTime - Memory.rooms[roomName].bornTime.upgrader1) > 1400;
        const upgrader2BornTime = (currTime - Memory.rooms[roomName].bornTime.upgrader2) > 1400;

        // enough energy for spawn
        const energyForSpawning = gameRoomObj.energyAvailable;
        const towerKeeperEnoughEnergy = energyForSpawning >= TOWERKEEPER.coast;
        const harvesterEnoughEnergy = energyForSpawning >= HARVESTER.coast;
        const upgrader1EnoughEnergy = energyForSpawning >= UPGRADER1.coast;
        const upgrader2EnoughEnergy = energyForSpawning >= UPGRADER2.coast;

        if ((!towerKeeper || towerKeeperBornTime) && towerKeeperEnoughEnergy) {

          freeSpawns[0].spawnCreep(
            TOWERKEEPER.body,
            towerKeeperName,
            {
              memory: {
                globalRole: 'towerKeeper',
                role: 'harvestStorage',
                targetRoom: roomName,
                bornTime: bornTime,
              }
            }
          );

        } else if ((!harvester || harvesterBornTime) && harvesterEnoughEnergy) {

          freeSpawns[0].spawnCreep(
            HARVESTER.body, harvesterName,
            {
              memory: {
                globalRole: 'harvester',
                role: 'harvest',
                targetRoom: roomName,
                bornTime: bornTime,
              }
            }
          );

        } else if ((!upgrader1 || upgrader1BornTime) && upgrader1EnoughEnergy && towerKeeper && harvester) {

          freeSpawns[0].spawnCreep(
            UPGRADER1.body, upgrader1Name,
            {
              memory: {
                globalRole: 'upgrader1',
                role: 'harvest',
                targetRoom: roomName,
                bornTime: bornTime,
              }
            }
          );

        } else if ((!upgrader2 || upgrader2BornTime) && upgrader2EnoughEnergy && towerKeeper && harvester) {

          freeSpawns[0].spawnCreep(
            UPGRADER2.body, upgrader2Name,
            {
              memory: {
                globalRole: 'upgrader2',
                role: 'harvest',
                targetRoom: roomName,
                bornTime: bornTime,
              }
            }
          );

        }

      }

    } else return null;

  } else return null;
};
