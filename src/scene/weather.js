import {
	Mesh,
	SphereGeometry,
	Vector3,
	Quaternion,
	AxesHelper,
	PointLight,
} from 'three';
import fp from 'lodash/fp';

import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';

const planet = (size, mat) => new Mesh(
	new SphereGeometry(size),
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

	// Center
	const sol = planet(100, materials.wireframe(0xFF0000));
	const solLight = new PointLight(0xFFFFFF, 1);
	s.scene.add(solLight);

	// Satellites
	const zion = orbitMesh(
		qorbit(1000),
		planet(10, materials.wireframe()),
	);
	zion.orbit.quat.setFromAxisAngle(
		new Vector3(0, 1, 0),
		Math.PI / 2 
	);
	const oz = orbitMesh(
		orbit(2100, 1400, 300, 0.25),
		planet(30, materials.wireframe(0x33FF33)),
	);
	const graftis = orbitMesh(
		orbit(1500, 300, 200, 3, Math.PI / 60),
		planet(5, materials.wireframe(0x0000FF)),
	);
	const nova = orbitMesh(
		orbit(1500, 1800, 0, 3, Math.PI / 60),
		planet(20, materials.wireframe(0xFF6600)),
	);
	
	// Save our planets
	const planets = [zion, oz, graftis, nova];
	
	// sol.add(new AxesHelper(10000));
	
	// Add them
	s.scene.add(sol);
	planets.forEach(planet => s.scene.add(planet.mesh));


	// Look at stuff
	c.camera.position.set(0, 0, 3500);
	c.camera.lookAt(sol.position);
	c.render = orbitControls(c.camera, {
		run: 50,
		turn: 0.03,
	});

	
	// Make a person on zion
	const p = new Mesh(new SphereGeometry(0.1), materials.wireframe(0x00FF00));
	zion.mesh.add(p);

	// Standing at a random point
	const pt = fp.sample(zion.mesh.geometry.vertices).clone();
	p.position.set(pt.x, pt.y, pt.z);

	// And our render pipeline
	const render = (clock) => {
		// sunlight
		solLight.position.copy(sol.position);
		
		// Run planet orbits
		planets.forEach(planet => {
			planetPos(planet, clock);
			planet.mesh.rotateOnAxis(spin, rotSpeed);
		});
		
		c.camera.position.copy(
			oz.mesh.position
		);
		c.camera.lookAt(sol.position);
		c.camera.translateOnAxis(util.unit.back, 125)
	};

	return {
		// meshs
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};
