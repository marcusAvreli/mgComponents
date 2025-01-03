import { default as WJElement,WjElementUtils, event } from "../wj-element/wj-element.js";
import { bool } from "../utils/wj-utils.js";
import { elementPrefix } from '../shared/index.js';
import { Localizer } from "../utils/localize.js";
/**
 * @injectHTML
 */
export class Button extends WJElement {
    constructor() {
        super();
		this.localizer = new Localizer(this);
    }
	static get is() {
		return `${elementPrefix}-button`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
    set active(value) {
        this.setAttribute("active", "");
    }

    get active() {
        return this.hasAttribute("active");
    }

    set disabled(value) {
        this.setAttribute("disabled", "");
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set fill(value) {
        this.setAttribute("fill", value);
    }

    get fill() {
        return this.getAttribute("fill") || "solid";
    }

    set outline(value) {
        this.setAttribute("outline", "");
    }

    get outline() {
        return this.hasAttribute("outline");
    }

    set round(value) {
        this.setAttribute("round", "");
    }

    get round() {
        return this.hasAttribute("round");
    }

    set stopPropagation(value) {
        this.setAttribute("stop-propagation", bool(value));
    }

    get stopPropagation() {
        return bool(this.getAttribute("stop-propagation"));
    }

    static get className(){
		return "Button";
	}

    

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

       

   draw(context, store, params) {
	   if(this.hasAttribute("lang")){
			this.localizer.setLanguage();
		}
		console.log("button_content:"+this.textContent);
		const labelValue = this.localizer.translate(this.textContent);
		console.log("button_content:"+labelValue);
		this.setDisplayLabel(labelValue);
        let fragment = document.createDocumentFragment();

        if(this.disabled)
            this.classList.add("wj-button-disabled");

        if(this.variant)
            this.classList.add("wj-button-" + this.variant);

        if(this.hasAttribute("round"))
            this.classList.add("wj-button-round")

        if(this.hasAttribute("circle"))
            this.classList.add("wj-button-circle")

        if(this.outline)
            this.classList.add("wj-outline");

        if(this.fill)
            this.classList.add("wj-button-" + this.fill);

        if(this.size)
            this.classList.add("wj-button-" + this.size);

        if(this.hasAttribute("color"))
            this.classList.add("wj-color-" + this.color, "wj-color");
        else
            this.classList.add("wj-color-default", "wj-color");

        if(this.hasAttribute("caret") || this.hasAttribute("only-caret")) {
            let i = document.createElement("wj-icon");
            i.style.setProperty("--wj-icon-size", "14px");
            i.setAttribute("slot", "caret");
            i.setAttribute("name", "chevron-down");

            this.appendChild(i);
        }

        if(this.active) {
            this.classList.add("wj-active");
            let i = document.createElement("wj-icon");
            i.setAttribute("name", "check");

            this.appendChild(i);
        }

        if(this.disabled)
            this.classList.add("wj-disabled");

        let element = document.createElement(this.hasAttribute('href') ? 'a': 'button');
        element.classList.add("button-native");
		if(this.hasAttribute("zeropadtop")){
			element.classList.add("standrad");
		}
        element.setAttribute("part", "native");

        let  span = document.createElement("span");
        span.classList.add("button-inner");

        let slot = document.createElement("slot");
        slot.setAttribute("name", "icon-only");
        span.appendChild(slot);

        slot = document.createElement("slot");
        slot.setAttribute("name", "start");
        span.appendChild(slot);

       slot = document.createElement("slot");
        span.appendChild(slot);

        slot = document.createElement("slot");
        slot.setAttribute("name", "end");
        span.appendChild(slot);

        slot = document.createElement("slot");
        slot.setAttribute("name", "caret");
        span.appendChild(slot);

        this.hasToggle = WjElementUtils.hasSlot(this, "toggle");

        if(this.hasToggle) {
            this.slotToggle = document.createElement("slot");
            this.slotToggle.setAttribute("name", "toggle");

            span.appendChild(this.slotToggle);
        }

        element.appendChild(span);
        fragment.appendChild(element);

        return fragment;
    }
	setDisplayLabel(lblValue){
		this.textContent = lblValue;
	}
    afterDraw() {
		console.log("button_content 2:"+this.textContent);
        // nastavenie toggle podla atributu, ak nie je nastaveny, tak sa zobrazi vzdy prvy element
        if(this.hasToggle) {
            if (this.toggle === "off") {
                this.slotToggle.assignedNodes()[1].classList.add("show");
            } else {
                this.slotToggle.assignedNodes()[0].classList.add("show");
            }
        }

        event.addListener(this, "click", "wj:button-click", null, { stopPropagation: this.stopPropagation });
        event.addListener(this, "click", null, this.eventDialogOpen);

        if(this.hasToggle)
            event.addListener(this, "click", "wj-button:toggle", this.toggleStates, { stopPropagation: this.stopPropagation });
    }

    beforeDisconnect() {
        this.removeEventListener("click", this.eventDialogOpen);
    }

    eventDialogOpen = (e) => {
        document.dispatchEvent(
            new CustomEvent(this.dialog, {
                bubbles: true
            }
        ));
    }

    toggleStates = () => {
        const nodes = this.slotToggle.assignedNodes().filter(node => node.nodeType === Node.ELEMENT_NODE);

        nodes.forEach(node => {
            if (node.classList.contains('show')) {
                node.classList.remove('show');
            } else {
                node.classList.add('show');
            }
        });
    }
		unregister(){}
	afterDisconnect (){}
}


customElements.get(Button.is) || window.customElements.define(Button.is, Button);