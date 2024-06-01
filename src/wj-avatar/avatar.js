import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { getHsl, getInitials } from "../wj-animation/service/service.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Avatar extends WJElement {
    constructor() {
        super();
    }

  	static get is() {
		return `${elementPrefix}-avatar`;
	}
	static get className(){
		return "Avatar";
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
        let fragment = document.createDocumentFragment();

        let element = document.createElement("div");
        element.setAttribute("part", "native");
        element.classList.add("native-avatar");

        if(this.size)
            this.classList.add("wj-avatar-" + this.size);

        if(this.isImage()) {
            let slot = document.createElement("slot");

            element.appendChild(slot);
        } else {
            if(this.hasAttribute("initials")) {
                let initials = getInitials(this.label);

                this.setAttribute("style", `--wj-avatar-background-color: ${getHsl(initials)}`);
                element.innerText = initials;
            } else {
                let slotIcon = document.createElement("slot");
                slotIcon.setAttribute("name", "icon");

                element.appendChild(slotIcon);
            }
        }

        fragment.appendChild(element)

        return fragment;
    }

    isImage(){
        return this.getElementsByTagName("wj-img").length > 0;
    }
}

customElements.get(Avatar.is) || window.customElements.define(Avatar.is, Avatar);