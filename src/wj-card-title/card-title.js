import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class CardTitle extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-card-title`;
	}
	static get className(){
		return "CardTitle";
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

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
		unregister(){}
}

customElements.get(CardTitle.is) || window.customElements.define(CardTitle.is, CardTitle);