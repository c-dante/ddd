import {
	Mesh,
	SphereGeometry,
	Vector3,
	Quaternion,
	AxesHelper,
	PointLight,
	MeshLambertMaterial,
	AmbientLight,
	Object3D,
	MeshBasicMaterial,
} from 'three';
import fp from 'lodash/fp';

import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';

const scratch = new Object3D();

const planet = (size, mat, quality = 8) => new Mesh(
	new SphereGeometry(size, quality, quality),
	mat,
);

// This changes the planet spin and speed
const spin = (new Vector3(-0.5, 1.0, 0.0)).normalize();
const rotSpeed = Math.PI / 180;

// x-z ellipse path based on parametric t between 0 => 2pi
const ellipsePath = (vec, t, a = 1, b = 1, c = 1) => vec.set(
	a * Math.cos(t),
	c * Math.sin(t),
	b * Math.sin(t)
);

const orbit = (
	width = 100,
	height = 100,
	depth = 100,
	speed = 1,
	start = 0,
) => ({
	width, height, speed, start, depth,
});

const qorbit = (depth, quat = new Quaternion()) => ({
	quat, depth,
});

const planetPos = (planet, clock) => {
	if (planet.orbit.quat) {
		planet.mesh.position.copy(
			util.unit.up.clone()
				.applyQuaternion(planet.orbit.quat)
				.setLength(1000)
		);
		// console.debug(planet.id, planet.mesh.position);
	} else {
		ellipsePath(
			planet.mesh.position,
			planet.orbit.start + planet.orbit.speed * clock.getElapsedTime(),
			planet.orbit.width,
			planet.orbit.height,
			planet.orbit.depth,
		);
	}

}

// Simple object of orbit + mesh
const orbitMesh = (orbit, mesh) => ({
	orbit,
	mesh,
	id: fp.random(0, 100000),
});

export default (container) => {
	const c = util.defaultCamera(container);
	const s = util.defaultScene(container, c.camera);
	
	s.scene.add(scratch);

	// Center
	const sol = planet(100, new MeshBasicMaterial(0xFFFFFF));
	const solLight = new PointLight(0xFFFFFF, 1);
	s.scene.add(solLight);
	
	const spaceLight = new AmbientLight(0x340687);
	s.scene.add(spaceLight);

	// Satellites
	const zion = orbitMesh(
		qorbit(1000),
		planet(10, new MeshLambertMaterial()),
	);
	zion.orbit.quat.setFromAxisAngle(
		new Vector3(0, 1, 0),
		Math.PI / 2 
	);
	const oz = orbitMesh(
		orbit(2100, 1400, 300, 0.25),
		planet(30, new MeshLambertMaterial({
			// wireframe: true,
			color: (0x00FF00)
		}), 20),
	);
	const graftis = orbitMesh(
		orbit(1500, 300, 200, 3, Math.PI / 60),
		planet(5, new MeshLambertMaterial({
			color: 0x0000FF,
		})),
	);
	const nova = orbitMesh(
		orbit(1500, 1800, 0, 3, Math.PI / 60),
		planet(20, new MeshLambertMaterial({
			color: 0xFF6600,
		})),
	);
	
	// Save our planets
	const planets = [zion, oz, graftis, nova];
	
	// sol.add(new AxesHelper(10000));
	
	// Add them
	s.scene.add(sol);
	planets.forEach(planet => s.scene.add(planet.mesh));


	// Look at stuff
	c.render = orbitControls(c.camera, {
		run: 50,
		turn: 0.03,
	});

	
	// Make a person on zion
	const p = new Mesh(new SphereGeometry(2), new MeshLambertMaterial({
		color: 0xFF00FF,
	}));
	oz.mesh.add(p);

	// Standing at a random point
	const pt = fp.sample(oz.mesh.geometry.vertices).clone();
	p.position.set(pt.x, pt.y, pt.z);	
	
	// And our render pipeline
	const render = (clock) => {
		// sunlight
		solLight.position.copy(sol.position);
		
		// Run planet orbits
		planets.forEach(planet => {
			planetPos(planet, clock);
			planet.mesh.rotateOnAxis(spin, rotSpeed / 100);
		});
		
		if (util.keyState['i']) {
			p.translateOnAxis(util.unit.forward, 1);
		}
		if (util.keyState['k']) {
			p.translateOnAxis(util.unit.back, 1);
		}

		// cam
		scratch.position.copy(p.getWorldPosition());
			// scratch.lookAt(oz.mesh.getWorldPosition());
			scratch.translateOnAxis(util.unit.forward, 50);
		c.camera.position.copy(scratch.position);
		c.camera.lookAt(sol.position);
	};

	return {
		// meshs
		c, s, p,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};

// Sketch box
// 
// Over the sholder camera progress:
// c.camera.translateOnAxis(util.unit.back, 30); // oz-size = 30
// c.camera.lookAt(sol.position);
// c.camera.translateOnAxis(util.unit.back, 125);
// c.camera.translateOnAxis(util.unit.right, 20);
// c.camera.translateOnAxis(util.unit.up, 20);

// @todo: move out movement styles
// @todo: 
