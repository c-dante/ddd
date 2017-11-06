webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2O6T");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2O6T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("Ztqr");

var _grid = __webpack_require__("Pb5E");

var _grid2 = _interopRequireDefault(_grid);

var _three = __webpack_require__("dKqR");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stuff from the DOM + renderer
var container = document.getElementById('container');

// Run our shader box example
// const example = runShaderBox(container);


// import runShaderBox from './shader-box';
var example = (0, _grid2.default)(container);

console.debug('Current example: ', example);

// Kick off window resize + run it once
window.addEventListener('resize', example.resize, false);
example.resize();

// Kick off the animate loop

var clock = new _three.Clock();
(function animate() {
	requestAnimationFrame(animate);
	example.render(clock.getDelta());
})();

/***/ }),

/***/ "4xDJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.oui = exports.DEFAULT_DOM = undefined;

var _util = __webpack_require__("xArE");

var util = _interopRequireWildcard(_util);

var _group = __webpack_require__("QRK5");

var _prop = __webpack_require__("AnoS");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// The default dom to attach
var DEFAULT_DOM = exports.DEFAULT_DOM = util.element({
	dom: document.body,
	classes: [util.OUI_ROOT_CLASS]
}); // dat.gui is okay
// I like their components though...


// this is an object ui I guess.


// oui.
var oui = exports.oui = function oui(object) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$include = _ref.include,
	    include = _ref$include === undefined ? undefined : _ref$include,
	    _ref$exclude = _ref.exclude,
	    exclude = _ref$exclude === undefined ? undefined : _ref$exclude,
	    _ref$dom = _ref.dom,
	    dom = _ref$dom === undefined ? DEFAULT_DOM : _ref$dom,
	    _ref$title = _ref.title,
	    title = _ref$title === undefined ? '' : _ref$title;

	// Filter props
	var blacklist = util.argToSet(exclude);
	var whitelist = util.argToSet(include);
	var props = Object.keys(object).filter(function (key) {
		return util.blackWhiteFilter(key, blacklist, whitelist);
	});

	// Build UI from props
	var controllers = props.map(function (prop) {
		return new _prop.PropUi(object, [prop]);
	});
	var grouping = new _group.GroupUi(dom, controllers.map(function (x) {
		return x.elt;
	}), title);

	var render = function render() {
		controllers.forEach(function (ctrl) {
			return ctrl.render();
		});
	};

	return {
		grouping: grouping,
		controllers: controllers,
		render: render
	};
};

/***/ }),

/***/ "AnoS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PropUi = exports.PROP_INPUT_CLASS = exports.PROP_NUMBER_CLASS = exports.PROP_CLASS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fp = __webpack_require__("4lyv");

var _fp2 = _interopRequireDefault(_fp);

var _util = __webpack_require__("xArE");

var _number = __webpack_require__("vHUV");

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PROP_CLASS = exports.PROP_CLASS = 'oui-prop';
var PROP_NUMBER_CLASS = exports.PROP_NUMBER_CLASS = 'oui-prop--number';
var PROP_INPUT_CLASS = exports.PROP_INPUT_CLASS = 'oui-prop--input';

// Basic property ui component
// @todo: this is numeric only right now -- might abstract if I care

