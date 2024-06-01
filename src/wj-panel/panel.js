import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Panel extends WJElement {
    constructor() {
        super();

        this.last = false;
    }

     static get is() {
		return `${elementPrefix}-options`;
	}
	static get className(){
		return "Panel";
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
        let maxItems = +this.maxItems || 0;
        let itemsBeforeCollapse = +this.itemsBeforeCollapse || 1;
        let itemsAfterCollapse = +this.itemsAfterCollapse || 1;

        let breadcrumbs = this.getBreadcrumbs();

        let breadcrumb = breadcrumbs.findLast(e => e);
        breadcrumb.setAttribute("last", true);

        const shouldCollapse = maxItems !== undefined && breadcrumbs.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse <= maxItems;

        if (shouldCollapse) {
            breadcrumbs.forEach((breadcrumb, index) => {
                if (index === itemsBeforeCollapse) {
                    breadcrumb.setAttribute("show-collapsed-indicator", true);
                }

                if (index >= itemsBeforeCollapse && index < breadcrumbs.length - itemsAfterCollapse) {
                    breadcrumb.setAttribute("collapsed", true);
                }
            });
        }
    }

    getBreadcrumbs() {
        return Array.from(this.querySelectorAll('wj-breadcrumb'));
    }
	unregister(){}
}

customElements.get("wj-panel") || window.customElements.define("wj-panel", Panel);