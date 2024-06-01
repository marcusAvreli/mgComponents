import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Card extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-card`;
	}
	static get className(){
		return "Card";
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

        if(params.color)
            this.classList.add("wj-color-" + params.color, "wj-color");

        fragment.appendChild(element);

        return fragment;
    }
}

customElements.get(Card.is) || window.customElements.define(Card.is, Card);