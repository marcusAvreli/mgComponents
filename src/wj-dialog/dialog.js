import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Dialog extends WJElement {
    constructor() {
        super();
    }

    set placement(value) {
        this.setAttribute("placement", value);
    }

    get placement() {
        return this.getAttribute("placement") || "slide-up";
    }

    static get is() {
		return `${elementPrefix}-dialog`;
	}
	static get className(){
		return "Dialog";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
	setTitle(inTitle){
		console.log(Dialog.is,"inTitle:"+inTitle);
		// this.onTitleChanged()
		if(this.header){
			this.title=inTitle;
			console.log(Dialog.is,"inTitle_1");
			 this.header.innerHTML = `<span>${inTitle}</span>`;
			 console.log(Dialog.is,"inTitle_2");
		}
		
	}
	/*
     static get observedAttributes() {
        return ["title"];
    }
	async attributeChangedCallback(name, oldValue, newValue) {
        if(name == "title"){
            this.title=newValue;
		}
    }
	*/

    setupAttributes() {
        this.isShadowRoot = "open";
        // or
        WjElementUtils.setAttributesToElement(this, {
            "test": "test"
        });
    }

    beforeDraw(context, store, params) {
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        this.classList.add("modal", "fade", this.placement, params.size);

        let slot = document.createElement("slot");
        let dialog = document.createElement("dialog");
        dialog.classList.add("modal-dialog");

        let icon = document.createElement("wj-icon");
        icon.setAttribute("name", "x");
        icon.setAttribute("slot", "icon-only");

        let close = document.createElement("wj-button");
        close.setAttribute("fill", "link");
        close.setAttribute("size", "small");
        close.classList.add("close");
        close.addEventListener("click", () => {
            dialog.close();
        });
        close.appendChild(icon);

        let header = document.createElement("div");
        header.setAttribute("part", "header");
        header.classList.add("dialog-header");
        header.innerHTML = `<span>${this.title}</span>`;
        header.appendChild(close);

        let slotHeader = document.createElement("slot");
        slotHeader.setAttribute("name", "header");
        header.appendChild(slotHeader);

        let body = document.createElement("div");
        body.setAttribute("part", "body");
        body.classList.add("dialog-content");
        body.appendChild(slot);

        let footer = document.createElement("div");
        footer.setAttribute("part", "footer");
        footer.classList.add("dialog-footer");
        footer.innerHTML = "";

        let slotFooter = document.createElement("slot");
        slotFooter.setAttribute("name", "footer");

        footer.appendChild(slotFooter);

        dialog.appendChild(header);
        dialog.appendChild(body);
        dialog.appendChild(footer);

        fragment.appendChild(dialog);
		this.header = header;
        this.dialog = dialog;
        return fragment;
    }
	 isBlank(str) {
    return (!str || /^\s*$/.test(str));
	}
close(){
	this.dialog.close();
}
    afterDraw(context, store, params) {
        if(params.trigger) {
            document.addEventListener(params.trigger, () => {
				this.dialog.close();
                this.dialog.showModal();
            });
        }
    }
	unregister(){}
	disconnectedCallback() {}
	unregister(){}
	afterDisconnect(){}
}

customElements.get(Dialog.is) || window.customElements.define(Dialog.is, Dialog);