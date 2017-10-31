import './app.scss';

import runShaderBox from './shader-box';

// Init stuff from the DOM + renderer
const container = document.getElementById( 'container' );

// Run our shader box example
const shaderBoxExample = runShaderBox(container);

// Kick off window resize + run it once
window.addEventListener('resize', shaderBoxExample.resize, false);
shaderBoxExample.resize();

// Kick off the animate loop
(function animate() {
	requestAnimationFrame( animate );
	shaderBoxExample.render();
})();
