import {
	Mesh,
	SphereGeometry,
	Vector3,
} from 'three';
import fp from 'lodash/fp';

import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';

const planet = (size, mat) => new Mesh(
	new SphereGeometry(size),
	mat
);

const spin = (new Vector3(0.8, 0.2, 0.1)).normalize();
const rotSpeed = Math.PI / 180;

// x-z ellipse path based on parametric t between 0 => 2pi
const ellipsePath = (vec, t, a = 1, b = 1) => vec.set(
	a * Math.cos(t),
	vec.y,
	b * Math.sin(t)
);

// WOMP.
const makeOrbitPlanet = (
	size = 5,
	material = materials.wireframe(),
	a = 1000,
	b = 1000,
) => ({ mesh: planet(size, material), a, b });

export default (container) => {
	const c = util.defaultCamera(container);
	const s = util.defaultScene(container, c.camera);

	// Center
	const sol = makeOrbitPlanet(100, materials.wireframe(0xFF0000));

	// Satellites
	const zion = makeOrbitPlanet(10, materials.wireframe());
	const oz = makeOrbitPlanet(6, materials.wireframe(0x33FF33), 1010, 800);
	const graftis = makeOrbitPlanet(10, materials.wireframe(0x0000FF), 2000, 2000);
	const nova = makeOrbitPlanet(25, materials.wireframe(0xFF6600), 1500, 800);
	
	// Save our planets
	const planets = [zion, oz, graftis, nova];
	
	// Add them
	s.scene.add(sol.mesh);
	planets.forEach(planet => s.scene.add(planet.mesh));


	// Look at stuff
	c.camera.position.set(0, 3500, 0);
	c.camera.lookAt(sol.mesh.position);
	c.render = orbitControls(c.camera, {
		run: 0.5,
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
		// Rotate zion @todo: other planets
		zion.mesh.rotateOnAxis(spin, rotSpeed);

		// Run planet orbits
		planets.forEach(planet => {
			ellipsePath(
				planet.mesh.position,
				clock.getElapsedTime(),
				planet.a,
				planet.b
			);
		})
	};

	return {
		// meshs
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};
