import WJElement from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./list.scss";

/**
 * @injectHTML
 */
export class List extends WJElement {
    constructor() {
        super();
    }

    static get className(){
		return "List";
	}

	static get is() {
		return `${elementPrefix}-list`;
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
		this.selectedValues=[];
        let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }

    afterDraw() {
		console.log("finished_draw_list");
		this.shadowRoot.addEventListener('wj-selected-values', ( e ) => this.selectedChange(e));
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
    }
	set values(e){
		if(!this.selectedValues.includes(e,0)){
			this.selectedValues.push(e);
		}
		console.log("size_of_selected:"+this.selectedValues.length);
	}
	get values(){
		
		return this.selectedValues;
	}
	selectedChange(e){
	
		const selectedOption = e.detail.data;
		const action = e.detail.action;
		if(action=="add"){
			this.values=selectedOption;
		}else{
			if(action=="remove"){
				const previousSecondElementOfTheArray = this.values.splice(selectedOption, 1);
			}
		}
	}
	afterDisconnect(){
		this.removeEventListener("wj-selected-values", this.selectedChange);
	}
}


customElements.get(List.is) || window.customElements.define(List.is, List);