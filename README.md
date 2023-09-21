# Basic Screep JS starter
The repo is similar to [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter).

### Installation
1. Install node modules
```
npm i
```
2. Rename `screeps.sample.json` -> `screeps.json`.
3. Change `YOUR_TOKEN` in `screeps.json` to your own token.


### How to generate token
https://docs.screeps.com/auth-tokens.html

### Wiki

### Remove constructions

	const structures = Game.spawns['SpawnOne'].room.find(FIND_CONSTRUCTION_SITES);
	const walls = _.filter(structures, { 'structureType': STRUCTURE_WALL });
	console.log(structures);
	// for (const wall of walls) { wall.remove(); }

	const ramparts = _.filter(structures, { 'structureType': STRUCTURE_RAMPART });
	// console.log(ramparts);
	// for (const rampart of ramparts) { rampart.remove(); }
