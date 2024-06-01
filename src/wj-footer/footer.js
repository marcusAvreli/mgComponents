import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Footer extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-footer`;
	}
	static get className(){
		return "Footer";
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

customElements.get(Footer.is) || window.customElements.define(Footer.is, Footer);