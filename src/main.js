import { ErrorMapper } from './util/errorMapper';
import { logger } from './util/logger';

import { clearMemoryCreeps } from './memory/clearMemoryCreeps';
import { countCreepsW48S3 } from './memory/countCreepsW48S3';
import { countCreepsW48S2 } from './memory/countCreepsW48S2';

import { spawnNewCreeps } from './creeps/W48S3/spawningCreeps';
import { rolePrioritiesW48S3 } from './creeps/W48S3/rolePrioritiesW48S3';
import { rolePrioritiesW48S2 } from './creeps/W48S2/rolePrioritiesW48S2';
import { roleReserveController } from './creeps/W48S3/role/roleReserveController';

global.logger = logger;

export const loop = ErrorMapper.wrapLoop(() => {

	// console.log(`Current game tick is ${Game.time}`);

	const linkTo = Game.rooms['W48S3'].lookForAt('structure', 20, 34)[0];
	clearMemoryCreeps();
	// addCreepsNumsToMemory();
	countCreepsW48S3();
	countCreepsW48S2();
	// console.log(linkTo.store[RESOURCE_ENERGY])
	spawnNewCreeps();
	towersDefendRoom();
	towersRepairStructures();
	towersHealCreeps()

	if (linkTo.store[RESOURCE_ENERGY] < 300) {
		linkTransferEnergy();
	}

	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		if ((Memory.creeps[name].targetRoom == 'W48S3') && !(creep.memory.role == 'reserveController')) {
			rolePrioritiesW48S3(creep, name);
		} else if (creep.memory.role == 'reserveController') {
			roleReserveController(creep);
		} else if (Memory.creeps[name].targetRoom == 'W48S2') {
			rolePrioritiesW48S2(creep);
		}
	}
});

Game.rooms['W48S3'].memory.role = Game.rooms['W48S3'].memory.role || {};
Game.rooms['W48S3'].memory.creeps = Game.rooms['W48S3'].memory.creeps || [];

// add nums of all creeps by types in memory
// const addCreepsNumsToMemory = () => {
// 	const arr4BD = [];
// 	const arr12BD = [];

// 	for (let name in Game.creeps) {
// 		let creep = Game.creeps[name];

// 		if (creep.memory.body = '4BD') {
// 			arr4BD.push(creep.memory.body);
// 		} else if (creep.memory.body = '12BD') {
// 			arr12BD.push(creep.memory.body);
// 		}
// 	}

// 	Game.rooms['W48S3'].memory.CreepsCount.creeps4Body = arr4BD.length;
// 	Game.rooms['W48S3'].memory.CreepsCount.creeps12Body = arr12BD.length;
// 	Game.rooms['W48S3'].memory.CreepsCount.allCreeps = Object.keys(Game.creeps).length;
// };

// tower attack enemyes
const towersDefendRoom = () => {
	const hostiles = Game.spawns['SpawnOne'].room.find(FIND_HOSTILE_CREEPS);
	if (hostiles.length > 0) {
		const username = hostiles[0].owner.username;
		Game.notify(`User ${username} spotted in room ${'W48S3'}`);
		const towers = Game.spawns['SpawnOne'].room.find(
			FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
		towers.forEach(tower => tower.attack(hostiles[0]));
	}
};

// towers repair structures and heal creeps
const towersRepairStructures = () => {
	const hostiles = Game.spawns['SpawnOne'].room.find(FIND_HOSTILE_CREEPS);
	if (hostiles.length === 0) {
		// all roads
		const roads = Game.spawns['SpawnOne'].room.find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		});

		const roadNeedToRepair = roads.find((object) => object.hits < object.hitsMax)

		const towers = Game.spawns['SpawnOne'].room.find(
			FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
		towers.forEach(tower => tower.repair(roadNeedToRepair));
	}
};

// towers heal creeps
const towersHealCreeps = () => {
	const hostiles = Game.spawns['SpawnOne'].room.find(FIND_HOSTILE_CREEPS);
	let damagedCreepsArr = [];

	if (hostiles.length === 0) {
		for (let name in Game.creeps) {
			let creep = Game.creeps[name];
			if (creep.hits < creep.hitsMax) {
				damagedCreepsArr.push(creep);
			}
		}

		if (damagedCreepsArr.length > 0) {
			const towers = Game.spawns['SpawnOne'].room.find(
				FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
			towers.forEach(tower => tower.heal(damagedCreepsArr[0]));
		}
	}
};

// link transfer energy to another link
const linkTransferEnergy = () => {
	const linkFrom = Game.rooms['W48S3'].lookForAt('structure', 41, 43)[0];

	const linkTo = Game.rooms['W48S3'].lookForAt('structure', 20, 34)[0];
	console.log(linkTo)

	linkFrom.transferEnergy(linkTo);
};


// // check if extensions empty or full
// const isExtensionsEmpty = () => {
// 	const structures = Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES);
// 	const extensions = _.filter(structures, { 'structureType': STRUCTURE_EXTENSION });
// 	const isEmpty = !extensions.some((extension) => extension.store.getFreeCapacity() > 0);
// 	return isEmpty;
// };

// Game.spawns['SpawnOne'].room.find(FIND_TOMBSTONES).forEach(tombstone => {
// 	if (tombstone.creep.my) {
// 		console.log(`My creep died with ID=${tombstone.creep.id} ` +
// 			`and role=${Memory.creeps[tombstone.creep.name].role}`);
// 	}
// });
