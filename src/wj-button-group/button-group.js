import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class ButtonGroup extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-button-group`;
	}
	static get className(){
		return "ButtonGroup";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let element = document.createElement("div");
        element.classList.add("native-button-group");
        element.setAttribute("part", "native");

        this.slotElement = document.createElement("slot");

        element.appendChild(this.slotElement);

        fragment.appendChild(element);

        return fragment;
    }

    afterDraw(context, store, params) {
        const slottedElements = [...this.slotElement.assignedElements({ flatten: true })];

        slottedElements.forEach(el => {
            let index = slottedElements.indexOf(el);
            let button = this.findButton(el);
            if (button) {
                button.classList.add('wj-button-group-button');
                button.classList.toggle('wj-button-group-first', index === 0);
                button.classList.toggle('wj-button-group-inner', index > 0 && index < slottedElements.length - 1);
                button.classList.toggle('wj-button-group-last', index === slottedElements.length - 1);
            }
        });
    }

    findButton(el) {
        const selector = 'wj-button';

        return el.closest(selector) ?? el.querySelector(selector);
    }
}

customElements.get(ButtonGroup.is) || window.customElements.define(ButtonGroup.is, ButtonGroup);