import fp from 'lodash/fp';
import { element, setProp } from './util';
import numberUi from './number.pug';

export const PROP_CLASS = 'oui-prop';
export const PROP_NUMBER_CLASS = 'oui-prop--number';
export const PROP_INPUT_CLASS = 'oui-prop--input';

// Basic property ui component
// @todo: this is numeric only right now -- might abstract if I care
export class PropUi {
	constructor(object, path, dom) {
		this.object = object;
		this.path = path;

		// Build our html
		let html;
		const classes = [PROP_CLASS];
		const reflectVal = fp.get(path, object);
		if (fp.isNumber(reflectVal)) {
			html = numberUi({
				title: path.join('.'),
			});
			classes.push(PROP_NUMBER_CLASS);
		}
		
		// Build the DOM element
		this.elt = element({
			dom,
			html,
			classes,
		});
		
		// Hook inputs
		this.input = this.elt.querySelector(`.${PROP_INPUT_CLASS}`);
		this.input.addEventListener('input', (evt) => this.commit(evt));

		// Update initial state
		this.render();
	}

	commit(evt) {
		const val = evt.target.value;
		if (!isNaN(val)) {
			setProp(this.object, this.path, val);
		}
	}

	render() {
		const val = fp.get(this.path, this.object);
		if (!isNaN(val)) {
			this.input.value = val;
		}
	}
}
