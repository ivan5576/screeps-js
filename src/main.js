import { ErrorMapper } from './util/errorMapper';
import { logger } from './util/logger';

import { clearMemory } from './memory/clearMemory';
import { writeToMemory } from './memory/writeToMemory';
import { countCreepsW48S3 } from './memory/countCreepsW48S3';
import { countCreepsW49S3 } from './memory/countCreepsW49S3';

import { spawnNewCreeps } from './creeps/W48S3/spawningCreeps';

import { spawnCreepsW49S3 } from './creeps/W49S3/spawnCreepsW49S3';
import { rolePrioritiesW48S3 } from './creeps/W48S3/rolePrioritiesW48S3';
import { rolePrioritiesW49S3 } from './creeps/W49S3/rolePrioritiesW49S3';
import { rolePriorities } from './hooks/creeps/rolePriorities';
import { spawnCreep } from './hooks/creeps/spawning/spawnCreep';
import { linkEnergyTransfer } from './hooks/constructions/linkEnergyTransfer';

// import { countCreepsW49S2 } from './memory/countCreepsW49S2';
// import { roleReserveController } from './creeps/W48S2/role/roleReserveController';

global.logger = logger;

// Game.rooms['W48S3'].memory.role = Game.rooms['W48S3'].memory.role || {};
// Game.rooms['W48S3'].memory.globalRole = Game.rooms['W48S3'].memory.globalRole || {};
// Game.rooms['W49S3'].memory.role = Game.rooms['W49S3'].memory.role || {};
// Game.rooms['W49S3'].memory.globalRole = Game.rooms['W49S3'].memory.globalRole || {};
Memory.rooms.W49S2 = Memory.rooms.W49S2 || {};

export const loop = ErrorMapper.wrapLoop(() => {

	// console.log(`Current game tick is ${Game.time}`);

	clearMemory();
	writeToMemory(Game.rooms.W49S2);
	countCreepsW48S3();
	countCreepsW49S3();

	spawnCreep(Game.rooms.W49S2);

	spawnNewCreeps();
	spawnCreepsW49S3();
	towersRepairAndDefendW48S3();
	towersRepairAndDefendW49S3();

	towersRepairAndDefendW49S2(Game.rooms['W49S2']);
	linkEnergyTransfer(Game.rooms['W49S2'].lookForAt('structure', 19, 44)[0], Game.rooms['W49S2'].lookForAt('structure', 20, 9)[0]);

	linkTransferEnergy();

	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		if (Memory.creeps[name].targetRoom == 'W48S3') {
			rolePrioritiesW48S3(creep);
		}
		else if (Memory.creeps[name].targetRoom == 'W49S3') {
			rolePrioritiesW49S3(creep);
		} else if (Memory.creeps[name].targetRoom == 'W49S2') {
			rolePriorities(creep, Game.rooms.W49S2, Game.flags.GatherPoint, Game.flags.flagW49S1Source);
		}
	}

});

const towersRepairAndDefendW49S2 = (gameRoomObj) => {
	const towers = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });

	const playerAttackIgnore = ['nrei'];
	const hostilesIgnoreNrei = Game.rooms.W49S2 ? Game.rooms.W49S2.find(FIND_HOSTILE_CREEPS)
		.filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1) : null;

	if (towers.length > 0) {
		const hostiles = towers[0].pos.findInRange(hostilesIgnoreNrei, 14);
		const invader = towers[0].pos.findClosestByRange(hostilesIgnoreNrei, {
			filter: { owner: { username: 'Invader' } }
		}) || [];
		const allHostiles = hostiles.concat(invader);
		const hasHostiles = allHostiles.length;

		if (hasHostiles) {

			towers.forEach(tower => tower.attack(allHostiles[0]));

		} else if (!hasHostiles) {

			const allStructures = gameRoomObj.find(FIND_STRUCTURES);
			let emptyWalls = [];
			let emptyRamparts = [];
			let emptyRoads = [];
			let towers = [];

			allStructures.forEach((structure) => {

				if ((structure.structureType === 'rampart') && (structure.hits < 1000000)) {
					emptyRamparts.push(structure);
				} else if ((structure.structureType === 'constructedWall') && (structure.hits < 1000000)) {
					emptyWalls.push(structure);
				} else if ((structure.structureType === 'road') && (structure.hits < structure.hitsMax)) {
					emptyRoads.push(structure);
				} else if (structure.structureType === 'tower') {
					towers.push(structure);
				}
			});

			// all empty structures
			const allRepairStructures = emptyWalls.concat(emptyRamparts, emptyRoads);
			// console.log('W49S3 need to repair ' + allRepairStructures.length + ' structures');

			if (allRepairStructures.length) {
				towers.forEach(tower => tower.repair(allRepairStructures[0]));
			}
		}
	} else return null;
	// console.log('Err. in \'towersRepairAndDefendW48S2\' function!')

};

