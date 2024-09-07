import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import {Button} from '../wj-button/button.js';
/**
 * @injectHTML
 */
export class WizardStep extends WJElement {
	constructor() {
		super();
		
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
		//console.log("WizardStep","draw_start");
	//	console.log("Wizard_nav","draw_start:"+this.textContent);
		
	
        let fragment = document.createDocumentFragment();
		
		let container = document.createElement("div");
		container.classList.add("wizard-step-container");
		let formStep = document.createElement("div");
		formStep.classList.add("wizard-step-content");
		formStep.classList.add("wizard-step-content-active");
		
		this.formStep = formStep;
		if(this.hasAttribute("transferSplit")){
			this.buildTreeColumnScreen();
		}else{
			this.buildDefaultScreen();
		}
		
		
		container.appendChild(formStep);
        fragment.appendChild(container);
		
		let formOfStep = document.createElement("div");
		
		
		
		//console.log("WizardStep","draw_finish");
		return fragment;
	}
	buildDefaultScreen(){
		let slotLeft = document.createElement("slot");
		this.formStep.appendChild(slotLeft);
	}
	buildTreeColumnScreen(){
		
		let stepSplitContainer = document.createElement("div");
		//left transfer right
		stepSplitContainer.classList.add("wizard-step-split-container");
		this.formStep.appendChild(stepSplitContainer);
		
		//this.classList.add("wizard-step");	
		//this.classList.add("wizard-step-active");	
		let slotLeft = document.createElement("slot");
		slotLeft.setAttribute("name", "left");
		
		let transferZone = document.createElement("div");
		transferZone.classList.add("wizard-transfer-zone");
			let slotTransfer = document.createElement("slot");
		slotTransfer.setAttribute("name", "transfer");
		//transferZone.appendChild(slotTransfer);
		
		
		let wjButton = document.createElement("wj-button");
		slotTransfer.appendChild(transferZone);
		
		let slotRight = document.createElement("slot");
		slotRight.setAttribute("name", "right");
		
		//formStep.appendChild(slotLeft);
		stepSplitContainer.appendChild(slotLeft);
		stepSplitContainer.appendChild(slotTransfer);
		stepSplitContainer.appendChild(slotRight);
		//formStep.appendChild(slot);
	}
	
	afterDraw() {
		//console.log("WizardStep","after_draw_start");		
		//console.log("Wizard_nav","after_draw_finish");
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