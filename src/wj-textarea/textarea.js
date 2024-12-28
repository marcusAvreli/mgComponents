import { default as WJElement, event } from "../wj-element/wj-element.js";
import { Localizer } from "../utils/localize.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Textarea extends WJElement {
    constructor() {
        super();
this.localizer = new Localizer(this);
        this._checked = false;
    }

    set checked(value) {
        this._checked = value;

        if(value)
            this.setAttribute("checked", "");
        else
            this.removeAttribute("checked");
    }

    get checked() {
        return this._checked;
    }

    static get is() {
		return `${elementPrefix}-textarea`;
	}
	static get className(){
		return "Textarea";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    static get observedAttributes() {
        return ["checked"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
		if(this.hasAttribute("lang")){
			this.localizer.setLanguage();
		}
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.classList.add("native-textarea", this.variant || "default");

        if(this.hasAttribute("invalid"))
            native.classList.add("has-error");

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        let inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input-wrapper");
	
        let label = document.createElement("label");
		const labelValue = this.localizer.translate(this.label);
        label.htmlFor = "textarea";
        label.innerHTML = labelValue || "";

        let input = document.createElement("textarea");
        input.id = "textarea";
        input.name = this.name;
        input.disabled = this.hasAttribute("disabled");
        input.innerText = this.innerText;
        input.classList.add("form-control");
        input.setAttribute("part", "input");
        input.setAttribute("rows", this.rows || 3);
        input.setAttribute("spellcheck", false);

        if(this.resize === "auto")
            input.addEventListener("input", this.setTextareaHeight);

        if(this.variant === "standard") {
            if(this.label)
                native.appendChild(label);
        } else {
            inputWrapper.appendChild(label);
        }

        inputWrapper.appendChild(input);

        wrapper.appendChild(inputWrapper);

        native.appendChild(wrapper);

        fragment.appendChild(native);

        if(this.hasAttribute("counter")) {
            input.maxLength = this.maxLength || 1000;
            input.addEventListener("input", this.counter);

            let counter = document.createElement("div");
            counter.classList.add("counter");
            counter.innerText = `${input.value.length}/${input.maxLength}`;

            this.counterElement = counter;
            fragment.appendChild(counter);
        }

        this.native = native;
        this.labelElement = label;
        this.input = input;

        return fragment;
    }

    afterDraw() {
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight);

        if (!this.hasAttribute("disabled")) {
            event.addListener(this, "click", "wj:textarea:change");
            event.addListener(this, "click", "wj:textarea:input");
        }

        this.input.addEventListener("focus", (e) => {
            this.labelElement.classList.add("fade");
            this.native.classList.add("focused");
        });

        this.input.addEventListener("blur", (e) => {
            this.native.classList.remove("focused");
            if(!e.target.value)
                this.labelElement.classList.remove("fade")
        });
    }

    disconnectedCallback() {
        this.resizeObserver.unobserve(this.input);
    }

    setTextareaHeight = () => {
        if(this.getAttribute("resize") === "auto") {
            this.input.style.height = 'auto';
            this.input.style.height = this.input.scrollHeight + "px";
        }
    }

    counter = (e) => {
        this.counterElement.innerText = e.target.value.length + "/" + this.input.maxLength;
    }
	unregister(){}
}

customElements.get(Textarea.is) || window.customElements.define(Textarea.is, Textarea);