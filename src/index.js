import './app.css';
import './oui/oui.css';

// Attach our app
const container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);

import runShaderBox from './scene/shader-box';
// import runGrid from './scene/grid';
// import jumpNShootMan from './scene/jumpnshootman';
// import weather from './scene/weather';

// Run our shader box example
const example = runShaderBox(container);
// const example = runGrid(container);
// const example = weather(container);

// console.debug('Current example: ', example);

// Kick off window resize + run it once
window.addEventListener('resize', example.resize, false);
example.resize();

// Kick off the animate loop
import { Clock } from 'three';
const clock = new Clock();
(function animate() {
	requestAnimationFrame(animate);
	example.render(clock);
})();
