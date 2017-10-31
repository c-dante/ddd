webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2O6T");


/***/ }),

/***/ "2O6T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("Ztqr");

var _grid = __webpack_require__("Pb5E");

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stuff from the DOM + renderer
var container = document.getElementById('container');

// Run our shader box example
// const example = runShaderBox(container);


// import runShaderBox from './shader-box';
var example = (0, _grid2.default)(container);

// Kick off window resize + run it once
window.addEventListener('resize', example.resize, false);
example.resize();

// Kick off the animate loop
(function animate() {
	requestAnimationFrame(animate);
	example.render();
})();

/***/ }),

/***/ "Pb5E":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.meshPlane = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _three = __webpack_require__("dKqR");

var _util = __webpack_require__("jHzk");

var util = _interopRequireWildcard(_util);

var _materials = __webpack_require__("jVsw");

var materials = _interopRequireWildcard(_materials);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var meshPlane = exports.meshPlane = function meshPlane(material) {
	return new _three.Mesh(new _three.PlaneGeometry(20000, 20000, 200, 200), material);
};

exports.default = function (container) {
	var c = util.defaultCamera(window);
	var s = util.defaultScene(container, c.camera);

	c.camera.position.z = 4;

	var demoMat = materials.demoMaterial();

	// Compose my objects onto the scene
	// const testPlane = meshPlane(demoMat.material);
	// s.scene.add(testPlane);

	var box = new _three.Mesh(new _three.BoxGeometry(0.75, 0.75, 0.75), demoMat.material);
	box.position.x = 0;
	box.position.y = 0;
	s.scene.add(box);

	var clock = new _three.Clock();
	var render = function render() {
		var delta = clock.getDelta();
		demoMat.uniforms.time.value += delta * 5;
		box.rotation.y += delta;
		box.rotation.x += delta;
	};

	return _extends({
		// objects
		c: c, s: s
	}, util.pipeline([c, s, demoMat, { render: render }]));
};

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

/***/ "jHzk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pipeline = exports.defaultScene = exports.defaultCamera = undefined;

var _three = __webpack_require__("dKqR");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Sets up an orbit controlled camera
var defaultCamera = exports.defaultCamera = function defaultCamera(window) {
	var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);

	var resize = function resize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};

	return { resize: resize, camera: camera };
};

// Sets up a default scene
var defaultScene = exports.defaultScene = function defaultScene(container, camera) {
	var renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	var scene = new THREE.Scene();

	var render = function render() {
		return renderer.render(scene, camera);
	};
	var resize = function resize() {
		return renderer.setSize(window.innerWidth, window.innerHeight);
	};

	return { renderer: renderer, scene: scene, resize: resize, render: render };
};

// A render and resize pipeline helper
var pipeline = exports.pipeline = function pipeline(objects) {
	var renderable = objects.filter(function (x) {
		return x.render;
	});
	var render = function render() {
		return renderable.forEach(function (obj, i) {
			return obj.render(objects, i);
		});
	};

	var resizeable = objects.filter(function (x) {
		return x.resize;
	});
	var resize = function resize() {
		return resizeable.forEach(function (obj, i) {
			return obj.resize(objects, i);
		});
	};

	return { render: render, resize: resize };
};

/***/ }),

/***/ "jVsw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.demoMaterial = undefined;

var _three = __webpack_require__("dKqR");

var _frag = __webpack_require__("kioU");

var _frag2 = _interopRequireDefault(_frag);

var _vert = __webpack_require__("RdJe");

var _vert2 = _interopRequireDefault(_vert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Lets you pass in the uniforms object to make a new material 


// Basic example material
var demoMaterial = exports.demoMaterial = function demoMaterial() {
	var uniforms = {
		time: { value: 1.0 },
		resolution: { value: new _three.Vector2() }
	};

	var material = new _three.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: _vert2.default,
		fragmentShader: _frag2.default
	});

	var resize = function resize() {
		uniforms.resolution.value.x = window.innerWidth;
		uniforms.resolution.value.y = window.innerHeight;
	};

	return { uniforms: uniforms, material: material, resize: resize };
};

/***/ }),

/***/ "kioU":
/***/ (function(module, exports) {

module.exports = "uniform float time;\nuniform vec2 resolution;\nvarying vec2 vUv;\nvoid main( void ) {\n\tvec2 position = -1.0 + 2.0 * vUv;\n\tfloat red = abs( sin( position.x * position.y + time / 5.0 ) );\n\tfloat green = abs( sin( position.x * position.y + time / 4.0 ) );\n\tfloat blue = abs( sin( position.x * position.y + time / 3.0 ) );\n\tgl_FragColor = vec4( red, green, blue, 1.0 );\n}\n\n"

/***/ })

},[0]);
//# sourceMappingURL=app.bundle.js.map