webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2O6T");


/***/ }),

/***/ "2O6T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _three = __webpack_require__("dKqR");

var THREE = _interopRequireWildcard(_three);

__webpack_require__("Ztqr");

var _frag = __webpack_require__("kioU");

var _frag2 = _interopRequireDefault(_frag);

var _vert = __webpack_require__("RdJe");

var _vert2 = _interopRequireDefault(_vert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var container;
var camera, scene, renderer;
var uniforms1;
var clock = new THREE.Clock();

init();

animate();

function init() {
	container = document.getElementById('container');

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
	camera.position.z = 4;

	scene = new THREE.Scene();

	var geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);

	uniforms1 = {
		time: { value: 1.0 },
		resolution: { value: new THREE.Vector2() }
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms1,
		vertexShader: _vert2.default,
		fragmentShader: _frag2.default
	});

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.x = 0;
	mesh.position.y = 0;
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);
	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
	uniforms1.resolution.value.x = window.innerWidth;
	uniforms1.resolution.value.y = window.innerHeight;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
	requestAnimationFrame(animate);
	render();
}
function render() {
	var delta = clock.getDelta();
	uniforms1.time.value += delta * 5;
	for (var i = 0; i < scene.children.length; i++) {
		var object = scene.children[i];
		object.rotation.y += delta * 0.5 * (i % 2 ? 1 : -1);
		object.rotation.x += delta * 0.5 * (i % 2 ? -1 : 1);
	}
	renderer.render(scene, camera);
}

/***/ }),

/***/ "RdJe":
/***/ (function(module, exports) {

module.exports = "varying vec2 vUv;\nvoid main()\n{\n\tvUv = uv;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n}\n\n"

/***/ }),

/***/ "U5/m":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("lcwS")(undefined);
// imports


// module
exports.push([module.i, ".hidden {\n  display: none; }\n", ""]);

// exports


/***/ }),

/***/ "Ztqr":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("U5/m");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("BMrJ")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "kioU":
/***/ (function(module, exports) {

module.exports = "uniform float time;\nuniform vec2 resolution;\nvarying vec2 vUv;\nvoid main( void ) {\n\tvec2 position = -1.0 + 2.0 * vUv;\n\tfloat red = abs( sin( position.x * position.y + time / 5.0 ) );\n\tfloat green = abs( sin( position.x * position.y + time / 4.0 ) );\n\tfloat blue = abs( sin( position.x * position.y + time / 3.0 ) );\n\tgl_FragColor = vec4( red, green, blue, 1.0 );\n}\n\n"

/***/ })

},[0]);
//# sourceMappingURL=app.bundle.js.map