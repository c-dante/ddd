// dat.gui is okay
// I like their components though...


// this is an object ui I guess.



// oui.
import * as util from './util';
import { GroupUi } from './group';
import { PropUi } from './prop';

// The default dom to attach
export let DEFAULT_DOM = util.element({
	dom: document.body,
	classes: [util.OUI_ROOT_CLASS],
});

export const oui = (object, {
	include = undefined, /** {String|String[]} - props to include */
	exclude = undefined, /** {String|String[]} - props to exclude */
	dom = DEFAULT_DOM, /** {Element} - dom to attach to */
	title = '', /** {String} - Title for the object to add */
} = {}) => {
	// Filter props
	const blacklist = util.argToSet(exclude);
	const whitelist = util.argToSet(include);
	const props = Object.keys(object).filter(
		key => util.blackWhiteFilter(key, blacklist, whitelist)
	);

	// Build UI from props
	const controllers = props.map(
		prop => new PropUi(object, [prop]),
	);
	const grouping = new GroupUi(dom, controllers.map(x => x.elt), title);

	return {
		grouping,
		controllers,
	};
};

export const update = () => {
	
};
