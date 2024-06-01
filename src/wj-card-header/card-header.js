import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class CardHeader extends WJElement {
    constructor() {
        super();
    }

	static get is() {
		return `${elementPrefix}-card-header`;
	}
	static get className(){
		return "CardHeader";
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

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");

        if(this.hasAttribute("separator"))
            this.classList.add("wj-separator");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(CardHeader.is) || window.customElements.define(CardHeader.is, CardHeader);