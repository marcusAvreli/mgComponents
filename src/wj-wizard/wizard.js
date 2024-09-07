import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Wizard extends WJElement {
	
	constructor() {
		super();		
		this.index = 0;		
	}
	
	static get is() {		    
		return `${elementPrefix}-wizard`;
	}
	
	static get className(){
		return "Wizard";
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
		//console.log("Wizard","draw_start");
		 let fragment = document.createDocumentFragment();
		
		let wizardContainer = document.createElement("div");
		wizardContainer.classList.add("wizard-container");
		
		let wizardMain = document.createElement("div");
		let wizardAside = document.createElement("div");
		let wizardFooter = document.createElement("div");
		
		wizardAside.classList.add("wizard-aside");
		wizardMain.classList.add("wizard-main");		
		wizardFooter.classList.add("wizard-footer");
		
		wizardContainer.appendChild(wizardAside);
		wizardContainer.appendChild(wizardMain);		
		wizardContainer.appendChild(wizardFooter);
		
		this.wizardFooter = wizardFooter;
		this.addFooterContent();
	
		
		
		this.wizardContainer=wizardContainer;
		this.wizardMain=wizardMain;
		this.wizardAside=wizardAside;
		
		
		this.addPage();
		
		
        fragment.appendChild(wizardContainer);
		
		
		let formSteps = document.querySelectorAll(".wizard-step");
		this.formSteps=formSteps;
		console.log("formSteps:"+formSteps.length);
		//console.log("Wizard","draw_finish");
        return fragment;
	}
	afterDraw(){
		
	}
	
	addFooterContent(){
		let footerContainer = document.createElement("div");
		footerContainer.classList.add("footer-container");
		this.wizardFooter.appendChild(footerContainer);
		
		let footerGridContainer = document.createElement("div");
		footerGridContainer.classList.add("footer-grid-container");
		footerContainer.appendChild(footerGridContainer);
		
		let footerContentContainer = document.createElement("div");
		footerContentContainer.classList.add("footer-content-container");
		footerGridContainer.appendChild(footerContentContainer);
		
		let prevButton = document.createElement("wj-button");
		footerContentContainer.appendChild(prevButton);
		prevButton.setDisplayLabel("previous");	
			prevButton.classList.add("hide");
			this.prevButton= prevButton
		let nextButton = document.createElement("wj-button");
		footerContentContainer.appendChild(nextButton);
		//nextButton.setDisplayLabel("next");
		this.nextButton = nextButton;
		nextButton.addEventListener("wj:button-click", (e) => {
			this.nextClick(e);
		})
		prevButton.addEventListener("wj:button-click", (e) => {
			this.prevClick(e);
		})	 	
		
		this.formStepsNum = 0;
		const progressSteps = document.querySelectorAll(".circle");
		this.progressSteps = progressSteps;
	}
	addWizardNav(){
			
	}
	addPage(){
		//console.log("add_page_start");
		let page = document.createElement("div");
		page.classList.add("wizard-page");
		//console.log("add_page_1");
		let box1 = document.createElement("div");
		box1.classList.add("box1");
		
		let wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		
		let slot = document.createElement("slot");
		slot.setAttribute("name","navigation");
		//slot.classList.add("wrapper");
		//console.log("add_page_2");
		wrapper.appendChild(slot);
		box1.appendChild(wrapper);
		//console.log("add_page_3");
		let box2 = document.createElement("div");
		box2.classList.add("wizard-box2");
		
		
		let slides = document.createElement("div");
		slides.classList.add("wizard-slides");
		//console.log("add_page_4");
		let slot2 = document.createElement("slot");
		slot2.setAttribute("name","steps");
		slot2.classList.add("wizard-slot-steps");
		slides.appendChild(slot2);
		//console.log("add_page_5");
		let actions = document.createElement("div");
		actions.classList.add("actions");

		
		
		
		//console.log("add_page_6");
		box2.appendChild(slides);
		//box2.appendChild(actions);
		//console.log("add_page_7");
		/*
		const progressSteps = document.querySelectorAll(".circle");
		*/
		
		//page.appendChild(box1);
		
		page.appendChild(box2);
		//console.log("add_page_8");
		
		this.wizardAside.appendChild(box1);
		this.wizardMain.appendChild(page);
		/*this.box1=box1;
		this.box2=box2;
		*/
		//console.log("add_page_9");
		// this.formStepsNum = 0;
		/* this.formSteps=formSteps;
		*/
		// this.progressSteps=progressSteps;
		 //console.log("add_page_finish");
		
	}
	prevClick(e){
		console.log("wizard_previous_button");
		this.formStepsNum--;
		this.updateFormSteps();
		this.updateProgressbar();
	}
	nextClick(e){
		console.log("wizard_next_button");
		this.formStepsNum++;
        this.updateFormSteps();
        this.updateProgressbar();
	}
	updateProgressbar(){
		console.log("update_Progress_bar_start");
		  this.progressSteps.forEach((progressStep, index) => {
        if ( index < this.formStepsNum + 1 ) {
            progressStep.classList.add('progress-step-active')
            
            
        } else {
            progressStep.classList.remove('progress-step-active')
        }
    })
	console.log("update_Progress_bar_finish");
	}
	updateFormSteps(){
		console.log("update_Form_Steps_start");
		console.log("formSteps:"+this._stepsCount());
		console.log("formStepsNum:"+this.formStepsNum);
		if(this._stepsCount()>this.formStepsNum){
		this.formSteps.forEach((formStep) => {
			formStep.classList.contains("wizard-step-active") &&
			formStep.classList.remove("wizard-step-active")
		})
			if(this.prevButton.classList.contains("hide")){
					this.prevButton.classList.remove("hide")
				}
		
			this.formSteps[this.formStepsNum].classList.add("wizard-step-active");
			
			if(this._stepsCount() == this.formStepsNum+1){
				console.log("no_more_steps_1:"+this.formStepsNum);
				this.nextButton.classList.add("hide");
				//this.formStepsNum--;
			}else{
				if(this.nextButton.classList.contains("hide")){
				this.nextButton.classList.remove("hide")
				}
			}
			
			
		}else{
			console.log("no_more_steps_2:"+this.formStepsNum);
			
			//this.nextButton.shadowRoot.setAttribute("slot","toggle");
		}
		
		if(0 == this.formStepsNum){
				this.prevButton.classList.add("hide");
			}else{
				if(this.prevButton.classList.contains("hide")){
					this.prevButton.classList.remove("hide")
				}
			}
		console.log("update_Form_Steps_finish");
	}
	
	_stepsCount(){
		return this.formSteps.length;
	}
   _panelCount() {
        return this.querySelectorAll('wj-panel').length;
    }
	 _activePanelIndex() {
        let foundIndex = undefined;

        this._forEachPanel((panel, index) => {
            if (panel.active) {
                foundIndex = index;
            }
        });

        return foundIndex;
    }
	    _firstPanel() {
        return this.querySelector('wj-panel');
    }

    _forEachPanel(callback) {
        this.querySelectorAll('wj-panel').forEach((panel, index) => {
            callback(panel, index);
        });
    }
	next() {
		console.log("Wizard","next slide");
		console.log("Wizard","panel count:"+this._panelCount());
		
		if (this.index < this._panelCount() - 1) {
			console.log("Wizard","next slide to calling");
			this.slideTo(this.index + 1);
		} else {
			this.finish();
		}
		
	}
	previous() {
		console.log("Wizard","previous slide");
		  if (this.index > 0) {
            this.slideTo(this.index - 1);
        } else {
           this.endEarly();
        }
	}
	slideTo(index) {
		console.log("Wizard","slide to_start:");
		console.log("Wizard","slide to:"+index);
		const oldIndex = this.index || 0;
		const panels = this.querySelectorAll('wj-panel');
		//	console.log("Wizard","panels:"+panels.length);
		//	console.log("Wizard","panels text:"+panels[0].outerText);
		//	console.log("Wizard","panels HTML:"+panels[0].outerHTML);
			
		if (index > panels.length-1) {
            this.index = panels.length-1;
        } else if (index < 0) {
            this.index = 0;
        } else {
            this.index = index;
        }
		console.log("Wizard","size_of_panels:"+panels.length);
		console.log("Wizard","current_index:"+index);
		console.log("Wizard","before_set_active panel active:"+panels[index].active);
		panels[index].active = true;
		panels[index].style.display="block";
		const nextButton = panels[index].querySelector('wj-wizard-button[part="next"]');
		if(panels.length-1==index){
			if (nextButton.classList.contains('show')) {
				//nextButton.classList.remove('show');
			} else {
                //node.classList.add('show');
            }
		}else{
			if (!nextButton.classList.contains('show')) {
				nextButton.classList.add('show');
			}
		}
		console.log("Wizard","after _set_active");
		this.style.setProperty('--zc-panel-index', this.index);
		if (oldIndex !== this.index) {
            setTimeout(() => {
				console.log("Wizard","slide to_old:"+oldIndex);
                panels[oldIndex].active = false;
				panels[oldIndex].style.display="none";
            }, this.speed);
        }
		console.log("Wizard","slide to_finish:");
	}
	 get speed() {
        if (this.attributes.speed && this.attributes.speed.value !== undefined) {
            return this.attributes.speed.value;
        } else {
            return 1;
        }
    }

    set speed(val) {
        if (val) {
            this.setAttribute('speed', '');
        } else {
            this.removeAttribute('speed');
        }
    }
	  finish() {
		console.log("Wizard","Finish");
        this.dispatchEvent(new CustomEvent('ziro-wizard-successful', {
            bubbles: true
        }));
        this._close();
    }

    endEarly() {
        this.dispatchEvent(new CustomEvent('ziro-wizard-unsuccessful', {
            bubbles: true
        }));
        this._close();
    }
	
	 _close() {
        this.active = false;
        setTimeout(() => this.slideTo(0), this.speed);

        this.dispatchEvent(new CustomEvent('ziro-wizard-closed', {
            bubbles: true
        }));
    }
	 get active() {
		 console.log("Wizard","get_active_start");
        if (this.attributes.active && this.attributes.active.value !== undefined) {
			console.log("Wizard","get_active_finish_1");
            return this.attributes.active === '' || !! this.attributes.active && this.attributes.active !== 'false';
        } else {
			console.log("Wizard","get_active_finish_2");
            return false;
        }
    }
    start() {
        this.active = true;
    }
	 _slot() {
        return `<slot></slot>`;
    }
    set active(val) {
		console.log("Wizard","set_active_start");
		console.log("Wizard","set_active_val:"+val);
        if (val) {
			console.log("Wizard","set_active");
			console.log("Wizard","set_active_shadowRoot:"+this.shadowRoot);
            this.setAttribute('active', '');
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = this._slot();
				console.log("Wizard","set_active_left");
                this.style.left = '0';
				console.log("Wizard","set_active_left:"+  this.style.left);
            }
            this.dispatchEvent(new CustomEvent('ziro-wizard-start', {
                bubbles: true
            }));
        } else {
			console.log("Wizard","set_active_remove_active");
            this.removeAttribute('active');
            if (this.shadowRoot) {
                this.style.left = '100%';
                setTimeout(() => {
                    this.shadowRoot.innerHTML = '';
                }, this.speed);
            }
        }
		console.log("Wizard","set_active_finish");
    }
	unregister(){
		console.log("Wizard","unregister");		
	}
}

customElements.get(Wizard.is) || window.customElements.define(Wizard.is, Wizard);