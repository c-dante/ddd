import * as THREE from 'three';

// Sets up an orbit controlled camera
export const defaultCamera = (window) => {
	const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
	
	const resize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	return { resize, camera };
};

// Sets up a default scene
export const defaultScene = (container, camera) => {
	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	
	container.appendChild( renderer.domElement );

	const scene = new THREE.Scene();

	const render = () => renderer.render(scene, camera);
	const resize = () => renderer.setSize(window.innerWidth, window.innerHeight);

	return { renderer, scene, resize, render };
};

// A render and resize pipeline helper
export const pipeline = (objects) => {
	const renderable = objects.filter(x => x.render);
	const render = () => renderable.forEach((obj, i) => obj.render(objects, i));
	
	const resizeable = objects.filter(x => x.resize);
	const resize = () => resizeable.forEach((obj, i) => obj.resize(objects, i));

	return { render, resize };
}