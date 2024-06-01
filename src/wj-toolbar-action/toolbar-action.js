import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class ToolbarAction extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-toolbar-action`;
	}
	static get className(){
		return "ToolbarAction";
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

        let maxItems = +this.maxItems || 0;
        let actions = this.getActions();

        let slot = document.createElement("slot");

        let element = document.createElement("div");
        element.classList.add("native-toolbar-action");

        const shouldCollapse = maxItems !== 0 && actions.length > maxItems;
        if (shouldCollapse) {
            element = document.createElement("wj-dropdown");
        }

        element.appendChild(slot);

        fragment.appendChild(element);

        return fragment;
    }

    getActions() {
        return Array.from(this.querySelectorAll('wj-button'));
    }
	unregister(){}
}

customElements.get(ToolbarAction.is) || window.customElements.define(ToolbarAction.is, ToolbarAction);