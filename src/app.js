import './app.scss';

// import runShaderBox from './shader-box';
import runGrid from './grid';

// Init stuff from the DOM + renderer
const container = document.getElementById('container');

// Run our shader box example
// const example = runShaderBox(container);
const example = runGrid(container);

console.debug('Current example: ', example);

// Kick off window resize + run it once
window.addEventListener('resize', example.resize, false);
example.resize();

// Kick off the animate loop
import { Clock } from 'three';
const clock = new Clock();
(function animate() {
	requestAnimationFrame(animate);
	example.render(clock.getDelta());
})();
