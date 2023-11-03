export const spawnNewCreeps = () => {

  // creeps names
  const harvesterCreepW48S3 = 'Harvester-W48S3-' + Game.time.toString().slice(4);
  const upgraderCreepW48S3 = 'Upgrader-W48S3-' + Game.time.toString().slice(4);
  const fillerTowerCreepW48S3 = 'FillerTower-W48S3-' + Game.time.toString().slice(4);
  // const attackerCreepW48S3 = 'Attacker-W48S3-' + Game.time.toString().slice(4);
  const remoteHarvesterCreepW48S2 = 'RemoteHarvester-W48S2-' + Game.time.toString().slice(4);
  // // W49S3
  const reserverCreepW48S3 = 'Reserver-W49S3-' + Game.time.toString().slice(4);
  // const attackerCreepW49S3 = 'Attacker-W49S3-' + Game.time.toString().slice(4);
  // const harvesterCreepW49S3 = 'Harvester-W49S3-' + Game.time.toString().slice(4);

  // creeps global roles
  const harvester = Memory.rooms.W48S3.globalRole['harvester'];
  const upgrader = Memory.rooms.W48S3.globalRole['upgrader'];
  const fillerTower = Memory.rooms.W48S3.globalRole['fillerTower'];
  const remoteHarvester = Memory.rooms.W48S3.globalRole['remoteHarvester'];
  // const attacker = Memory.rooms.W48S3.globalRole['attacker'];
  const reserver = Memory.rooms.W48S3.globalRole['reserver'];
  //W49S3
  // const reserverW49S3 = Memory.rooms.W49S3.globalRole['reserver'];
  // const attackerW49S3 = Memory.rooms.W49S3.globalRole['attacker'];
  // const harvesterW49S3 = Memory.rooms.W49S3.body == 'harvesterW49S3';

  const W48S3EnergyAvaliable = Game.rooms.W48S3.energyAvailable;
  const spawnOneReadyToSpawn = !Game.spawns['SpawnOne'].spawning;
  // const fullSpawn = Game.spawns['SpawnOne'].store[RESOURCE_ENERGY] == 300;
  // const hostilesArr = Game.rooms.W48S3.find(FIND_HOSTILE_CREEPS);

  // if (!!Game.rooms.W49S3 && !Game.creeps['W49S3Upgrader']) {
  //   Game.spawns['SpawnOne'].spawnCreep(
  //     [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'W49S3Upgrader',
  //     {
  //       memory: {
  //         body: 'W49S3Upgrader',
  //         role: 'harvest',
  //         targetRoom: 'W49S3',
  //       }
  //     }
  //   );
  // }

  if ((W48S3EnergyAvaliable > 2000) && spawnOneReadyToSpawn) {

    if (harvester < 2) {

      console.log('SpawnOne create Harvester!');
      Game.spawns['SpawnOne'].spawnCreep(
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterCreepW48S3,
        {
          memory: {
            globalRole: 'harvester',
            role: 'harvest',
            body: 'Harvester',
            targetRoom: 'W48S3',
          }
        }
      );

    } else if (!upgrader) {

      console.log('SpawnOne create Upgrader!');
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], upgraderCreepW48S3, { memory: { globalRole: 'upgrader', role: 'harvestLink', body: 'Upgrader', targetRoom: 'W48S3', } });

    } else if (!fillerTower) {

      console.log('SpawnOne create FillerTower!');
      Game.spawns['SpawnOne'].spawnCreep([WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], fillerTowerCreepW48S3, { memory: { globalRole: 'fillerTower', role: 'harvestLink', body: 'FillerTower', targetRoom: 'W48S3', } });

    } else if (!remoteHarvester) {
      console.log('SpawnOne create remoteHarvester!')
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], remoteHarvesterCreepW48S2, { memory: { globalRole: 'remoteHarvester', role: 'harvest', body: 'Remote-harvester', targetRoom: 'W48S3', } });

    }
  }

  if (!reserver) {
    console.log('SpawnOne create Reserver!')
    Game.spawns['SpawnOne'].spawnCreep([MOVE], reserverCreepW48S3, { memory: { globalRole: 'reserver', role: 'reserve', body: 'Reserver', targetRoom: 'W48S3', } });
  }

  // else if (!attackerW49S3) {

  //   console.log('Spawning attacker W49S3!')
  //   Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], attackerCreepW49S3, { memory: { globalRole: 'attacker', role: 'harvest', body: 'attackerW49S3', targetRoom: 'W49S3', } });
  //   Memory.creeps[attackerCreepW49S3].role = 'harvest';
  //   Memory.creeps[attackerCreepW49S3].globalRole = 'attacker';
  // }
  // else if (!harvesterW49S3) {

  //   console.log('SpawnOne create Harvester W49S3!')
  //   Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterCreepW49S3, { memory: { globalRole: 'harvester', role: 'harvest', body: 'harvesterW49S3', targetRoom: 'W49S3', } });
  //   Memory.creeps[harvesterCreepW49S3].role = 'harvest';
  //   Memory.creeps[harvesterCreepW49S3].globalRole = 'harvester';
  // }

  // else if ((attacker < 2) && !emptyExtension && fullSpawn && !!hostilesArr.length) {

  //   console.log('Spawning Attacker W48S3!');
  //   Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], attackerCreepW48S3, { memory: { globalRole: 'attacker', role: 'harvest', body: 'Attack', targetRoom: 'W48S3', } });
  //   Memory.creeps[attackerCreepW48S3].role = 'harvest';
  //   Memory.creeps[attackerCreepW48S3].globalRole = 'attacker';
  // }
};
