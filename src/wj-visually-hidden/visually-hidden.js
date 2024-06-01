import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class VisuallyHidden extends WJElement {
    constructor() {
        super();
    }

   static get is() {
		return `${elementPrefix}-visually-hidden`;
	}
	static get className(){
		return "VisuallyHidden";
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

        let slot = document.createElement("slot");

        fragment.appendChild(slot);

        return fragment;
    }
	unregister(){}
}

customElements.get(VisuallyHidden.is) || window.customElements.define(VisuallyHidden.is, VisuallyHidden);