import * as THREE from 'three';

// Sets up an orbit controlled camera
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
}

export const wireframe = color => new THREE.MeshBasicMaterial({ color, wireframe: true });