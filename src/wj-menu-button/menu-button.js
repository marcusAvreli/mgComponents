import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class MenuButton extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-menu-button`;
	}
	static get className(){
		return "MenuButton";
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

    afterDraw() {
        event.addListener(this, "click", null, (e) => {
            document.querySelector(`#${this.contentId}`).classList.toggle("open");
        });
    }
	unregister(){}
}

customElements.get(MenuButton.is) || window.customElements.define(MenuButton.is, MenuButton);