const towersRepairAndDefendW48S3 = () => {
	const towers = _.filter(Game.spawns['SpawnOne'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
	const firstTower = towers[0];
	const secondTower = towers[1];
	const thirdTower = towers[2];

	const hostiles = secondTower.pos.findInRange(FIND_HOSTILE_CREEPS, 14);
	const invader = secondTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
		filter: { owner: { username: 'Invader' } }
	}) || [];
	const allHostiles = hostiles.concat(invader);
	const hasHostiles = allHostiles.length;

	if (hasHostiles) {

		towers.forEach(tower => tower.attack(allHostiles[0]));

	} else if (!hasHostiles) {

		const allStructures = Game.spawns['SpawnOne'].room.find(FIND_STRUCTURES);
		let emptyWalls = [];
		let emptyRamparts = [];
		let emptyRoads = [];
		let towers = [];

		allStructures.forEach((structure) => {

			if ((structure.structureType === 'rampart') && (structure.hits < 600000)) {
				emptyRamparts.push(structure);
			} else if ((structure.structureType === 'constructedWall') && (structure.hits < 600000)) {
				emptyWalls.push(structure);
			} else if ((structure.structureType === 'road') && (structure.hits < structure.hitsMax)) {
				emptyRoads.push(structure);
			} else if (structure.structureType === 'tower') {
				towers.push(structure);
			}
		});

		// all empty structures
		const allRepairStructures = emptyWalls.concat(emptyRamparts, emptyRoads);
		// console.log('W49S3 need to repair ' + allRepairStructures.length + ' structures');

		if (allRepairStructures.length) {
			towers.forEach(tower => tower.repair(allRepairStructures[0]));
		}
	}
};

const towersRepairAndDefendW49S3 = () => {
	const towers = _.filter(Game.spawns['SpawnW49S3'].room.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });
	const firstTower = towers[0];
	const secondTower = towers[1];
	const hostiles = secondTower.pos.findInRange(FIND_HOSTILE_CREEPS, 14);
	const invader = secondTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
		filter: { owner: { username: 'Invader' } }
	}) || [];
	const allHostiles = hostiles.concat(invader);
	const hasHostiles = allHostiles.length;

	if (hasHostiles) {

		towers.forEach(tower => tower.attack(allHostiles[0]));

	} else if (!hasHostiles) {

		const allStructures = Game.spawns['SpawnW49S3'].room.find(FIND_STRUCTURES);
		let emptyWalls = [];
		let emptyRamparts = [];
		let emptyRoads = [];
		let towers = [];

		allStructures.forEach((structure) => {

			if ((structure.structureType === 'rampart') && (structure.hits < 1011000)) {
				emptyRamparts.push(structure);
			} else if ((structure.structureType === 'constructedWall') && (structure.hits < 1000000)) {
				emptyWalls.push(structure);
			} else if ((structure.structureType === 'road') && (structure.hits < structure.hitsMax)) {
				emptyRoads.push(structure);
			} else if (structure.structureType === 'tower') {
				towers.push(structure);
			}
		});

		// all empty structures
		const allRepairStructures = emptyRamparts.concat(emptyWalls, emptyRoads);
		// console.log('W49S3 need to repair ' + allRepairStructures.length + ' structures');

		if (allRepairStructures.length) {
			towers.forEach(tower => tower.repair(allRepairStructures[0]));
		}
	}
};

// link transfer energy to another link
const linkTransferEnergy = () => {
	const linkFrom = Game.rooms['W48S3'].lookForAt('structure', 41, 43)[0];
	// const linkFrom2 = Game.rooms['W48S3'].lookForAt('structure', 10, 2)[0];
	const linkTo = Game.rooms['W48S3'].lookForAt('structure', 12, 32)[0];
	const linkFromW49S3 = Game.rooms['W49S3'].lookForAt('structure', 20, 8)[0];
	const linkToW49S3 = Game.rooms['W49S3'].lookForAt('structure', 11, 25)[0];
	// console.log(linkTo)
	if (linkTo.store[RESOURCE_ENERGY] < 799) {
		linkFrom.transferEnergy(linkTo);
	}
	if (linkTo.store[RESOURCE_ENERGY] < 799) {
		// linkFrom2.transferEnergy(linkTo);
	}
	if (linkToW49S3.store[RESOURCE_ENERGY] < 799) {
		linkFromW49S3.transferEnergy(linkToW49S3);
	}
};

// send creep to W49S3 if undefined
const sendW49S3FinderCreep = () => {
	if (Game.creeps['W49S3Finder']) {
		Game.creeps['W49S3Finder'].moveTo(Game.flags.FlagW49S3Wait);
	}
};
