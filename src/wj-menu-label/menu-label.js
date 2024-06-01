import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class MenuLabel extends WJElement {
    constructor() {
        super();

        this.hasSubmenu =  WjElementUtils.hasSlot(this, "submenu");
    }

   static get is() {
		return `${elementPrefix}-menu-label`;
	}
	static get className(){
		return "MenuLabel";
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

        // SLOT
        let slot = document.createElement("slot");
        slot.setAttribute("part", "base");
        slot.classList.add("native-menu-label");

        fragment.appendChild(slot);

        return fragment;
    }
	unregister(){}
}

customElements.get(MenuLabel.is) || window.customElements.define(MenuLabel.is, MenuLabel);