var PropUi = exports.PropUi = function () {
	function PropUi(object, path, dom) {
		var _this = this;

		_classCallCheck(this, PropUi);

		this.object = object;
		this.path = path;

		// Build our html
		var html = void 0;
		var classes = [PROP_CLASS];
		var reflectVal = _fp2.default.get(path, object);
		if (_fp2.default.isNumber(reflectVal)) {
			html = (0, _number2.default)({
				title: path.join('.')
			});
			classes.push(PROP_NUMBER_CLASS);
		}

		// Build the DOM element
		this.elt = (0, _util.element)({
			dom: dom,
			html: html,
			classes: classes
		});

		// Hook inputs
		this.input = this.elt.querySelector('.' + PROP_INPUT_CLASS);
		this.input.addEventListener('input', function (evt) {
			return _this.commit(evt);
		});

		// Update initial state
		this.render();
	}

	_createClass(PropUi, [{
		key: 'commit',
		value: function commit(evt) {
			var val = evt.target.value;
			if (!isNaN(val)) {
				(0, _util.setProp)(this.object, this.path, val);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var val = _fp2.default.get(this.path, this.object);
			if (!isNaN(val)) {
				this.input.value = val;
			}
		}
	}]);

	return PropUi;
}();

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

var _oui = __webpack_require__("4xDJ");

var _util = __webpack_require__("jHzk");

var util = _interopRequireWildcard(_util);

var _materials = __webpack_require__("jVsw");

var materials = _interopRequireWildcard(_materials);

var _flyMove = __webpack_require__("mzyf");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var meshPlane = exports.meshPlane = function meshPlane(material) {
	return new _three.Mesh(new _three.PlaneGeometry(3, 3, 5, 5), material);
};

exports.default = function (container) {
	var c = util.defaultCamera(container);
	c.render = (0, _flyMove.orbitControls)(c.camera);

	var s = util.defaultScene(container, c.camera);

	// Ho hum
	c.camera.position.z = 4;

	var demoMat = materials.demoMaterial();

	// Compose my objects onto the scene
	var testPlane = meshPlane(materials.wireframe(0x663399));
	testPlane.rotation.x = Math.PI / 7;
	s.scene.add(testPlane);

	var box = new _three.Mesh(new _three.BoxGeometry(0.75, 0.75, 0.75), demoMat.material);
	box.position.x = 0;
	box.position.y = 0;
	s.scene.add(box);

	// Throw down some UI
	var ui = (0, _oui.oui)(c.camera.position, { title: 'camera.position' });

	// And our render pipeline
	var render = function render(delta) {
		demoMat.uniforms.time.value += delta * 5;
		box.rotation.y += delta;
		box.rotation.x += delta;

		testPlane.rotation.x -= delta;
		testPlane.rotation.y -= delta;
	};

	return _extends({
		// ?
		ui: ui,
		// objects
		c: c, s: s
	}, util.pipeline([c, s, demoMat, { render: render }, ui]));
};

/***/ }),

/***/ "QRK5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GroupUi = exports.GROUP_CHILD_CLASS = exports.GROUP_CHILDREN_CLASS = exports.GROUP_CLASS = undefined;

var _group = __webpack_require__("xWgD");

var _group2 = _interopRequireDefault(_group);

var _util = __webpack_require__("xArE");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GROUP_CLASS = exports.GROUP_CLASS = 'oui-group';
var GROUP_CHILDREN_CLASS = exports.GROUP_CHILDREN_CLASS = 'oui-group--children';
var GROUP_CHILD_CLASS = exports.GROUP_CHILD_CLASS = 'oui-group--child';

// Thin wrapper around a ul of li items

var GroupUi = exports.GroupUi = function GroupUi(dom) {
	var _this = this;

	var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'New Group';

	_classCallCheck(this, GroupUi);

	var pugParams = {
		title: title
	};

	// Build the DOM element
	this.elt = (0, _util.element)({
		tag: 'div',
		html: (0, _group2.default)(pugParams),
		dom: dom,
		classes: [GROUP_CLASS]
	});

	// Wrap children elements in group items
	this.children = children.map(function (child) {
		var groupChild = (0, _util.element)({
			tag: 'li',
			classes: [GROUP_CHILD_CLASS]
		});

		groupChild.appendChild(child);

		return groupChild;
	});

	// Append them to my container
	this.childrenElt = this.elt.querySelector('.' + GROUP_CHILDREN_CLASS);
	children.forEach(function (child) {
		_this.childrenElt.appendChild(child);
	});
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
exports.push([module.i, ".oui-root {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 250px;\n  color: darkcyan; }\n\n.oui-group {\n  background: #202020; }\n\n.oui-group--children {\n  margin: 0;\n  padding: 1rem; }\n\n.oui-group--title {\n  text-align: center; }\n\n.hidden {\n  display: none; }\n\nh1, h2, h3, h4 {\n  margin: 0;\n  padding: 0; }\n\nbody {\n  padding: 0;\n  margin: 0;\n  overflow: hidden; }\n\n#container {\n  position: absolute;\n  padding: 0;\n  margin: 0;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n", ""]);

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
exports.unit = exports.pipeline = exports.defaultScene = exports.defaultCamera = exports.keyState = undefined;

var _three = __webpack_require__("dKqR");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Keyboard state -- key name -> true if down, false if up
var keyState = exports.keyState = {};
window.addEventListener('keydown', function (evt) {
	keyState[evt.key.toLowerCase()] = true;
}, { passive: true });
window.addEventListener('keyup', function (evt) {
	keyState[evt.key.toLowerCase()] = false;
}, { passive: true });

// Sets up a camera
var defaultCamera = exports.defaultCamera = function defaultCamera(container) {
	var camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 1, 3000);

	var resize = function resize() {
		camera.aspect = container.clientWidth / container.clientHeight;
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
		return renderer.setSize(container.clientWidth, container.clientHeight);
	};

	return { renderer: renderer, scene: scene, resize: resize, render: render };
};

