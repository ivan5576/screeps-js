const towersRepairAndDefendW49S2 = (gameRoomObj) => {
  const towers = _.filter(gameRoomObj.find(FIND_MY_STRUCTURES), { 'structureType': STRUCTURE_TOWER });

  const playerAttackIgnore = ['nrei'];
  const hostilesIgnoreNrei = creep.room.find(FIND_HOSTILE_CREEPS)
    .filter((hostileCreep) => playerAttackIgnore.indexOf(hostileCreep.owner.username) === -1);

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

        if ((structure.structureType === 'rampart') && (structure.hits < 300000)) {
          emptyRamparts.push(structure);
        } else if ((structure.structureType === 'constructedWall') && (structure.hits < 300000)) {
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
