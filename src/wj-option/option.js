import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Option extends WJElement {
    constructor() {
        super();
    }

    set selected(value) {
        return value ? this.setAttribute("selected", "") : this.removeAttribute("selected");
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    set text(value) {
        this.innerText = value;
    }

       static get is() {
		return `${elementPrefix}-option`;
	}
	static get className(){
		return "Option";
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

        let element = document.createElement("div");
        element.classList.add("native-option");
        element.setAttribute("part", "native");

        let icon = document.createElement("wj-icon");
        icon.setAttribute("name", "check");

        let start = document.createElement("slot");
        start.setAttribute("name", "start");

        let slot = document.createElement("slot");

        let end = document.createElement("slot");
        end.setAttribute("name", "end");

        element.appendChild(icon);
        element.appendChild(start);
        element.appendChild(slot);
        element.appendChild(end);

        fragment.appendChild(element);

        return fragment;
    }

    afterDraw() {
        event.addListener(this, "click", "wj:option-change");
    }
	unregister(){}
}

customElements.get(Option.is) || window.customElements.define(Option.is, Option);