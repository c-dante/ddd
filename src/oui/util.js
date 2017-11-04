import _ from 'lodash';
import fp from 'lodash/fp';

export const OUI_ROOT_CLASS = 'oui-root';

export const setProp = _.set;

/**
 * Helper for a dom element to do stuff with
 */
export const element = ({
	tag = 'div',
	html, // innerHTML to set
	dom,
	classes = [],
} = {}) => {
	const elt = document.createElement(tag);
	if (html) {
		elt.innerHTML = html;
	}
	if (dom) {
		dom.appendChild(elt);
	}
	if (classes && classes.length) {
		elt.classList.add(...classes);
	}
	return elt;
};

/**
 * Helper to transform different arg types to a Set
 * @template T
 * @param {T|Array<T>} arg
 * @returns {?Set<T>} 
 */
export const argToSet = arg => {
	if (fp.isNil(arg)) {
		return undefined;
	}

	if (fp.isArray(arg)) {
		return new Set(arg);
	}

	return new Set([arg]);
}

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
export const blackWhiteFilter = (item, blacklist, whitelist) => {
	if (blacklist && blacklist.has(item)) {
		return false;
	}

	if (whitelist) {
		return whitelist.has(item);
	}

	return true;
};
