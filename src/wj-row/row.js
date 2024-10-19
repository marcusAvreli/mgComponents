import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Row extends WJElement {
    constructor() {
        super();
    }

       static get is() {
		return `${elementPrefix}-row`;
	}
	static get className(){
		return "Row";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    beforeDraw(context, store, params) {
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        if(this.hasAttribute("wrap"))
            this.classList.add("wj-wrap");

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
	unregister(){}
	afterDisconnect (){}
}

customElements.get(Row.is) || window.customElements.define(Row.is, Row);