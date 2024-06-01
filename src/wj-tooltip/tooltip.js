import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Tooltip extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-tooltip`;
	}
	static get className(){
		return "Tooltip";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    static get observedAttributes() {
        return ["active", "content"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let popup = document.createElement("wj-popup");
        popup.setAttribute("placement", this.placement || "top");
        popup.setAttribute("offset", this.offset || "0");

        let slot = document.createElement("slot");
        slot.setAttribute("slot", "anchor");

        let arrow = document.createElement("div");
        arrow.classList.add("arrow");
        arrow.setAttribute("slot", "arrow");

        let native = document.createElement("div");
        native.classList.add("native-tooltip");
        native.innerHTML = this.content;

        popup.appendChild(slot);
        popup.appendChild(arrow);
        popup.appendChild(native);

        this.mySlot = slot;
        this.popup = popup;

        fragment.appendChild(popup);

        return fragment;
    }

    afterDraw() {
        let anchorEl = this.mySlot.assignedElements()[0];
        if(!anchorEl)
            return;

        event.addListener(anchorEl, "mouseenter", null, this.onShow);
        event.addListener(anchorEl, "mouseleave", null, this.onHide);
    }

    onShow = () => {
        this.popup.show();
    }

    onHide = () => {
        this.popup.hide();
    }
	unregister(){}
}

customElements.get(Tooltip.is) || window.customElements.define(Tooltip.is, Tooltip);