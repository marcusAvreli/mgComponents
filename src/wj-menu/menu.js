import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Menu extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-menu`;
	}
	static get className(){
		return "Menu";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }


    static get observedAttributes() {
        return ["active", "collapse"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        this.classList.remove("wj-menu-collapse");

        if(this.hasAttribute("collapse"))
            this.classList.add("wj-menu-collapse");

        let native = document.createElement("div");
        native.classList.add("native-menu");

        let slot = document.createElement("slot");
		
        native.appendChild(slot);
        fragment.appendChild(native);

        return fragment;
    }
	unregister(){}
	afterDisconnect(){}
}

customElements.get(Menu.is) || window.customElements.define(Menu.is, Menu);