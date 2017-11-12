import {
	Mesh,
	PlaneGeometry,
	BoxGeometry,
	MeshLambertMaterial,
	AmbientLight,
	PointLight,
} from 'three';
import { camScene } from './baseScenes';
import * as util from '../util';
import { oui } from '../oui/oui';

import * as mat from '../materials';
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
		turn: Math.PI / 80,
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

	const light = new AmbientLight(0x000000);
	base.scene.add(light);
	
	const camLight = new PointLight(0xffffff, 1, 0);
	base.scene.add(camLight);

	// const lights = new Array(5).fill(0).map(
	// 	() => new PointLight(0xffffff, 1, 0)
	// );
	// lights.forEach(l => base.scene.add(l));

	const ui = oui(player.mesh.position, {
		title: 'Player.position',
	});

	const render = (delta) => {
		demoMat.uniforms.time.value += delta * 5;
		camLight.position.set(
			base.camera.position.x,
			base.camera.position.y,
			base.camera.position.z
		);

		// I might just want physics >_>
		if (player.mesh.position.y > ground.position.y) {
			player.mesh.position.y -= 0.5;
		}
	};

	return {
		// Base props
		...base,
		// Add my stuff
		ground, player, ui,
		// Override render/resize from base by extending it
		...util.pipeline([ui, base, demoMat, { render }]),
	};
}