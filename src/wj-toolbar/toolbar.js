import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { withRouterLinks } from '../wj-router/plugins/slick-router/middlewares/router-links.js';

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Toolbar extends withRouterLinks( WJElement) {
    constructor() {
        super();
    }

      static get is() {
		return `${elementPrefix}-toolbar`;
	}
	static get className(){
		return "Toolbar";
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
        native.classList.add("native-toolbar");

        let start = document.createElement("slot");
        start.setAttribute("name", "start");


        let end = document.createElement("slot");
        end.setAttribute("name", "end");

        native.appendChild(start);
        native.appendChild(end);
        fragment.appendChild(native);

        return fragment;
    }
	unregister(){}
}

customElements.get(Toolbar.is) || window.customElements.define(Toolbar.is, Toolbar);