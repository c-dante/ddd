import {
	Mesh,
	PlaneGeometry,
	BoxGeometry,
	MeshLambertMaterial,
} from 'three';
import { camScene } from './baseScenes';
import * as util from './util';

import * as mat from './materials';
const demoMat = mat.demoMaterial({
	wireframe: true,
});

const makeUnit = ({
	health = 100,
	mesh = new Mesh(new BoxGeometry(1, 1, 1), demoMat.material),
} = {}) => ({
	health, mesh,
});

export default (container) => {
	// Build a base flycam scene
	const base = camScene(container, {
		run: 0.5,
	});

	// Make some ground
	
	const ground = new Mesh(
		new PlaneGeometry(1000, 1000, 100, 100),
		demoMat.material,
	);
	ground.rotateX(Math.PI / 2);
	ground.position.y = -10;
	ground.position.z = -100;
	base.scene.add(ground);

	
	// Make a player
	const playerMat = new MeshLambertMaterial({
		color: 0xff00ff,
	});
	const player = makeUnit({
		mesh: new Mesh(new BoxGeometry(1, 2, 1), playerMat),
	});
	player.mesh.x = base.camera.x;
	player.mesh.y = base.camera.y;
	player.mesh.z = base.camera.z;
	player.mesh.translateOnAxis(util.unit.forward, 5);
	base.scene.add(player.mesh);

	const render = (delta) => {
		demoMat.uniforms.time.value += delta * 5;
	};

	return {
		// Base props
		...base,
		// Add my stuff
		ground, player,
		// Override render/resize from base by extending it
		...util.pipeline([base, demoMat, { render }]),
	};
}