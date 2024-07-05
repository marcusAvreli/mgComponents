import {event } from "../../wj-element/wj-element.js";
export class ServiceInteger {
  constructor(component) {
	  
	this._component = component;	
	this.validationMap = new Map(Object.entries({ 
		intTextBox: function(value) {return /^-?\d*$/.test(value)},
		uintTextBox: function(value) {return /^\d*$/.test(value)},
		intLimitTextBox: function(value) {return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500)	},
		floatTextox		: function(value) {return /^-?\d*[.,]?\d*$/.test(value)	},
		currencyTextBox: function(value) {return /^-?\d*[.,]?\d{0,2}$/.test(value)	},
		latinTextBox: function(value) { return /^[a-z]*$/i.test(value)	},
		hexTextBox: function(value) {	return /^[0-9a-f]*$/i.test(value)}
	}));
	 
  }
  
	setCustom(){	
		this._component.input.addEventListener('input', (e) => {this.onInput(e)});
		this._component.input.addEventListener('invalid', (e) => {this.onInvalidInput(e)});	
	}
  
	onInvalidInput(e){
		this._component.invalid = true;
		this._component.pristine = false;	
		this.errorMessage.textContent = this._component.internals.validationMessage;

		if(this.customErrorDisplay) {
			e.preventDefault();
		}
	}
	onInput(e){

		if(this._component.validateOnChange) {
			this._component.setPristine(false);
		}
		const clone = new e.constructor(e.type, e);
		this._component.dispatchEvent(clone);
		let myValid = true;
		if(this._component.isIntTextBox()){
			myValid = this.isCustomValid(this.validationMap.get("intTextBox"),this._component.input);	
		}
		//console.log("service_integer","myValid:"+myValid);
		if(!myValid){
			this._component.input.setCustomValidity("Must be an integer");
			//console.log("service_integer","old Value1:"+this.oldValue);
			if(this.oldValue){
				this._component.input.value = this.oldValue
			}else{
				this._component.input.value = this._component.input.defaultValue;
			}
		}else{
			this._component.input.setCustomValidity("");
			this._component.errorMessage.textContent = this._component.input.validationMessage;
			this._component.removeAttribute("invalid");
			//console.log("service_integer","old Value2:"+this.oldValue);
			this.oldValue = this._component.input.value;

		}
		this.validateInput();
		//console.log("service_integer","service_integer:"+this._component.input.value);
		event.dispatchCustomEvent(this._component, "wj-input:input", {
			value: this._component.input.value
			,component: this._component.input
		});
	}
  
  
    validateInput() {
        const validState = this._component.input.validity;
		const myMessage = this._component.input.validationMessage;
        this._component.invalid = false;
			//console.log("service_integer","my message:"+myMessage);
			//console.log("service_integer","my message state:"+validState.valid);
		if(!validState.valid) {		
			if(!validState.valid) {
				for(let state in validState) {
			//			console.log("service_integer","my message state_1");
					const attr = `message-${state.toString()}`;
					if(validState[state]) {
						this._component.validationError = state.toString();
						this._component.invalid = !this._component.isPristine() && !validState.valid;
						console.log("service_integer","my message state_2:"+this._component.isPristine());
						let errorMessage = myMessage;
	/*
						if(!this.hasAttribute("message"))
							errorMessage = this.hasAttribute(attr) ? this.getAttribute(attr) : this.input.validationMessage;
	*/
				//		console.log("service_integer","my message state_3");
						this._component.internals.setValidity(
						  {[this._component.validationError]: true},
							errorMessage
						);
					//	console.log("service_integer","my message state_4");
					//	console.log("service_integer","my message state_4"+ this._component.customErrorDisplay);
					//	console.log("service_integer","my message state_4"+ this._component.invalid );
						if(this._component.invalid && this._component.customErrorDisplay) {
							console.log("service_integer","dispatch_event");
							this._component.dispatchEvent(new Event('invalid'));			
						}
					}
				}
			}
		} else {
			this._component.internals.setValidity({});
			this._component.pristine = false;
			this._component.errorMessage.textContent = this._component.input.validationMessage;
		}
       
    }
	isCustomValid(inputFilter,input){
		if (inputFilter(input.value)){
			return true;
		}else{		
			return false;
		}
			  
	}
  

};