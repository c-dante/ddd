import {
	ShaderMaterial,
	Vector2,
} from 'three';

// Basic example material
import demoFrag from './shaders/frag1.frag';
import demoVert from './shaders/vert1.vert';
// Lets you pass in the uniforms object to make a new material 
export const demoMaterial = () => {
	const uniforms = {
		time: { value: 1.0 },
		resolution: { value: new Vector2() },
	};
	
	const material = new ShaderMaterial({
		uniforms,
		vertexShader: demoVert,
		fragmentShader: demoFrag,
	});

	const resize = () => {
		uniforms.resolution.value.x = window.innerWidth;
		uniforms.resolution.value.y = window.innerHeight;
	};

	return { uniforms, material, resize };
};