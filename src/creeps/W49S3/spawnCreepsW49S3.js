// import { logger } from "../../util/logger";

export const spawnCreepsW49S3 = () => {

  const timeOfbirth = Game.time;

  // creeps W49S3
  const harvesterName = 'Harvester-W49S3-' + Game.time.toString().slice(4);
  const harvesterToLinkName = 'HarvesterToLink-W49S3-' + Game.time.toString().slice(4);
  const upgraderName = 'Upgrader-W49S3-' + Game.time.toString().slice(4);
  const fillerTowerName = 'FillerTower-W49S3-' + Game.time.toString().slice(4);

  // creeps global roles
  const harvester = Memory.rooms.W49S3.globalRole['harvester'];
  const harvesterToLink = Memory.rooms.W49S3.globalRole['harvesterToLink'];
  const upgrader = Memory.rooms.W49S3.globalRole['upgrader'];
  const fillerTower = Memory.rooms.W49S3.globalRole['fillerTower'];

  // creeps sources
  const sourceOne = Memory.rooms.W49S3.source['sourceOne'];
  const sourceTwo = Memory.rooms.W49S3.source['sourceTwo'];

  const W49S3EnergyAvaliable = Game.rooms.W49S3.energyAvailable;
  const spawn49ReadyToSpawn = !Game.spawns['SpawnW49S3'].spawning;
  const hostilesArr = Game.rooms.W49S3.find(FIND_HOSTILE_CREEPS);

  const roomW49S2 = true;

  // creeps W49S2
  const attacker = Memory.rooms.W49S2.globalRole['attacker'];
  const attackerLight = Memory.rooms.W49S2.globalRole['attackerLight'];
  const harvesterW49S2 = Memory.rooms.W49S2.globalRole['harvesterW49S2'];
  const claimer = Memory.rooms.W49S2.globalRole['claimer'];
  const waiter = Memory.rooms.W49S2.globalRole['waiter'];

  const attackerName = 'Attacker-W49S2-' + Game.time.toString().slice(4);
  const attackerLightName = 'AttackerLight-W49S2-' + Game.time.toString().slice(4);
  const harvesterW49S2Name = 'HarvesterW49S2-' + Game.time.toString().slice(4);
  const claimerName = 'Claimer-W49S2-' + Game.time.toString().slice(4);

  const roomW49S2test = Game.rooms.W49S2 || false;
  let attackerSoonWillDie = false;
  // if (roomW49S2test) {
  //   const attackerTicksToLive = roomW49S2test.find(FIND_MY_CREEPS).filter((creep) => creep.name.includes('AttackerLight'));
  //   logger.info(aattackerTicksToLive)
  // if ((attackerTicksToLive.length < 2) && (attackerTicksToLive[0].ticksToLive < 150)) {
  //   attackerSoonWillDie = true;
  // }


  if (W49S3EnergyAvaliable >= 1300) {

    if (!harvesterToLink) {
      // if (false) {

      console.log('SpawnW49S3 create HarvesterToLink sourceOne!');
      Game.spawns['SpawnW49S3'].spawnCreep(
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], harvesterToLinkName,
        {
          memory: {
            globalRole: 'harvesterToLink',
            role: 'harvestSourceOne',
            body: 'HarvesterToLink',
            targetRoom: 'W49S3',
            source: 'sourceOne',
          }
        }
      );

    } else if (!upgrader) {
      // } else if (false) {

      console.log('SpawnW49S3 create Upgrader sourceOne!');
      Game.spawns['SpawnW49S3'].spawnCreep(
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], upgraderName,
        {
          memory: {
            globalRole: 'upgrader',
            role: 'harvestLink',
            body: 'Upgrader',
            targetRoom: 'W49S3',
          }
        }
      );

    } else if (!harvester && (Memory.rooms.W49S3.source['sourceTwo'] < 1)) {

      console.log('SpawnW49S3 create Harvester sourceTwo!');
      Game.spawns['SpawnW49S3'].spawnCreep(
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterName,
        {
          memory: {
            globalRole: 'harvester',
            role: 'harvest',
            body: 'Harvester',
            targetRoom: 'W49S3',
            source: 'sourceTwo',
          }
        }
      );

      // } else if ((harvester < 2) && (Memory.rooms.W49S3.source['sourceOne'] < 3)) {

      //   console.log('SpawnW49S3 create Harvester sourceOne!');
      //   Game.spawns['SpawnW49S3'].spawnCreep(
      //     [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterName,
      //     {
      //       memory: {
      //         globalRole: 'harvester',
      //         role: 'harvest',
      //         body: 'Harvester',
      //         targetRoom: 'W49S3',
      //         source: 'sourceOne',
      //         timeOfbirth: timeOfbirth,
      //       }
      //     }
      //   );

    } else if (!fillerTower) {

      console.log('SpawnW49S3 create FillerTower sourceOne!');
      Game.spawns['SpawnW49S3'].spawnCreep(
        [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], fillerTowerName,
        {
          memory: {
            globalRole: 'fillerTower',
            role: 'harvest',
            body: 'fillerTower',
            targetRoom: 'W49S3',
            source: 'sourceOne',
          }
        }
      );

    } else if (roomW49S2) {
      if ((Game.rooms.W49S2 === undefined) && (waiter)) {
        Game.spawns['SpawnW49S3'].spawnCreep(
          [MOVE, MOVE], 'Waiter-W49S2-' + Game.time.toString().slice(4),
          {
            memory: {
              globalRole: 'waiter',
              role: 'wait',
              body: 'Waiter',
              targetRoom: 'W49S2',
            }
          }
        );
      } else if (attackerLight && false) {
        Game.spawns['SpawnW49S3'].spawnCreep(
          [RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE], 'AttackerLight-W49S2-' + Game.time.toString().slice(4),
          {
            memory: {
              globalRole: 'attackerLight',
              role: 'attack',
              body: 'AttackerLight',
              targetRoom: 'W49S2',
            }
          }
        );
      } else if (attacker) {
        Game.spawns['SpawnW49S3'].spawnCreep(
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], attackerName,
          {
            memory: {
              globalRole: 'attacker',
              role: 'harvestLink',
              body: 'Attacker',
              targetRoom: 'W49S2',
            }
          }
        );
      } else if (harvesterW49S2 && false) {
        Game.spawns['SpawnW49S3'].spawnCreep(
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterW49S2Name,
          {
            memory: {
              globalRole: 'harvesterW49S2',
              role: 'harvestW49S2',
              body: 'HarvesterW49S2',
              targetRoom: 'W49S2',
            }
          }
        );
      } else if (claimer && false) {
        Game.spawns['SpawnW49S3'].spawnCreep(
          [CLAIM, CLAIM, MOVE, MOVE, MOVE, MOVE, ATTACK], claimerName,
          {
            // energyStructures: [
            //   Game.spawns['SpawnW49'],
            //   Game.rooms.W49S3.find(FIND_MY_STRUCTURES, {
            //     filter: { structureType: STRUCTURE_EXTENSION }
            //   }),
            // ],
            memory: {
              globalRole: 'claimer',
              role: 'claim',
              body: 'Claimer',
              targetRoom: 'W49S2',
            }
          }
        );
      }
    }
  }

};
