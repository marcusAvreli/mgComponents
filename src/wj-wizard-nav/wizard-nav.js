import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import {Button} from '../wj-button/button.js';
/**
 * @injectHTML
 */
export class WizardNav extends WJElement {
	constructor() {
		super();
		
	}
	 static get is() {
		return `${elementPrefix}-wizard-nav`;
	}
	static get className(){
		return "WizardNav";
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
		
		let container = document.createElement("div");
		container.classList.add("container2");
		
		let circle = document.createElement("div");
		//circle.classList.add("circle");
		
		container.appendChild(circle);
		circle.textContent=this.textContent;
		this.container=container;
		
		
		//this.addPage();
        fragment.appendChild(circle);
		
		
		
		
		return fragment;
	}
	afterDraw() {
		console.log("Wizard_nav","after_draw_start");
		console.log("Wizard_nav","after_draw_finish");
	}
 	_dispatchNext(e){
		console.log("Wizard_nav","next");
	
		e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
		//	const previousButton = this.querySelector('[slot="toggle"]')
		//previousButton.assignedNodes()[1].classList.add("show");
        this.dispatchEvent(new CustomEvent('wj-wizard-next', {
            bubbles: true,
            composed: true,
            detail: {
                tab: this,
                data: this.data,
                nav: this.nav,
            },
        }));
		
	}
	_dispatchPrevious(e){
		
		console.log("Wizard_nav","previous");
		e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();


        this.dispatchEvent(new CustomEvent('wj-wizard-previous', {
            bubbles: true,
            composed: true,
            detail: {
                tab: this,
                data: this.data,
                nav: this.nav,
            },
        }));

	}
	
	hasSlot(el, slotName = null) {
        let selector = slotName ? `[slot="${slotName}"]` : "[slot]";
        return el.querySelectorAll(selector).length > 0 ? true : false;
    }
	
	unregister(){
		console.log("WizardNav","unregister");
		
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
	
}
customElements.get(WizardNav.is) || window.customElements.define(WizardNav.is, WizardNav);