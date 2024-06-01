import WJElement from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./list.scss";

/**
 * @injectHTML
 */
export class List extends WJElement {
    constructor() {
        super();
    }

    static get className(){
		return "List";
	}

	static get is() {
		return `${elementPrefix}-list`;
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

    afterDraw() {
		console.log("finished_draw_list");
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
    }
	afterDisconnect(){
	}
}


customElements.get(List.is) || window.customElements.define(List.is, List);