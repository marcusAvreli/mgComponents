import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Chip extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-chip`;
	}
	static get className(){
		return "Chip";
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

        let native = document.createElement("div");
        native.classList.add("native-chip");

        let slot = document.createElement("slot");

        let remove = document.createElement("wj-button");
        remove.setAttribute("part", "remove");
        remove.setAttribute("fill", "link");
        remove.innerHTML = `<wj-icon name="x"></wj-icon>`;

        let active = document.createElement("wj-icon");
        active.setAttribute("name", "check");
        active.classList.add("check");

        if(this.color)
            this.classList.add("wj-color-" + this.color, "wj-color");

        if(this.disabled)
            this.classList.add("wj-disabled");

        if(this.outline)
            this.classList.add("wj-outline");

        native.appendChild(slot);
        native.appendChild(active);

        if(this.hasAttribute("removable"))
            native.appendChild(remove);

        fragment.appendChild(native);

        this.remove = remove;
        return fragment;
    }

    afterDraw() {
        event.addListener(this.remove, "click", "wj:chip-remove", null, { stopPropagation: true });
    }
		unregister(){}
}

customElements.get(Chip.is) || window.customElements.define(Chip.is, Chip);