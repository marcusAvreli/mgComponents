import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class TabGroup extends WJElement {
    constructor() {
        super();
    }

   static get is() {
		return `${elementPrefix}-tab-group`;
	}
	static get className(){
		return "TabGroup";
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

        let native = document.createElement("div");
        native.classList.add("native-tab-group");

        let header = document.createElement("header");
        header.classList.add("scroll-snap-x");

        let nav = document.createElement("nav");

        let section = document.createElement("section");

        let slot = document.createElement("slot");

        let slotNav = document.createElement("slot");
        slotNav.setAttribute("name", "nav");

        header.appendChild(nav);
        nav.appendChild(slotNav);
        section.appendChild(slot);

        native.appendChild(header);
        native.appendChild(section);

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw() {
        let activeTab = this.getActiveTab();
        let activeTabName = (activeTab) ? activeTab[0].name : this.getTabAll()[0].panel;

        this.setActiveTab(activeTabName);

        this.addEventListener("wj:tab-change", (e) => {
            if(e.detail.context.hasAttribute("disabled"))
                return false;

            this.setActiveTab(e.detail.context.panel);
        });
    }

    removeActiveTab() {
        this.getPanelAll().forEach((el) => {
            el.removeAttribute("active");
        });

        this.getTabAll().forEach((el) => {
            el.removeAttribute("active");
        });
    }

    setActiveTab(tab) {
        this.removeActiveTab();
        this.querySelector(`[panel="${tab}"]`).setAttribute("active", "");
        this.querySelector(`[name="${tab}"]`).setAttribute("active", "");
    }

    getActiveTab() {
        let activeTabs = Array.from(this.context.querySelectorAll('[active]'));
        return activeTabs.length > 0 ? activeTabs[0] : null;
    }

    getTabAll() {
        return this.context.querySelector('[name="nav"]').assignedElements();
    }

    getPanelAll() {
        return Array.from(this.querySelectorAll("wj-tab-panel"));
    }
	unregister(){}
}

customElements.get(TabGroup.is) || window.customElements.define(TabGroup.is, TabGroup);