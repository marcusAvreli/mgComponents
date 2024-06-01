import { default as WJElement, event } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class CarouselItem extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-carousel-item`;
	}
	static get className(){
		return "CarouselItem";
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

        let native = document.createElement("div");
        native.classList.add("native-carousel-item");
        native.setAttribute("part", "native");

        let slot = document.createElement("slot");

        native.appendChild(slot);

        fragment.appendChild(native);

        return fragment;
    }
	
		unregister(){}
}

customElements.get(CarouselItem.is) || window.customElements.define(CarouselItem.is, CarouselItem);