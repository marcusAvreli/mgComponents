import { default as WJElement, event } from "../wj-element/wj-element.js";
import { copyNode, copyText } from "./service/service.js";
import { Input } from "../wj-input/input.js";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class CopyButton extends WJElement {
    constructor() {
        super();

        this.timeout = 1000;
    }

    set value(value) {
        this.setAttribute("value", value)
    }

    get value() {
      return this.getAttribute("value") || ""
    }

    static get is() {
		return `${elementPrefix}-copy-button`;
	}
	static get className(){
		return "CopyButton";
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

    draw() {
        let fragment = document.createDocumentFragment();

        let tooltip = document.createElement("wj-tooltip");
        tooltip.setAttribute("offset", "5");
        tooltip.setAttribute("content", this.label || "Copy");

        let icon = document.createElement("wj-icon");
        icon.setAttribute("name", "clipboard");

        tooltip.appendChild(icon);

        fragment.appendChild(tooltip);

        this.tooltip = tooltip;
        this.icon = icon;

        return fragment;
    }

    afterDraw() {
        event.addListener(this,"click", null, this.clicked);
        event.addListener(this,"focus", null, this.focused);
        event.addListener(this,"blur", null, this.blurred);

        event.addListener(this,"wj:copy-button", null, this.copied);
    }

    clicked = (e) => {
        const button = e.currentTarget
        if (button instanceof HTMLElement) {
            this.copy(button)
        }
    }

    keydown = (e) => {
        if (e.key === " " || e.key === "Enter") {
            const button = e.currentTarget
            if (button instanceof HTMLElement) {
                this.copy(button);
            }
        }
    }

    focused = (e) => {
        e.currentTarget.addEventListener("keydown", this.keydown)
    }

    blurred = (e) => {
        e.currentTarget.removeEventListener("keydown", this.keydown)
    }

    copied = (e) => {
        this.icon.setAttribute("color", "success");
        this.icon.setAttribute("name", "check");
        this.tooltip.setAttribute("content", this.labelSuccess || "Copied");

        setTimeout(() => {
            this.icon.removeAttribute("color");
            this.icon.setAttribute("name", "clipboard");
            this.tooltip.setAttribute("content", this.label || "Copy");
        }, this.timeout);
    }

    async copy(button) {
        const id = this.getAttribute("for");
        const text = this.getAttribute("value");

        if (button.getAttribute("aria-disabled") === "true") {
            return
        }

        if (text) {
          await copyText(text);
          event.dispatchCustomEvent(this, "wj:copy-button");
        } else if (id) {
            const root = "getRootNode" in Element.prototype ? button.getRootNode() : button.ownerDocument
            if (!(root instanceof Document || ("ShadowRoot" in window && root instanceof ShadowRoot)))
              return

            const node = root.getElementById(id);
            if (node) {
              await this.copyTarget(node);
              event.dispatchCustomEvent(this, "wj:copy-button");
          }
        }
    }

    copyTarget(content) {
        if (content instanceof HTMLInputElement || content instanceof HTMLTextAreaElement || content instanceof Input) {
          return copyText(content.value);
        } else if (content instanceof HTMLAnchorElement && content.hasAttribute("href")) {
          return copyText(content.href);
        } else {
          return copyNode(content);
        }
    }
	unregister(){}
}

customElements.get(CopyButton.is) || window.customElements.define(CopyButton.is, CopyButton);