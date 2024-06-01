import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Tab extends WJElement {
    constructor() {
        super();

        this.last = false;
    }

    static get is() {
		return `${elementPrefix}-tab`;
	}
	static get className(){
		return "Tab";
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

        let a = document.createElement("a");
        a.setAttribute("href", "#" + this.panel);
        a.innerHTML = this.innerHTML;

        fragment.appendChild(a);

        return fragment;
    }

    afterDraw() {
        event.addListener(this, "click", "wj:tab-change");
    }
	unregister(){}
}

customElements.get(Tab.is) || window.customElements.define(Tab.is, Tab);