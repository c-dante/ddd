import {
	Mesh,
	SphereGeometry,
	Vector3,
} from 'three';
import fp from 'lodash/fp';

// import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';

const planet = (size, mat) => new Mesh(
	new SphereGeometry(size),
	mat
);

const spin = (new Vector3(0.8, 0.2, 0.1)).normalize();
const rotSpeed = Math.PI / 180;

export default (container) => {
	const c = util.defaultCamera(container);
	const s = util.defaultScene(container, c.camera);

	const zion = planet(10, materials.wireframe());
	const sol = planet(100, materials.wireframe(0xFF0000));
	sol.position.set(0, 0, -2000);

	// Fly controls on camera
	c.render = orbitControls(c.camera, {
		run: 0.5,
		turn: 0.03,
	});

	// c.camera.lookAt;
	// c.camera.translateOnAxis();
	s.scene.add(zion);
	s.scene.add(sol);

	const p = new Mesh(new SphereGeometry(0.1), materials.wireframe(0x00FF00));
	zion.add(p);
	// Pick a point on zion
	const pt = fp.sample(zion.geometry.vertices).clone();
	p.position.set(pt.x, pt.y, pt.z);

	// And our render pipeline
	const render = (delta) => {
		zion.rotateOnAxis(spin, rotSpeed);
	};

	return {
		// objects
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};
