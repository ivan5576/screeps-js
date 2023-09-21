export const spawnNewCreeps = () => {
  const workerCreepW48S3 = 'Worker-W48S3-' + Game.time.toString().slice(4);
  const workerCreepW48S2 = 'Worker-W48S2-' + Game.time.toString().slice(4);
  const attackCreepW48S3 = 'Attack-W48S3-' + Game.time.toString().slice(4);

  // const claimerCreep = 'Claimer-' + Game.time.toString().slice(4);

  let extensions = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_EXTENSION });
  let emptyExtension = extensions.find((extension) => extension.store.getFreeCapacity(RESOURCE_ENERGY));
  const fullSpawn = Game.spawns['SpawnOne'].store[RESOURCE_ENERGY] == 300;

  let hostiles = 0;
  if (Game.rooms.W48S2) {
    hostiles = Game.rooms.W48S2.find(FIND_HOSTILE_CREEPS);
  }

  const workersInW48S3 = Memory.rooms.W48S3.role['allCreeps'];
  const workersInW48S2 = Memory.rooms.W48S2.role['allCreeps'];

  if (!emptyExtension && fullSpawn && !hostiles.length) {
    if (workersInW48S3 < 2) {
      console.log('Spawning Worker W48S3!');
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], workerCreepW48S3, { memory: { role: 'harvest', body: 'Worker', targetRoom: 'W48S3', } });
      Memory.creeps[workerCreepW48S3].role = 'harvest';
    }
    // else if ((allWorkersCountW48S3 > 3) && !Memory.rooms.W48S3.role['reserveController']) {
    //   console.log('Spawning Claimer!');
    //   Game.spawns['SpawnOne'].spawnCreep([CLAIM, CLAIM, MOVE], claimerCreep, { memory: { role: 'reserveController', body: 'Claimer', targetRoom: 'W48S3', } });
    //   Memory.creeps[claimerCreep].role = 'reserveController';
    // }
    else if (workersInW48S2 < 1) {
      console.log('Spawning Worker W48S2!')
      console.log(workersInW48S2);
      Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], workerCreepW48S2, { memory: { role: 'harvest', body: 'Worker', targetRoom: 'W48S2', } });
      Memory.creeps[workerCreepW48S2].role = 'harvest';
    }
  } else if ((!emptyExtension && (Game.spawns['SpawnOne'].store[RESOURCE_ENERGY] == 300) && hostiles.length && Memory.rooms.W48S3.role['attack'] < 1) && (allWorkersCountW48S3 > 3)) {
    console.log('Spawning Worker W48S3!');
    Game.spawns['SpawnOne'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], workerCreepW48S3, { memory: { role: 'harvest', body: 'Attack', targetRoom: 'W48S3', } });
    Memory.creeps[attackCreepW48S3].role = 'harvest';
  }
};
