import { default as WJElement, WjElementUtils, event } from "../wj-element/wj-element.js";



import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Breadcrumb extends WJElement {
    constructor() {
        super();

        this._showSeparator = true;
        this._collapsedVariant = this.parentElement?.collapsedVariant || "BUTTON";
    }

    get showSeparator() {
        return this._showSeparator;
    }

    set showSeparator(value) {
        this._showSeparator = value;
    }

    get collapsedVariant() {
        return this._collapsedVariant.toUpperCase();
    }

    set collapsedVariant(value) {
        this._collapsedVariant = value || this.parentElement.collapsedVariant;
    }

   static get is() {
		return `${elementPrefix}-breadcrumb`;
	}
	static get className(){
		return "Breadcrumb";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    static get observedAttributes() {
        return ["show-collapsed-indicator", "collapsed", "last"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "collapsed") {
            if(WjElementUtils.stringToBoolean(newValue))
                this.classList.add("collapsed");
        } else if (name === "show-collapsed-indicator") {
            if(WjElementUtils.stringToBoolean(newValue))
                this.showCollapsedIndicator = true;
        } else if (name === "last") {
            this.active = WjElementUtils.stringToBoolean(newValue);
            this.showSeparator = !WjElementUtils.stringToBoolean(newValue);
        }
        return  false;
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("a");
        // native.setAttribute("route", this.route);
        native.classList.add("native-breadcrumb");
        if(this.active)
            native.classList.add("active");

        let slot = document.createElement("slot");

        let start = document.createElement("slot");
        start.setAttribute("name", "start");

        let end = document.createElement("slot");
        end.setAttribute("name", "end");

        native.appendChild(start);
        native.appendChild(slot);
        native.appendChild(end);

        fragment.appendChild(native);

        if(this.showCollapsedIndicator) {
            // pridame button za native element
            fragment.appendChild(this.drawCollapsedIndicator());

            // removneme collapsed z host element
            this.classList.remove("collapsed");

            // skryjeme native element
            native.classList.add("hidden");
        }

        if(this.showSeparator) {
            let separator = document.createElement("span");
            separator.classList.add("separator");
            separator.setAttribute("part", "separator");


            if(WjElementUtils.hasSlot(this, "separator")) {
                let slotSeparator = document.createElement("slot");
                slotSeparator.setAttribute("name", "separator");

                separator.appendChild(slotSeparator);
            } else {
                separator.innerHTML = `<wj-icon name=${this.separator || "chevron-right"}></wj-icon>`;
            }

            fragment.appendChild(separator);
        }

        this.native = native;
        return fragment;
    }

    drawCollapsedIndicator(){
        let collapsedIndicator = null;

        if(this.collapsedVariant === "DROPDOWN") {
            collapsedIndicator = this.collapseDropdown();
        } else {
            collapsedIndicator = this.collapseButton();
        }

        return collapsedIndicator;
    }

    collapseDropdown(){
        let dropdown = document.createElement("wj-dropdown");
        dropdown.setAttribute("placement", "bottom");
        dropdown.setAttribute("offset", "10");

        let button = document.createElement("wj-button");
        button.setAttribute("slot", "trigger");
        button.setAttribute("fill", "link");
        button.innerHTML = `<wj-icon name="dots"></wj-icon>`;

        let menu = document.createElement("wj-menu");
        menu.setAttribute("variant", "context");

        dropdown.appendChild(button);
        dropdown.appendChild(menu);

        dropdown.innerHTML = `<wj-button slot="trigger" fill="link">
            <wj-icon name="dots"></wj-icon>
        </wj-button>
        <wj-menu variant="context">
            <wj-menu-item>Test 0</wj-menu-item>
            <wj-menu-item>Test 1</wj-menu-item>
            <wj-menu-item>Test 2</wj-menu-item>
        </wj-menu>`;

        this.parentElement.querySelectorAll("wj-breadcrumb").forEach((el) => {
            // console.log(el);
        });

        return dropdown;
    }

    collapseButton(){
        let button = document.createElement("button");
        button.setAttribute("aria-label", "Show more breadcrumbs");
        button.setAttribute("part", "collapsed-indicator");
        button.innerHTML = `<wj-icon name="dots"></wj-icon>`;

        event.addListener( button,"click", null, (e) => {
            this.native.classList.remove("hidden");
            button.remove();
            this.parentElement.querySelectorAll(Breadcrumb.is).forEach((e) => {
                e.classList.remove("collapsed");
            });
            e.stopPropagation();
        });

        return button;
    }
}

customElements.get(Breadcrumb.is) || window.customElements.define(Breadcrumb.is, Breadcrumb);