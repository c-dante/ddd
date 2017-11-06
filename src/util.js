import * as THREE from 'three';

// Keyboard state -- key name -> true if down, false if up
export const keyState = {};
window.addEventListener('keydown', (evt) => {
	keyState[evt.key.toLowerCase()] = true;
}, { passive: true });
window.addEventListener('keyup', (evt) => {
	keyState[evt.key.toLowerCase()] = false;
}, { passive: true });

// Sets up a camera
export const defaultCamera = (container) => {
	const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 3000);

	const resize = () => {
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
	};

	return { resize, camera };
};

// Sets up a default scene
export const defaultScene = (container, camera) => {
	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();

	const render = () => renderer.render(scene, camera);
	const resize = () => renderer.setSize(container.clientWidth, container.clientHeight);

	return { renderer, scene, resize, render };
};

// A render and resize pipeline helper
export const pipeline = (objects) => {
	const renderable = objects.filter(x => x.render);
	const render = (...args) => renderable.forEach((obj, i) => obj.render(...args, objects, i));

	const resizeable = objects.filter(x => x.resize);
	const resize = (...args) => resizeable.forEach((obj, i) => obj.resize(...args, objects, i));

	return { render, resize };
};

/**
 * Constants for the basis unit vectors of 3 space, named
 * @type {Object.<String, Vector3>}
 */
export const unit = {
	up: new THREE.Vector3(0, 1, 0),
	down: new THREE.Vector3(0, -1, 0),
	left: new THREE.Vector3(-1, 0, 0),
	right: new THREE.Vector3(1, 0, 0),
	forward: new THREE.Vector3(0, 0, -1),
	back: new THREE.Vector3(0, 0, 1),
};
