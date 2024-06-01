import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class CardControls extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-card-controls`;
	}
	static get className(){
		return "CardControls";
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

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(CardControls.is) || window.customElements.define(CardControls.is, CardControls);