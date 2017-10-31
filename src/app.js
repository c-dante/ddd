import './app.scss';

// import runShaderBox from './shader-box';
import runGrid from './grid';

// Init stuff from the DOM + renderer
const container = document.getElementById( 'container' );

// Run our shader box example
// const example = runShaderBox(container);
const example = runGrid(container);

// Kick off window resize + run it once
window.addEventListener('resize', example.resize, false);
example.resize();

// Kick off the animate loop
(function animate() {
	requestAnimationFrame(animate);
	example.render();
})();
