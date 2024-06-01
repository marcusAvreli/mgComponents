import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Divider extends WJElement {
    constructor() {
        super();
    }

     static get is() {
		return `${elementPrefix}-dialog`;
	}
	static get className(){
		return "Divider";
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

        let native = document.createElement("div");
        let slot = document.createElement("slot");

        native.appendChild(slot);
        fragment.appendChild(native);

        return fragment;
    }
	unregister(){}
}

customElements.get(Divider.is) || window.customElements.define(Divider.is, Divider);