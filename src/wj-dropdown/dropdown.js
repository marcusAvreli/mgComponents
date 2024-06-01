import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
export class Dropdown extends WJElement {
    constructor() {
        super();
    }

    set trigger(value) {
        this.setAttribute("trigger", value);
    }

    get trigger() {
        return this.getAttribute("trigger") || "click";
    }

    static get is() {
		return `${elementPrefix}-dropdown`;
	}
	static get className(){
		return "Dropdown";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return ["active"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        this.classList.add("wj-placement", "wj-" + this.placement || "wj-start");

        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-dropdown");

        let popup = document.createElement("wj-popup");
        popup.setAttribute("placement", this.placement);
        popup.setAttribute("offset", this.offset);
        popup.setAttribute("manual", "");
        popup.innerHTML = `<slot name="trigger" slot="anchor"></slot>
            <slot></slot>`;

        if(this.trigger === "click")
            popup.setAttribute("manual", "");

        native.appendChild(popup);

        fragment.appendChild(native);

        return fragment;
    }
	unregister(){}
}

customElements.get(Dropdown.is) || window.customElements.define(Dropdown.is, Dropdown);