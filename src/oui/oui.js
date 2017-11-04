// dat.gui is okay
// I like their components though...


// this is an object ui I guess.



// oui.

// The defaul
export let DEFAULT_DOM = document.body;


// Some templates -- they all take { state: ... } to do stuff
import groupUi from './group.pug';



/**
 * Helper for a div to do stuff with
 * @param {Element} dom 
 */
export const div(dom = DEFAULT_DOM) => {
	const elt = document.createElement('div');
	dom.appendChild(elt);
	return elt;
};
	

// Make a grouping of items.
export const group({
		title = `New Group ${Date.now()}`,
		container = oui.div(),
	} = {}) => {
	const grp = document.createElement('div');
	console.debug(groupUi);
	container.appendChild(grp);
	return grp;
};

	
	// Add a new oui -- just like gui.add, without the gui()
	add(object, path, parent = oui.group()) {
		console.debug('add', { object, parent });
		
	},
};

// A ui for things.
// Pass parameters as objects.
export const oui = {
};	