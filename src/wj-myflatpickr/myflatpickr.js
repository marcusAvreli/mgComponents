import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import flatpickr from "flatpickr";
//import {confirmDatePlugin} from "flatpickr/dist/plugins/confirmDate/confirmDate.js";
//import confirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
//import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import  "flatpickr/dist/plugins/confirmDate/confirmDate.js";
import "flatpickr/dist/plugins/monthSelect/index.js";
/**
 * @injectHTML
 */
export class Myflatpickr  extends WJElement {
    constructor() {
        super();
    }

  
    static get is() {
		return `${elementPrefix}-myflatpickr`;
	}
	static get className(){
		return "Myflatpickr";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return ["active"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();
		let native = document.createElement("div");
		let testInput = document.createElement("input");
		//https://github.com/fysiweb/flatpickr-web-component/blob/994182c993fca353599de2a1afaa98db49734f9c/src/index.js#L85
		fragment.appendChild(native);
		native.appendChild(testInput);
		this.config = Object.assign({
			time_24hr: true
			,mode:"range"
			,onClose: function (selectedDates, dateStr, instance) {
				//on close fired before on change
				console.log("on_close:"+dateStr);
			}
			 ,onChange: (selectedDates, dateStr, instance) =>
            this.dispatchEvent(
              new CustomEvent("selectedDates", {
                detail: selectedDates.map((date) => date.getTime()),
              })
            ),
			
			
		}
		,this.config
		);
		this.flatpickr = flatpickr(testInput, this.config);		
        return fragment;
    }
afterDraw(context, store, params) {
		/*this.flatpickr.config.onChange.push(function() { console.log("dddddd");	this.dispatchEvent(  new CustomEvent('selectedDates', {
                    bubbles: true,
                    detail: "sdsadsa",
                }));} );
				*/
		
	
	}
	unregister(){}
	afterDisconnect(){}
}

customElements.get(Myflatpickr.is) || window.customElements.define(Myflatpickr.is, Myflatpickr);