import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class TabPanel extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-tab-panel`;
	}
	static get className(){
		return "TabPanel";
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
	unregister(){}
}

customElements.get(TabPanel.is) || window.customElements.define(TabPanel.is, TabPanel);