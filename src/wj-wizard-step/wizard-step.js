import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import {Button} from '../wj-button/button.js';
/**
 * @injectHTML
 */
export class WizardStep extends WJElement {
	constructor() {
		super();
		console.log("WizardStep","constructor");
	}
	 static get is() {
		return `${elementPrefix}-wizard-step`;
	}
	static get className(){
		return "WizardStep";
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
		console.log("WizardStep","draw_start");
	//	console.log("Wizard_nav","draw_start:"+this.textContent);
		
	
        let fragment = document.createDocumentFragment();
		
		let container = document.createElement("div");
		container.classList.add("wizard-step-container");
		let formStep = document.createElement("div");
		formStep.classList.add("form-step");
		formStep.classList.add("form-step-active");
		this.classList.add("wizard-step");	
		let slot = document.createElement("slot");
		slot.classList.add("form-step-slot");
		formStep.appendChild(slot);
		container.appendChild(formStep);
        fragment.appendChild(container);
		
		let formOfStep = document.createElement("div");
		
		
		
		console.log("WizardStep","draw_finish");
		return fragment;
	}
	afterDraw() {
		console.log("WizardStep","after_draw_start");
		/*  if(this.hasToggle) {
			 
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
		*/
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
customElements.get(WizardStep.is) || window.customElements.define(WizardStep.is, WizardStep);