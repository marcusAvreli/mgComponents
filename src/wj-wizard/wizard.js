import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Wizard extends WJElement {
	
	constructor() {
		super();
		console.log("Wizard","constructor");
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
		console.log("Wizard","draw_start");
		 let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");

        fragment.appendChild(element);
		console.log("Wizard","draw_finish");
        return fragment;
	}
	afterDraw(){
		
		this.shadowRoot.addEventListener('wj-wizard-next', ( e ) => this.next(e));
		this.shadowRoot.addEventListener('wj-wizard-previous', ( e ) => this.previous(e));
		 const firstPanel = this._firstPanel();
		 firstPanel.style.display="block";
		 
		 console.log("Wizard", "before_set_first_panel_active");
        if (firstPanel && this._activePanelIndex() === undefined) {
			console.log("Wizard", "set_first_panel_active");
            firstPanel.active = true;
			this.active = true;
        }
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