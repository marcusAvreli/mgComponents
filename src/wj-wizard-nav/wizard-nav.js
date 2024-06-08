import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import {Button} from '../wj-button/button.js';
/**
 * @injectHTML
 */
export class WizardNav extends WJElement {
	constructor() {
		super();
		console.log("WizardNav","constructor");
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
		console.log("Wizard_nav","draw_start");
		
	
        let fragment = document.createDocumentFragment();
		
		 // Wrapper
        let element = document.createElement("div");
        element.setAttribute("part", "native");
		
		
		
		 let  span = document.createElement("span");
        this.hasToggle = WjElementUtils.hasSlot(this, "toggle");
		console.log("Wizard_nav","has toggle:"+this.hasToggle);
		 if(this.hasToggle) {
            this.slotToggle = document.createElement("slot");
            this.slotToggle.setAttribute("name", "toggle");

            span.appendChild(this.slotToggle);
        }
		element.appendChild(span);
        fragment.appendChild(element);
		
		
		console.log("Wizard_nav","draw_finish");
		return fragment;
	}
	afterDraw() {
		console.log("Wizard_nav","after_draw");
		  if(this.hasToggle) {
			 
            if (this.toggle === "off") {
				const state1 = this.slotToggle.assignedNodes()[1].state;
				const state= this.slotToggle.assignedNodes()[0].state;
			  if(state1=="off"){
				this.slotToggle.assignedNodes()[1].classList.add("show");
			  }
			  if(state=="off"){
				this.slotToggle.assignedNodes()[0].classList.add("show");
			  }
            } else {
                this.slotToggle.assignedNodes()[0].classList.add("show");
            }
        }

		const previousButton = this.querySelector('wj-wizard-button[part="previous"]')
		const nextButton = this.querySelector('wj-wizard-button[part="next"]')
		//const nextButton = new Button(nextButtonObj);
		//nextButton.toggleStates();
		//previousButton.setAttribute("slot","toggle");
	
		//nextButton.classList.add("toggle");
		
		if(nextButton){
			console.log("Wizard_nav","setting_next_click");
			nextButton.addEventListener('click', (e) => this._dispatchNext(e));
		}else{
			console.log("Wizard_nav","next_button_is_null");
		}
		if(previousButton){
			console.log("setting_previous_to_block");
		//spreviousButton.style.display="none";
			previousButton.addEventListener('click', (e) => this._dispatchPrevious(e));
		}else{
			console.log("Wizard_nav","previous_button_is_null");
		}
		
		 
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
	
}
customElements.get(WizardNav.is) || window.customElements.define(WizardNav.is, WizardNav);