// A render and resize pipeline helper
var pipeline = exports.pipeline = function pipeline(objects) {
	var renderable = objects.filter(function (x) {
		return x.render;
	});
	var render = function render() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return renderable.forEach(function (obj, i) {
			return obj.render.apply(obj, args.concat([objects, i]));
		});
	};

	var resizeable = objects.filter(function (x) {
		return x.resize;
	});
	var resize = function resize() {
		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return resizeable.forEach(function (obj, i) {
			return obj.resize.apply(obj, args.concat([objects, i]));
		});
	};

	return { render: render, resize: resize };
};

/**
 * Constants for the basis unit vectors of 3 space, named
 * @type {Object.<String, Vector3>}
 */
var unit = exports.unit = {
	up: new THREE.Vector3(0, 1, 0),
	down: new THREE.Vector3(0, -1, 0),
	left: new THREE.Vector3(-1, 0, 0),
	right: new THREE.Vector3(1, 0, 0),
	forward: new THREE.Vector3(0, 0, -1),
	back: new THREE.Vector3(0, 0, 1)
};

/***/ }),

/***/ "jVsw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wireframe = exports.demoMaterial = undefined;

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

// A wireframe of some color
var wireframe = exports.wireframe = function wireframe(color) {
	return new _three.MeshBasicMaterial({
		color: color,
		wireframe: true
	});
};

/***/ }),

/***/ "kioU":
/***/ (function(module, exports) {

module.exports = "uniform float time;\nuniform vec2 resolution;\nvarying vec2 vUv;\nvoid main( void ) {\n\tvec2 position = -1.0 + 2.0 * vUv;\n\tfloat red = abs( sin( position.x * position.y + time / 5.0 ) );\n\tfloat green = abs( sin( position.x * position.y + time / 4.0 ) );\n\tfloat blue = abs( sin( position.x * position.y + time / 3.0 ) );\n\tgl_FragColor = vec4( red, green, blue, 1.0 );\n}\n\n"

/***/ }),

/***/ "mzyf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.orbitControls = undefined;

var _three = __webpack_require__("dKqR");

var _util = __webpack_require__("jHzk");

// Some controls -- takes target then object mapping control action to keys
var cacheQuat = new _three.Quaternion();
var orbitControls = exports.orbitControls = function orbitControls(target) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$forward = _ref.forward,
	    forward = _ref$forward === undefined ? 'w' : _ref$forward,
	    _ref$backward = _ref.backward,
	    backward = _ref$backward === undefined ? 's' : _ref$backward,
	    _ref$up = _ref.up,
	    up = _ref$up === undefined ? ' ' : _ref$up,
	    _ref$down = _ref.down,
	    down = _ref$down === undefined ? 'c' : _ref$down,
	    _ref$left = _ref.left,
	    left = _ref$left === undefined ? 'a' : _ref$left,
	    _ref$right = _ref.right,
	    right = _ref$right === undefined ? 'd' : _ref$right,
	    _ref$rollCW = _ref.rollCW,
	    rollCW = _ref$rollCW === undefined ? 'e' : _ref$rollCW,
	    _ref$rollCCW = _ref.rollCCW,
	    rollCCW = _ref$rollCCW === undefined ? 'q' : _ref$rollCCW,
	    _ref$turnLeft = _ref.turnLeft,
	    turnLeft = _ref$turnLeft === undefined ? 'arrowleft' : _ref$turnLeft,
	    _ref$turnRight = _ref.turnRight,
	    turnRight = _ref$turnRight === undefined ? 'arrowright' : _ref$turnRight,
	    _ref$turnUp = _ref.turnUp,
	    turnUp = _ref$turnUp === undefined ? 'arrowup' : _ref$turnUp,
	    _ref$turnDown = _ref.turnDown,
	    turnDown = _ref$turnDown === undefined ? 'arrowdown' : _ref$turnDown,
	    _ref$turn = _ref.turn,
	    turn = _ref$turn === undefined ? 0.025 : _ref$turn,
	    _ref$run = _ref.run,
	    run = _ref$run === undefined ? 0.05 : _ref$run;

	return function () {
		// returns an update function
		var updateMatrix = false;

		// Move
		if (_util.keyState[up]) {
			target.translateOnAxis(_util.unit.up, run);
		}

		if (_util.keyState[down]) {
			target.translateOnAxis(_util.unit.down, run);
		}

		if (_util.keyState[forward]) {
			target.translateOnAxis(_util.unit.forward, run);
		}

		if (_util.keyState[backward]) {
			target.translateOnAxis(_util.unit.back, run);
		}

		if (_util.keyState[left]) {
			target.translateOnAxis(_util.unit.left, run);
		}

		if (_util.keyState[right]) {
			target.translateOnAxis(_util.unit.right, run);
		}

		// Turn
		if (_util.keyState[turnLeft]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.up, turn));
			updateMatrix = true;
		}

		if (_util.keyState[turnRight]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.down, turn));
			updateMatrix = true;
		}

		if (_util.keyState[turnUp]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.right, turn));
			updateMatrix = true;
		}

		if (_util.keyState[turnDown]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.left, turn));
			updateMatrix = true;
		}

		// Roll
		if (_util.keyState[rollCW]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.forward, turn));
			updateMatrix = true;
		}
		if (_util.keyState[rollCCW]) {
			target.quaternion.multiply(cacheQuat.setFromAxisAngle(_util.unit.back, turn));
			updateMatrix = true;
		}

		if (updateMatrix && target.updateProjectionMatrix) {
			target.updateProjectionMatrix();
		}
	};
};

