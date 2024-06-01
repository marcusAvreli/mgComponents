import { default as WJElement, event } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Select extends WJElement {
    constructor() {
        super();

        this._selected = [];
        this.counterEl = null;
    }

    set selected(value) {
        this._selected = value;
    }

    get selected() {
        return this.getSelected();
    }

    set trigger(value) {
        this.setAttribute("trigger", value);
    }

    get trigger() {
        return this.getAttribute("trigger") || "click";
    }

      static get is() {
		return `${elementPrefix}-select`;
	}
	static get className(){
		return "Select";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }


    static get observedAttributes() {
        return ["active", "value"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        this.classList.add("wj-placement", "wj-" + this.placement || "wj-start");

        // zakladny obalovac
        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-select", this.variant || "default");

        // wrapper pre label a inputWrapper
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.setAttribute("slot", "anchor");

        // label
        let label = document.createElement("wj-label");
        label.innerText = this.label || "";

        // obalovac pre input
        let inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input-wrapper");

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("part", "input");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("readonly", "");
        input.setAttribute("placeholder", this.placeholder || "");

        let arrow = document.createElement("wj-icon");
        arrow.setAttribute("name", "chevron-down");
        arrow.setAttribute("slot", "arrow");

        let chips = document.createElement("div");
        chips.classList.add("chips");
        chips.innerText = this.placeholder || "";

        // obalovac pre option
        let optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("option-wrapper");
        optionsWrapper.style.setProperty("height", this.maxHeight || "auto");

        let slot = document.createElement("slot");

        let clear = document.createElement("wj-button");
        clear.setAttribute("fill", "link")
        clear.setAttribute("part", "clear");

        let clearIcon = document.createElement("wj-icon");
        clearIcon.setAttribute("name", "x");

        clear.appendChild(clearIcon);

        // vytvorime popup
        let popup = document.createElement("wj-popup");
        popup.setAttribute("placement", "bottom-start");
        popup.setAttribute("manual", "");
        popup.setAttribute("size", "");

        if(this.hasAttribute("disabled"))
            popup.setAttribute("disabled", "");

        if(this.variant === "standard") {
            if(this.hasAttribute("label"))
                native.appendChild(label);
        } else {
            wrapper.appendChild(label);
        }

        inputWrapper.appendChild(input);
        if(this.hasAttribute("multiple"))
            inputWrapper.appendChild(chips);

        if(this.hasAttribute("clearable"))
            inputWrapper.appendChild(clear);

        inputWrapper.appendChild(arrow);

        optionsWrapper.appendChild(slot);

        wrapper.appendChild(inputWrapper);

        popup.appendChild(wrapper);
        popup.appendChild(optionsWrapper);

        if(this.trigger === "click")
            popup.setAttribute("manual", "");

        native.appendChild(popup);

        this.native = native;
        this.popup = popup;
        this.labelElement = label;
        this.input = input;
        this.optionsWrapper = optionsWrapper;
        this.chips = chips;
        this.clear = clear;

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw(context, store, params) {
        this.input.addEventListener("focus", (e) => {
            this.labelElement.classList.add("fade");
            this.native.classList.add("focused");
        });

        this.input.addEventListener("blur", (e) => {
            this.native.classList.remove("focused");
            if(!e.target.value)
                this.labelElement.classList.remove("fade")
        });

        this.addEventListener("wj:option-change", this.optionChange);
        this.clear.addEventListener("wj:button-click", (e) => {
            this.getAllOptions().forEach((option) => {
                option.selected = false;
                option.removeAttribute("selected");
            });
            this.selections();
            e.stopPropagation();
        });

        this.selections();

        this.optionsWrapper.addEventListener("wj:options-load", (e) => {
            this.optionsWrapper.scrollTo(0, 0);
        });

    }

    optionChange = (e) => {
        let allOptions = this.getAllOptions();

        if(!this.hasAttribute("multiple")) {
            allOptions.forEach((option) => {
                option.selected = false;
                option.removeAttribute("selected");
            });
            this.popup.removeAttribute("active");
        }

        e.target.selected = !e.target.hasAttribute("selected");

        this.selections(e.target);
    }

    getAllOptions() {
        return this.querySelectorAll("wj-option");
    }

    getSelectedOptions() {
        return this.querySelectorAll("wj-option[selected]");
    }

    getSelected(option) {
        let selectedOptions = this.getSelectedOptions();

        selectedOptions = Array.isArray(selectedOptions) ? selectedOptions : Array.from(selectedOptions);

        selectedOptions = selectedOptions.map((option) => {
            return {
                value: option.value,
                text: option.textContent.trim()
            };
        });

        return selectedOptions;
    }

    selectionChanged(option = null, length = 0) {
        if (this.hasAttribute("multiple")) {
            this.value = this.selectedOptions.map(el => el).reverse();

            if (this.placeholder && length === 0) {
                this.chips.innerHTML = this.placeholder;
                this.input.value = '';
            } else {
                if(this.counterEl instanceof HTMLElement || length > +this.maxOptions) {
                    this.counter();
                } else {
                    if(option != null)
                        this.chips.appendChild(this.getChip(option));
                }
            }
        } else {
            let value = option?.textContent.trim() || "";
            this.value = value;
            this.input.value = value;
        }
    }

    selections(option) {
        let options = this.getSelectedOptions();

        this.selectedOptions = Array.isArray(options) ? options : Array.from(options);

        if(this.selectedOptions.length >= +this.maxOptions) {
            this.counterEl = null;
        }

        this.chips.innerHTML = "";
        if(this.selectedOptions.length > 0) {
            this.selectedOptions.forEach((option, index) => {
                this.selectionChanged(option, ++index);
            });
        } else {
            this.selectionChanged();
        }
    }

    counter() {
        // zmazanie counter (span)
        if (this.counterEl && this.value.length === +this.maxOptions) {
            this.counterEl.remove();
            this.counterEl = null;
            return;
        }

        // ak counter nie je, tak ho vytvorime
        if(!this.counterEl) {
            this.counterEl = document.createElement("span");
            this.counterEl.classList.add("counter");

            this.chips.appendChild(this.counterEl);
        }

        // nastavime hodnotu counter
        this.counterEl.innerText = `+${this.value.length - +this.maxOptions}`;
    }

    getChip(option) {
        let chip = document.createElement("wj-chip");
        chip.setAttribute("removable", "");
        chip.addEventListener("wj:chip-remove", this.removeChip);
        chip.option = option;

        let label = document.createElement("wj-label");
        label.innerText = option.textContent.trim();

        chip.appendChild(label);

        return chip;
    }

    removeChip = (e) => {
        let option = e.target.option;
        option.selected = false;
        option.removeAttribute("selected");
        e.target.parentNode.removeChild(e.target);

        this.selections(null, 0);
    }
	unregister(){}
}

customElements.get(Select.is) || window.customElements.define(Select.is, Select);