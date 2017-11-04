import groupUi from './group.pug';
import { element } from './util';

export const GROUP_CLASS = 'oui-group';
export const GROUP_CHILDREN_CLASS = 'oui-group--children';
export const GROUP_CHILD_CLASS = 'oui-group--child';

// Thin wrapper around a ul of li items
export class GroupUi {
	
	constructor(dom, children = [], title = 'New Group') {
		const pugParams = {
			title,
		};

		// Build the DOM element
		this.elt = element({
			tag: 'div',
			html: groupUi(pugParams),
			dom,
			classes: [GROUP_CLASS],
		});

		// Wrap children elements in group items
		this.children = children.map(child => {
			const groupChild = element({
				tag: 'li',
				classes: [GROUP_CHILD_CLASS],
			});
			
			groupChild.appendChild(child);
			
			return groupChild;
		});
		
		// Append them to my container
		this.childrenElt = this.elt.querySelector(`.${GROUP_CHILDREN_CLASS}`);
		children.forEach(child => {
			this.childrenElt.appendChild(child);
		});
	}
}
