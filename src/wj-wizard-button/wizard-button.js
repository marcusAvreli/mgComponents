import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';


/**
 * @injectHTML
 */
export class WizardButton extends WJElement {
    constructor() {
        super();
    }
  set active(value) {
        this.setAttribute("active", "");
    }

    get active() {
        return this.hasAttribute("active");
    }

    set disabled(value) {
        this.setAttribute("disabled", "");
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set fill(value) {
        this.setAttribute("fill", value);
    }

    get fill() {
        return this.getAttribute("fill") || "solid";
    }

    set outline(value) {
        this.setAttribute("outline", "");
    }

    get outline() {
        return this.hasAttribute("outline");
    }

    set round(value) {
        this.setAttribute("round", "");
    }

    get round() {
        return this.hasAttribute("round");
    }

    set stopPropagation(value) {
        this.setAttribute("stop-propagation", bool(value));
    }

    get stopPropagation() {
        return bool(this.getAttribute("stop-propagation"));
    }
   static get className(){
		return "WizardButton";
	}

	static get is() {
		return `${elementPrefix}-wizard-button`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }

    static get observedAttributes() {
        return ["name"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
		console.log("WizardButton","draw");
        let fragment = document.createDocumentFragment();
   this.classList.add("wj-color-default", "wj-color");
		if(this.fill)
            this.classList.add("wj-button-" + this.fill);

        if(this.variant)
            this.classList.add("wj-button-" + this.variant);
		this.element = document.createElement('button');
        this.element.classList.add("button-native");
        this.element.setAttribute("part", "native");
		let  span = document.createElement("span");
        span.classList.add("button-inner");
		let slot = document.createElement("slot");
        span.appendChild(slot);
		this.element.appendChild(span);
        fragment.appendChild(this.element);

        return fragment;
    }

    afterDraw() {
      
    }
	unregister(){
	
	}
}

customElements.get(WizardButton.is) || window.customElements.define(WizardButton.is, WizardButton);