export const spawnNewCreeps = () => {

  // creeps names
  const harvesterCreepW48S3 = 'Harvester-W48S3-' + Game.time.toString().slice(4);
  const upgraderCreepW48S3 = 'Upgrader-W48S3-' + Game.time.toString().slice(4);
  const attackerCreepW48S3 = 'Attacker-W48S3-' + Game.time.toString().slice(4);
  const harvesterCreepW48S2 = 'Harvester-W48S2-' + Game.time.toString().slice(4);

  // creeps global roles
  const harvester = Memory.rooms.W48S3.globalRole['harvester'];
  const upgrader = Memory.rooms.W48S3.globalRole['upgrader'];
  const remoteHarvester = Memory.rooms.W48S3.globalRole['remoteHarvester'];
  const attacker = Memory.rooms.W48S3.globalRole['attacker'];

  let extensions = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  let emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));
  const fullSpawn = Game.spawns['SpawnOne'].store[RESOURCE_ENERGY] == 300;
  const hostilesArr = Game.rooms.W48S3.find(FIND_HOSTILE_CREEPS);

  if (!emptyExtension && fullSpawn && !hostilesArr.length) {

    if (!harvester) {

      console.log('Spawning Harvester W48S3!');
      Game.spawns['SpawnOne'].spawnCreep(
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterCreepW48S3,
        {
          memory: {
            globalRole: 'harvester',
            role: 'harvest',
            body: 'Harvester',
            targetRoom: 'W48S3',
          }
        }
      );
      Memory.creeps[harvesterCreepW48S3].role = 'harvest';
      Memory.creeps[harvesterCreepW48S3].globalRole = 'harvester';

    } else if (!upgrader) {

      console.log('Spawning Upgrader W48S3!');
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], upgraderCreepW48S3, { memory: { globalRole: 'upgrader', role: 'harvest', body: 'Upgrader', targetRoom: 'W48S3', } });
      Memory.creeps[upgraderCreepW48S3].role = 'harvestLink';
      Memory.creeps[upgraderCreepW48S3].globalRole = 'upgrader';

    } else if (!remoteHarvester) {

      console.log('Spawning Harvester W48S2!')
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], harvesterCreepW48S2, { memory: { globalRole: 'remoteHarvester', role: 'harvest', body: 'Remote-harvester', targetRoom: 'W48S2', } });
      Memory.creeps[harvesterCreepW48S2].role = 'remoteHarvest';
      Memory.creeps[harvesterCreepW48S2].globalRole = 'remoteHarvester';
    }

  } else if ((attacker < 2) && !emptyExtension && fullSpawn && !!hostilesArr.length) {

    console.log('Spawning Attacker W48S3!');
    Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], attackerCreepW48S3, { memory: { globalRole: 'attacker', role: 'harvest', body: 'Attack', targetRoom: 'W48S3', } });
    Memory.creeps[attackerCreepW48S3].role = 'harvest';
    Memory.creeps[attackerCreepW48S3].globalRole = 'attacker';
  }
};
