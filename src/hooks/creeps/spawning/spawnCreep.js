import { logger } from "../../../util/logger";
import { TOWERKEEPER, HARVESTER, UPGRADER1, UPGRADER2, REMOTEHARVESTER } from "./constants";

// The first parameter represents the target room (e.g., Game.rooms.W48S3).
// For spawning in a different room, use the second parameter as the room name (e.g., 'W49S2').
// If empty, the spawning room is the same as the target room.

export const spawnCreep = (gameRoomObj, spawnRoomName) => {

  if (gameRoomObj) {

    const targetRoomName = gameRoomObj.name;
    spawnRoomName = spawnRoomName === undefined ? gameRoomObj.name : spawnRoomName;
    const spawns = Game.spawns;
    const freeSpawn = Object.values(spawns).find(spawn => (spawn.room.name === spawnRoomName) && (spawn.spawning === null)) || null;

    if (freeSpawn) {

      // creep name
      const towerKeeperName = 'towerKeeper' + Game.time.toString().slice(4);
      const harvesterName = 'harvester' + Game.time.toString().slice(4);
      const upgrader1Name = 'upgrader1' + Game.time.toString().slice(4);
      const upgrader2Name = 'upgrader2' + Game.time.toString().slice(4);
      const remoteHarvesterName = 'remoteHarvester' + Game.time.toString().slice(4);

      // creep global role
      const towerKeeper = Memory.rooms[targetRoomName].globalRole.towerKeeper;
      const harvester = Memory.rooms[targetRoomName].globalRole.harvester;
      const upgrader1 = Memory.rooms[targetRoomName].globalRole.upgrader1;
      const upgrader2 = Memory.rooms[targetRoomName].globalRole.upgrader2;
      const remoteHarvester = Memory.rooms[targetRoomName].globalRole.remoteHarvester;
      // creep lifetime
      const bornTime = Game.time;
      const currTime = Game.time;
      const towerKeeperBornTime = (currTime - Memory.rooms[targetRoomName].bornTime.towerKeeper) > 1500;
      const harvesterBornTime = (currTime - Memory.rooms[targetRoomName].bornTime.harvester) > 1400;
      const upgrader1BornTime = (currTime - Memory.rooms[targetRoomName].bornTime.upgrader1) > 1400;
      const upgrader2BornTime = (currTime - Memory.rooms[targetRoomName].bornTime.upgrader2) > 1400;
      const remoteHarvesterBornTime = (currTime - Memory.rooms[targetRoomName].bornTime.remoteHarvester) > 1400;

      // enough energy for spawn
      const energyForSpawning = Game.rooms[spawnRoomName].energyAvailable;
      const towerKeeperEnoughEnergy = energyForSpawning >= TOWERKEEPER.coast;
      const harvesterEnoughEnergy = energyForSpawning >= HARVESTER.coast;
      const upgrader1EnoughEnergy = energyForSpawning >= UPGRADER1.coast;
      const upgrader2EnoughEnergy = energyForSpawning >= UPGRADER2.coast;
      const remoteHarvesterEnoughEnergy = energyForSpawning >= REMOTEHARVESTER.coast;

      if ((!towerKeeper || towerKeeperBornTime) && towerKeeperEnoughEnergy) {

        freeSpawn.spawnCreep(
          TOWERKEEPER.body,
          towerKeeperName,
          {
            memory: {
              globalRole: 'towerKeeper',
              role: 'harvest',
              targetRoom: targetRoomName,
              bornTime: bornTime,
            }
          }
        );

      } else if ((!harvester || harvesterBornTime) && harvesterEnoughEnergy) {

        freeSpawn.spawnCreep(
          HARVESTER.body, harvesterName,
          {
            memory: {
              globalRole: 'harvester',
              role: 'harvest',
              targetRoom: targetRoomName,
              bornTime: bornTime,
            }
          }
        );

      } else if ((!upgrader1 || upgrader1BornTime) && upgrader1EnoughEnergy && towerKeeper && harvester) {

        freeSpawn.spawnCreep(
          UPGRADER1.body, upgrader1Name,
          {
            memory: {
              globalRole: 'upgrader1',
              role: 'harvest',
              targetRoom: targetRoomName,
              bornTime: bornTime,
            }
          }
        );

      } else if (((upgrader2 < 2) || upgrader2BornTime) && upgrader2EnoughEnergy && towerKeeper && harvester) {
        logger.info(upgrader2BornTime)
        freeSpawn.spawnCreep(
          UPGRADER2.body, upgrader2Name,
          {
            memory: {
              globalRole: 'upgrader2',
              role: 'harvest',
              targetRoom: targetRoomName,
              bornTime: bornTime,
            }
          }
        );

      } else if (!remoteHarvester && remoteHarvesterBornTime && remoteHarvesterEnoughEnergy && towerKeeper && harvester && upgrader1 && upgrader2) {

        freeSpawn.spawnCreep(
          REMOTEHARVESTER.body, remoteHarvesterName,
          {
            memory: {
              globalRole: 'remoteHarvester',
              role: 'harvest',
              targetRoom: targetRoomName,
              bornTime: bornTime,
            }
          }
        );

      }

    }

  } else return null;
};
