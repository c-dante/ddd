import * as util from './util';
import { orbitControls } from './flyMove';

export const camScene = (
	container,
	flyParams = {}
) => {
	const c = util.defaultCamera(container);
	if (flyParams) {
		c.render = orbitControls(c.camera, flyParams);
	}

	const s = util.defaultScene(container, c.camera);

	return {
		camera: c.camera,
		scene: s.scene,
		// pass on the render pipeline + get back render
		...util.pipeline([c, s]),
	};
};
