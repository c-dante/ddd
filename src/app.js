import './app.css';
import './oui/oui.css';

// import runShaderBox from './scene/shader-box';
// import runGrid from './scene/grid';
// import jumpNShootMan from './scene/jumpnshootman';
import weather from './scene/weather';

// Init stuff from the DOM + renderer
const container = document.getElementById('container');

// Run our shader box example
// const example = runShaderBox(container);
// const example = runGrid(container);
const example = weather(container);

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
