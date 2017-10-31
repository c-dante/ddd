import * as THREE from 'three';

import fragmentShader from './shaders/frag1.frag';
import vertexShader from './shaders/vert1.vert';

// Lets you pass in the uniforms object to make a new material 
export const getMaterial = uniforms => new THREE.ShaderMaterial({
	uniforms,
	vertexShader,
	fragmentShader,
});

// It gets a box geom
const getBox = () => new THREE.BoxGeometry(0.75, 0.75, 0.75);

/**
 * The shader box example.
 * 
 * @param {HtmlElement} container - DOM element to render to
 */
export default (container) => {
	// Build our renderer
	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	// Build the camera for the demo
	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 4;

	// Start our scene
	const scene = new THREE.Scene();

	// Declare uniforms here so each run of example gets its own state
	const uniformVars = {
		time: { value: 1.0 },
		resolution: { value: new THREE.Vector2() },
	};

	// Build some geometry + give it a shader + add it to the scene
	const mesh = new THREE.Mesh(getBox(), getMaterial(uniformVars));
	mesh.position.x = 0;
	mesh.position.y = 0;
	scene.add(mesh);

	// Set up rendering + clock
	const clock = new THREE.Clock();

	// The render loop
	const render = () => {
		const delta = clock.getDelta();
		
		// MUTATING UNIFORMS!?
		uniformVars.time.value += delta * 5;
		for ( var i = 0; i < scene.children.length; i ++ ) {
			var object = scene.children[ i ];
			object.rotation.y += delta * 0.5 * ( i % 2 ? 1 : -1 );
			object.rotation.x += delta * 0.5 * ( i % 2 ? -1 : 1 );
		}
		renderer.render(scene, camera);
	};

	// And finally, the resize handerl
	const resize = () => {
		// Resize renderer
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Update uniform on material
		uniformVars.resolution.value.x = window.innerWidth;
		uniformVars.resolution.value.y = window.innerHeight;
		
		// Update camera + projection matrix
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	// Return our objects because ¯\_(ツ)_/¯
	return {
		camera,
		scene,
		mesh,
		render,
		resize,
	};
};