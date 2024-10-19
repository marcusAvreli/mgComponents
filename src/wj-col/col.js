import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Col extends WJElement {
    constructor() {
        super();
    }

     static get is() {
		return `${elementPrefix}-col`;
	}
	static get className(){
		return "Col";
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

    beforeDraw(context, store, params) {
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");

        if(this.order)
        this.classList.add("order-" + this.order);

        if(this.size)
            this.classList.add("wj-col-" + this.size);

        if(this.sizeSm)
            this.classList.add("wj-col-sm-" + this.sizeSm);

        if(this.sizeMd)
            this.classList.add("wj-col-md-" + this.sizeMd);

        if(this.offset)
            this.classList.add("wj-offset-" + this.offset);

        if(this.offsetSm)
            this.classList.add("wj-offset-sm-" + this.offsetSm);

        fragment.appendChild(element);

        return fragment;
    }
		unregister(){}
		afterDisconnect (){}
}

customElements.get(Col.is) || window.customElements.define(Col.is, Col);