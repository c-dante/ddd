import {
	Mesh,
	SphereGeometry,
} from 'three';

// import { oui } from '../oui/oui';
import * as util from '../util';
import * as materials from '../materials';


export default (container) => {
	const c = util.defaultCamera(container);
	const s = util.defaultScene(container, c.camera);

	const zion = new Mesh(new SphereGeometry(1000, 1000, 1000), materials.wireframe());
	s.scene.add(zion);

	// And our render pipeline
	const render = (delta) => {
		// @todo: delta
	};

	return {
		// objects
		c, s,
		// pass on the render pipeline
		...util.pipeline([c, s, { render }]),
	};
};
