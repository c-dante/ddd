import * as THREE from 'three';

import './app.scss';
import fragShader from './shaders/frag1.frag';
import vertShader from './shaders/vert1.vert';

var container;
var camera, scene, renderer;
var uniforms1;
var clock = new THREE.Clock();

init();

animate();

function init() {
	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.z = 4;

	scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry( 0.75, 0.75, 0.75 );

	uniforms1 = {
		time:       { value: 1.0 },
		resolution: { value: new THREE.Vector2() },
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms1,
		vertexShader: vertShader,
		fragmentShader: fragShader,
	});

	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = 0;
	mesh.position.y = 0;
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize( ) {
	uniforms1.resolution.value.x = window.innerWidth;
	uniforms1.resolution.value.y = window.innerHeight;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	var delta = clock.getDelta();
	uniforms1.time.value += delta * 5;
	for ( var i = 0; i < scene.children.length; i ++ ) {
		var object = scene.children[ i ];
		object.rotation.y += delta * 0.5 * ( i % 2 ? 1 : -1 );
		object.rotation.x += delta * 0.5 * ( i % 2 ? -1 : 1 );
	}
	renderer.render( scene, camera );
}

