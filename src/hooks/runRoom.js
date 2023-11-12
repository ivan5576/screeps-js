import { spawnCreep } from "./creeps/spawning/spawnCreep";
import { writeToMemory } from "../memory/writeToMemory";

// this function combines the spawn and memory functions for simplicity,
// so there is no need to run them separately.
// Also, in addition to this functions, a function rolePriorities is needed to start the room!

// The first parameter represents the target room (e.g., Game.rooms.W48S3).
// For spawning in a different room, use the second parameter as the room name (e.g., 'W49S2').
// If empty, the spawning room is the same as the target room.

export const runRoom = (gameRoomObj, spawnRoomName) => {
  spawnCreep(gameRoomObj, spawnRoomName);
  writeToMemory(gameRoomObj);
}
