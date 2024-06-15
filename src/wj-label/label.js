import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { Localizer } from "../utils/localize.js";
import  "./label.scss";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Label extends WJElement {
    constructor() {
        super();
		this.localizer = new Localizer(this);
    }
	static get className(){
		return "Label";
	}
	static get is() {
		return `${elementPrefix}-label`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    beforeDraw(context, store, params) {
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();
		const translationText = this.localizer.translate("wj.file.upload.button");
		
        if(params.color)
            this.classList.add("wj-color-" + params.color, "wj-color");

        let element = document.createElement("slot");

        fragment.appendChild(element);

        return fragment;
    }
	get value(){
		return this.textContent;
	}
	set value(lblValue){
		this.textContent=lblValue;
	}
	afterDisconnect(){}
}

customElements.get(Label.is) || window.customElements.define(Label.is, Label);