import { default as WJElement, event } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  {ServiceLocator} from './locator/serviceLocator.js';
import {ServiceText} from './locator/serviceText.js';
import {ServiceInteger} from './locator/serviceInteger.js';
/**
 * @injectHTML
 */
export class Input extends WJElement {
    constructor(options = {}) {
        super();

        // this._value = "";
        this.invalid = false;
        this.pristine = true;
        this.internals = this.attachInternals();
		
		this.services = new ServiceLocator();
		
		
		this.services.register({
		  name: 'ServiceText',
		  constructor: ServiceText,
		  args: ['option'],
		});

		this.services.register({
		  name: 'ServiceInteger',
		  constructor: ServiceInteger,
		 // deps: ['Service1'],
		  singleton: false,  args: [this],
		});
    }
	static get className(){
		return "Input";
	}

	static get is() {
		return `${elementPrefix}-input`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
	
	isIntTextBox(){
		return this.hasAttribute("intTextBox");
	}
	isUintTextBox(){
		return this.hasAttribute("uintTextBox");
	}
	
	isIntLimitTextBox(){
		return this.hasAttribute("intLimitTextBox");
	}
	isFloatTextBox(){
		return this.hasAttribute("floatTextBox");
	}

	isCurrencyTextBox(){
		return this.hasAttribute("currencyTextBox");
	}
	isLatinTextBox(){
		return this.hasAttribute("latinTextBox");
	}
	isHexTextBox(){
		return this.hasAttribute("hexTextBox");
	}
	getDefaultValue(){
		return this.getAttribute("defaultvalue") ;//|| "115";
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

    get customErrorDisplay() {
        return this.hasAttribute('custom-error-display');
    }

    get validateOnChange() {
        return this.hasAttribute('validate-on-change');
    }

    get invalid() {
        return this.hasAttribute('invalid');
    }

    set invalid(isInvalid) {
        isInvalid && this.customErrorDisplay ? this.setAttribute('invalid', '') : this.removeAttribute('invalid');
    }

    get form() {
        return this.internals.form;
    }

    get name() {
        return this.getAttribute('name');
    }
get placeholder(){
	 return this.getAttribute("placeholder") || "default";
}
    get type() {
        return this.localName;
    }

    get validity() {
        return this.internals.validity;
    }

    get validationMessage() {
        return this.internals.validationMessage;
    }

    get willValidate() {
        return this.internals.willValidate;
    }
    checkValidity() {
        return this.internals.checkValidity();
    }

    reportValidity() {
        return this.internals.reportValidity();
    }

	static get formAssociated(){
		return true;
	}
  
    static get observedAttributes() {
        return ["value"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
	
        let hasSlotStart = this.hasSlot(this, "start");
        let hasSlotEnd = this.hasSlot(this, "end");
        let fragment = document.createDocumentFragment();

        // Wrapper
        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-input", this.variant || "default");

        if(this.hasAttribute("invalid"))
            native.classList.add("has-error");

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        let inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input-wrapper");

        // Label
        let label = document.createElement("label");
        label.innerText = this.label;
		
        if(this.value && !this.hasAttribute("error"))
            label.classList.add("fade");

        // Input
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("part", "input");
        input.setAttribute("value", this.value || "");
        input.classList.add("form-control");
		input.defaultValue = this.getDefaultValue();

      //  if(this.hasAttribute("placeholder"))
            input.setAttribute("placeholder", this.placeholder);

        if(this.hasAttribute("disabled"))
            input.setAttribute("disabled", "");

        if(this.hasAttribute("readonly"))
            input.setAttribute("readonly", "");

        // Error
        let error = document.createElement("div");
        error.classList.add("error-message");

        let start = null;
        if(hasSlotStart) {
            start = document.createElement("slot");
            start.setAttribute("name", "start");
        }

        let end = null;
        if(hasSlotEnd) {
            end = document.createElement("slot");
            end.setAttribute("name", "end");
        }

        if(hasSlotStart) {
            wrapper.appendChild(start);
            native.classList.add("has-start");
        }

        if(this.variant === "standard") {
            if(this.label)
                native.appendChild(label);
        } else {
            inputWrapper.appendChild(label);
        }

        inputWrapper.appendChild(input);

        wrapper.appendChild(inputWrapper);

        native.appendChild(wrapper);

        if(this.hasAttribute("clearable")) {
            this.clear = document.createElement("wj-button");
            this.clear.classList.add("clear");
            this.clear.setAttribute("variant", "link")
            this.clear.setAttribute("part", "clear");

            let clearIcon = document.createElement("wj-icon");
            clearIcon.setAttribute("name", "x");

            this.clear.appendChild(clearIcon);

            inputWrapper.appendChild(this.clear);
        }

        if(hasSlotEnd) {
            wrapper.appendChild(end);
            native.classList.add("has-end");
        }


        native.appendChild(error);

        fragment.appendChild(native);

        this.native = native;
        this.labelElement = label;
        this.input = input;
        this.errorMessage = error;

        return fragment;
    }
	
	set input(input){
		this.txtField=input;
	}
	get input(){
		return this.txtField;
	}
	set errorMessage(error){
		this.txtError= error;
	}
	get errorMessage(){
		return this.txtError;
	}
	isPristine(){
		return this.pristine;
	}
	setPristine(value){
		this.pristine=value;
	}

    afterDraw() {
		this.input.defaultValue=this.getAttribute("defaultvalue");
		console.log("input","input outer_html:"+this.outerHTML);
		console.log("input","input default_outer_html:"+this.getAttribute("defaultvalue"));
		console.log("input","after_draw_1");
        [
            'type',
            'value',
            'placeholder',
            'required',
            'min',
            'max',
            'minLength',
            'maxLength',
            'pattern'
        ].forEach((attr) => {
            const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);
            if(attrValue !== null && attrValue !== undefined) {
				const field = this.input;
                field[attr] = attrValue;
            }
        });
			const serviceInteger = this.services.resolve('ServiceInteger');
			serviceInteger.setCustom();
			this.addEventListener('invalid', (e) => {			
				this.invalid = true;
				this.pristine = false;
				console.log("input","invalid_called");
				this.errorMessage.textContent = this.internals.validationMessage;
				if(this.customErrorDisplay) {
					e.preventDefault();
				}
			})
		
			
			this.input.addEventListener("focus", (e) => {
				this.labelElement.classList.add("fade");
				this.native.classList.add("focused");
			});
		
			this.input.addEventListener("blur", (e) => {
				this.native.classList.remove("focused");
				if(!e.target.value)
					this.labelElement.classList.remove("fade")
			});



			

			this.addEventListener('focus', () => this.input.focus());

			if(this.clear) {
				this.clear.addEventListener("wj:button-click", (e) => {
					this.input.value = "";
					event.dispatchCustomEvent(this.clear, "wj-input:clear");
				});
			}
		
    }


    hasSlot(el, slotName = null) {
        let selector = slotName ? `[slot="${slotName}"]` : "[slot]";

        return el.querySelectorAll(selector).length > 0 ? true : false;
    }
	unregister(){}
}

customElements.get(Input.is) || window.customElements.define(Input.is, Input);