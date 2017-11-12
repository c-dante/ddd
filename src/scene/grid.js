import {
	Mesh,
	PlaneGeometry,
	BoxGeometry,
} from 'three';

import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';
import { orbitControls } from '../flyMove';

export const meshPlane = (material) => new Mesh(new PlaneGeometry(3, 3, 5, 5), material);

export default (container) => {
	const c = util.defaultCamera(container);
	c.render = orbitControls(c.camera);

	const s = util.defaultScene(container, c.camera);

	// Ho hum
	c.camera.position.z = 4;

	const demoMat = materials.demoMaterial();

	// Compose my objects onto the scene
	const testPlane = meshPlane(materials.wireframe(0x663399));
	testPlane.rotation.x = Math.PI / 7;
	s.scene.add(testPlane);

	const box = new Mesh(new BoxGeometry(0.75, 0.75, 0.75), demoMat.material);
	box.position.x = 0;
	box.position.y = 0;
	s.scene.add(box);

	// Throw down some UI
	const ui = oui(c.camera.position, { title: 'camera.position' });

	// And our render pipeline
	const render = (clock) => {
		const delta = clock.getDelta();
		demoMat.uniforms.time.value += delta * 5;
		box.rotation.y += delta;
		box.rotation.x += delta;

		testPlane.rotation.x -= delta;
		testPlane.rotation.y -= delta;
	};

	return {
		// ?
		ui,
		// objects
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, demoMat, { render }, ui]),
	};
};
