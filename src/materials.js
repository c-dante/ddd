import {
	MeshBasicMaterial,
	MeshLambertMaterial,
	ShaderMaterial,
	Vector2,
} from 'three';

// Basic example material
import demoFrag from './shaders/frag1.frag';
import demoVert from './shaders/vert1.vert';
// Lets you pass in the uniforms object to make a new material 
export const demoMaterial = (matProps = {}) => {
	const uniforms = {
		time: { value: 1.0 },
		resolution: { value: new Vector2() },
	};
	
	const material = new ShaderMaterial({
		uniforms,
		vertexShader: demoVert,
		fragmentShader: demoFrag,
		...matProps,
	});

	const resize = () => {
		uniforms.resolution.value.x = window.innerWidth;
		uniforms.resolution.value.y = window.innerHeight;
	};

	const render = (clock) => {
		uniforms.time.value = clock.elapsedTime;
	};

	return { uniforms, material, resize, render };
};

// A wireframe of some color
export const wireframe = (color = 0x663399) => new MeshBasicMaterial({
	color,
	wireframe: true,
});

export const lambert = (color = 0x663399) => new MeshLambertMaterial({
	color,
});
