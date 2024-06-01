import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Radio extends WJElement {
    constructor() {
        super();

        this._checked = false;
    }

    set checked(value) {
        this._checked = value;

        if(value)
            this.setAttribute("checked", "");
        else
            this.removeAttribute("checked");
    }

    get checked() {
        return this._checked;
    }

   static get is() {
		return `${elementPrefix}-radio`;
	}
	static get className(){
		return "Radio";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }


    static get observedAttributes() {
        return ["checked"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.classList.add("native-radio");

        if(this.color)
            native.classList.add(this.color);

        this.input = document.createElement("input");
        this.input.type = "radio";
        this.input.id = "radio";
        this.input.name = this.name + "-radio";
        this.input.checked = this.hasAttribute("checked");
        this.input.disabled = this.hasAttribute("disabled");
        this.input.indeterminate = this.hasAttribute("indeterminate");

        let label = document.createElement("label");
        label.htmlFor = "radio";
        label.innerHTML = "<slot></slot>";

        native.appendChild(this.input);
        native.appendChild(label);

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw() {
        if (!this.hasAttribute("disabled")) {
            event.addListener(this, "click", "wj:radio:change");
            event.addListener(this, "click", "wj:radio:input");
        }
    }

    inputEvent = (e) => {
        this.checked = e.target.checked;
    }

    disconnectedCallback() {
        event.removeElement(this);
    }
	unregister(){}
}

customElements.get(Radio.is) || window.customElements.define(Radio.is, Radio);