import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Toggle extends WJElement {
    constructor() {
        super();
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    get checked() {
        return this.hasAttribute("checked");
    }

     static get is() {
		return `${elementPrefix}-toggle`;
	}
	static get className(){
		return "Toggle";
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

        let element = document.createElement("div")
        element.classList.add("native-toggle");

        let input = document.createElement("input");
        input.setAttribute("part", "input")
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", this.name);
        input.setAttribute("id", "input");

        let label = document.createElement("label");
        label.setAttribute("for", "input");

        let labelWrapper = document.createElement("div");
        labelWrapper.setAttribute("part", "toggle");
        labelWrapper.classList.add("label-wrapper");

        let text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = "<slot></slot>";

        if(this.color)
            this.classList.add("wj-color-" + this.color, "wj-color");

        if(this.checked)
            input.checked = this.checked;

        if(this.disabled)
            input.disabled = this.disabled;

        element.appendChild(input);
        element.appendChild(label);
        label.appendChild(labelWrapper);
        label.appendChild(text);

        fragment.appendChild(element);

        return fragment;
    }
	unregister(){}
}

customElements.get(Toggle.is) || window.customElements.define(Toggle.is, Toggle);