/***/ }),

/***/ "vHUV":
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__("mWEc");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fnumber.pug":"label= title\ninput(type=\"number\").oui-prop--input\n"};
;var locals_for_with = (locals || {});(function (title) {;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fnumber.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fnumber.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fnumber.pug";
pug_html = pug_html + "\u003Cinput class=\"oui-prop--input\" type=\"number\"\u003E";}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;

/***/ }),

/***/ "xArE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.blackWhiteFilter = exports.argToSet = exports.element = exports.setProp = exports.OUI_ROOT_CLASS = undefined;

var _lodash = __webpack_require__("B1iE");

var _lodash2 = _interopRequireDefault(_lodash);

var _fp = __webpack_require__("4lyv");

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var OUI_ROOT_CLASS = exports.OUI_ROOT_CLASS = 'oui-root';

var setProp = exports.setProp = _lodash2.default.set;

/**
 * Helper for a dom element to do stuff with
 */
var element = exports.element = function element() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$tag = _ref.tag,
	    tag = _ref$tag === undefined ? 'div' : _ref$tag,
	    html = _ref.html,
	    dom = _ref.dom,
	    _ref$classes = _ref.classes,
	    classes = _ref$classes === undefined ? [] : _ref$classes;

	var elt = document.createElement(tag);
	if (html) {
		elt.innerHTML = html;
	}
	if (dom) {
		dom.appendChild(elt);
	}
	if (classes && classes.length) {
		var _elt$classList;

		(_elt$classList = elt.classList).add.apply(_elt$classList, _toConsumableArray(classes));
	}
	return elt;
};

/**
 * Helper to transform different arg types to a Set
 * @template T
 * @param {T|Array<T>} arg
 * @returns {?Set<T>} 
 */
var argToSet = exports.argToSet = function argToSet(arg) {
	if (_fp2.default.isNil(arg)) {
		return undefined;
	}

	if (_fp2.default.isArray(arg)) {
		return new Set(arg);
	}

	return new Set([arg]);
};

/**
 * Helper to run blacklist whitelist filter logic.
 * 
 * False if in the blacklist
 * 
 * If there is a whitelist, true if in whitelist falst otherwise
 * 
 * True if no filter sets
 * 
 * @template T
 * @param {T} item 
 * @param {Set<T>} blacklist 
 * @param {Set<T>} whitelist 
 * @returns {Boolean}
 */
var blackWhiteFilter = exports.blackWhiteFilter = function blackWhiteFilter(item, blacklist, whitelist) {
	if (blacklist && blacklist.has(item)) {
		return false;
	}

	if (whitelist) {
		return whitelist.has(item);
	}

	return true;
};

/***/ }),

/***/ "xWgD":
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__("mWEc");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fgroup.pug":"h3.oui-group--title= title\nul.oui-group--children\n"};
;var locals_for_with = (locals || {});(function (title) {;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fgroup.pug";
pug_html = pug_html + "\u003Ch3 class=\"oui-group--title\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fgroup.pug";
pug_html = pug_html + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002Fhome\u002Fdante\u002Frepos\u002Fddd\u002Fsrc\u002Foui\u002Fgroup.pug";
pug_html = pug_html + "\u003Cul class=\"oui-group--children\"\u003E\u003C\u002Ful\u003E";}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;};
module.exports = template;

/***/ })

},[0]);
//# sourceMappingURL=app.bundle.js.map