import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Header extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-header`;
	}
	static get className(){
		return "Header";
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


        let element = document.createElement("header");
        element.classList.add("native-header");
        element.setAttribute("part", "native");

        let slot = document.createElement("slot");

        element.appendChild(slot);

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(Header.is) || window.customElements.define(Header.is, Header);