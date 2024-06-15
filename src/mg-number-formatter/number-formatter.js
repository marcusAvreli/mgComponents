import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import reflectedProperties from "../utils/reflectedProperties.js";
/**
 * @injectHTML
 */
export class NumberFormatter  extends WJElement {
	 value;
  lang;
  currency;
  percent;
    constructor(options = {}) {
        super();

          reflectedProperties(this, NumberFormatter.observedAttributes);
   
    }
	static get className(){
		return "NumberFormatter ";
	}

	static get is() {
		return `${elementPrefix}-number-formatter`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
	get label (){
		return this.getAttribute("label") || "";
	}
    set value(value) {

        this.setAttribute("value", value);
    }

    get value() {
        return this.getAttribute("value") || "";
    }

   
   

    get form() {
        return this.internals.form;
    }

    get name() {
        return this.getAttribute('name');
    }

    get type() {
        return this.localName;
    }

   

   

   
	static get formAssociated(){
		return true;
	}
  
    static get observedAttributes() {
		console.log("number_formatter","observed_attribute");
         return ["value", "lang", "currency", "percent"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }
	getOptions() {
		const defaultFormat = new Intl.NumberFormat();
		const options = Object.assign(defaultFormat.resolvedOptions(), this.config);

		// Autoset style
		if (this.percent) {
			options.style = "percent";
		}
		if (this.currency) {
			options.currency = this.currency;
			options.style = "currency";
		}
		if (options.unit) {
			options.style = "unit";
		}
		return options;
	}
	updateFormatter() {
		const lang = this.lang || defaultLang;	
		this.myformatter = new Intl.NumberFormat(lang, this.getOptions());	
	}
	
	myrender() {
		const v = this.value;
		this.innerText = this.myformatter.format(v);
	}
	
    draw(context, store, params) {
		this.formatter = null;
		console.log("number_formatter","draw");
		this.updateFormatter();
		let fragment = document.createDocumentFragment();

		let wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		let native = document.createElement("div");
		let input = document.createElement("input");

		input.addEventListener('input', (e) => {this.inputChange(e)});

		input.setAttribute("type", "text");
	
		let inputWrapper = document.createElement("div");
		inputWrapper.classList.add("input-wrapper");
		inputWrapper.appendChild(input);
		wrapper.appendChild(inputWrapper);
		native.appendChild(wrapper);
		fragment.appendChild(native);
		this.input = input;
        return fragment;
    }
	
	inputChange(e){		
		const formattedValue = this.myformatter.format(this.input.value.substring(1).replace(/,/g, ''));		
		this.input.value = formattedValue;		
	}
	

	attributeChangedCallback(attrName, oldVal, newVal) {	 
		if (this.myformatter) {
			if (attrName != "value") {
				this.updateFormatter();
			}
			this.myrender();
		}
	}
    afterDraw() {
		
         this.myrender();
           
    }
	set innerText(v){	
		this.input.value = v;		
	}
	get innerText(){
		return this.shadowRoot.querySelector("input")
	}
  
    hasSlot(el, slotName = null) {
        let selector = slotName ? `[slot="${slotName}"]` : "[slot]";

        return el.querySelectorAll(selector).length > 0 ? true : false;
    }
	unregister(){}
}

customElements.get(NumberFormatter.is) || window.customElements.define(NumberFormatter.is, NumberFormatter);