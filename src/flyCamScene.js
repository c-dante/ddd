import * as util from './util';
import { orbitControls } from './flyMove';

export default (container) => {
	const c = util.defaultCamera(container);
	c.render = orbitControls(c.camera);
	const s = util.defaultScene(container, c.camera);

	return {
		camera: c.camera,
		scene: s.scene,
		// pass on the render pipeline + get back render
		...util.pipeline([c, s]),
	};
};
