import {
	Mesh,
	PlaneGeometry,
	BoxGeometry,
	Clock,
} from 'three';
import * as util from './util';
import * as materials from './materials';

export const meshPlane = (material) => new Mesh(new PlaneGeometry(20000, 20000, 200, 200), material);

export default (container) => {
	const c = util.defaultCamera(window);
	const s = util.defaultScene(container, c.camera);

	c.camera.position.z = 4;	

	const demoMat = materials.demoMaterial();

	// Compose my objects onto the scene
	// const testPlane = meshPlane(demoMat.material);
	// s.scene.add(testPlane);

	const box = new Mesh(new BoxGeometry(0.75, 0.75, 0.75), demoMat.material);
	box.position.x = 0;
	box.position.y = 0;
	s.scene.add(box);

	const clock = new Clock();
	const render = () => {
		const delta = clock.getDelta();
		demoMat.uniforms.time.value += delta * 5;
		box.rotation.y += delta;
		box.rotation.x += delta;
	};

	return {
		// objects
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, demoMat, { render }]),
	};
};
