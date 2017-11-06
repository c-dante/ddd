import { Quaternion } from 'three';
import { unit, keyState } from './util';

// Some controls -- takes target then object mapping control action to keys
const cacheQuat = new Quaternion();
export const orbitControls = (target, {
	forward = 'w',
	backward = 's',
	up = ' ',
	down = 'c',
	left = 'a',
	right = 'd',
	rollCW = 'e',
	rollCCW = 'q',
	turnLeft = 'arrowleft',
	turnRight = 'arrowright',
	turnUp = 'arrowup',
	turnDown = 'arrowdown',
	turn = 0.025,
	run = 0.05,
} = {}) => () => { // returns an update function
	let updateMatrix = false;

	// Move
	if (keyState[up]) {
		target.translateOnAxis(unit.up, run);
	}
	
	if (keyState[down]) {
		target.translateOnAxis(unit.down, run);
	}
	
	if (keyState[forward]) {
		target.translateOnAxis(unit.forward, run);
	}
	
	if (keyState[backward]) {
		target.translateOnAxis(unit.back, run);
	}
	
	if (keyState[left]) {
		target.translateOnAxis(unit.left, run);
	}
	
	if (keyState[right]) {
		target.translateOnAxis(unit.right, run);
	}
	
	
	// Turn
	if (keyState[turnLeft]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.up, turn)
		);
		updateMatrix = true;
	}
	
	if (keyState[turnRight]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.down, turn)
		);
		updateMatrix = true;
	}
	
	if (keyState[turnUp]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.right, turn)
		);
		updateMatrix = true;
	}
	
	if (keyState[turnDown]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.left, turn)
		);
		updateMatrix = true;
	}
	
	// Roll
	if (keyState[rollCW]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.forward, turn)
		);
		updateMatrix = true;
	}
	if (keyState[rollCCW]) {
		target.quaternion.multiply(
			cacheQuat.setFromAxisAngle(unit.back, turn)
		);
		updateMatrix = true;
	}

	if (updateMatrix && target.updateProjectionMatrix) {
		target.updateProjectionMatrix();
	}
};
