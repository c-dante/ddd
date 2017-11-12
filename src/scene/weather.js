import {
	Mesh,
	SphereGeometry,
	AmbientLight,
	PointLight,
} from 'three';
import fp from 'lodash/fp';

// import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';


export default (container) => {
	const c = util.defaultCamera(container);
	const s = util.defaultScene(container, c.camera);

	const size = 5;
	const zion = new Mesh(
		new SphereGeometry(size, size, size),
		materials.lambert()
	);

	// Pick a random point on zion
	// Move the camera a little further "away"
	const camHeight = 1;
	const pt = fp.sample(zion.geometry.vertices).clone();
	pt.setLength(pt.length() + camHeight);
	pt.add(zion.position);

	c.camera.position.x = pt.x;
	c.camera.position.x = pt.y;
	c.camera.position.y = pt.z;
	c.camera.lookAt(zion.position);

	c.render = orbitControls(c.camera);



	// c.camera.lookAt;
	// c.camera.translateOnAxis();
	s.scene.add(zion);

	const light = new AmbientLight(0x000000);
	s.scene.add(light);
	
	const camLight = new PointLight(0xffffff, 1, 0);
	s.scene.add(camLight);

	// And our render pipeline
	const render = (delta) => {
		// @todo: delta
		// console.debug(util.mouseState);
		// c.camera
	};

	return {
		// objects
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};
