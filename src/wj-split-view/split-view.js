import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { drag } from "./service/service.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class SplitView extends WJElement {
    constructor() {
        super();
    }

      static get is() {
		return `${elementPrefix}-split-view`;
	}
	static get className(){
		return "SplitView";
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

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.classList.add("native-split-view");

        let start = document.createElement("slot");
        start.setAttribute("name", "start");

        let end = document.createElement("slot");
        end.setAttribute("name", "end");

        let divider = document.createElement("slot");
        divider.setAttribute("name", "divider");

        let dividerElement = document.createElement("div");
        dividerElement.classList.add("wj-divider");
        dividerElement.setAttribute("part", "divider");
        dividerElement.appendChild(divider);
        dividerElement.addEventListener("mousedown", this.handleDrag, false);

        native.appendChild(start);
        native.appendChild(dividerElement);
        native.appendChild(end);

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw() {
        this.detectSize();

        if (this.min)
            this.style.setProperty("--wj-split-view-min", this.pixelsToPercentage(this.min) + "%");

        if (this.max)
            this.style.setProperty("--wj-split-view-max", 100 - this.pixelsToPercentage(this.max) + "%");

        if(this.initial) {
            this.style.setProperty("--wj-split-view-calc-a", this.pixelsToPercentage(this.initial) + "%");
            this.style.setProperty("--wj-split-view-calc-b", 100 - this.pixelsToPercentage(this.initial) + "%");
        }

        this.resizeObserver = new ResizeObserver(entries => this.handleResize(entries));
    }

    handleDrag = (e) => {
        if(this.hasAttribute("disabled"))
            return false;

        drag(this, {
            onMove: (x, y) => {
                let newPositionInPixels = this.hasAttribute("vertical") ? y : x;

                let sizeA = this.pixelsToPercentage(newPositionInPixels);
                let sizeB = 100 - this.pixelsToPercentage(newPositionInPixels);

                this.style.setProperty("--wj-split-view-calc-a", sizeA + "%");
                this.style.setProperty("--wj-split-view-calc-b", sizeB + "%");
            },
            initialEvent: e
        });
    }

    detectSize() {
        const { width, height } = this.getBoundingClientRect();
        this.size = this.hasAttribute("vertical") ? height : width;
    }

    percentageToPixels(value) {
        return this.size * (value / 100);
    }

    pixelsToPercentage(value) {
        return (value / this.size) * 100;
    }
	unregister(){}
}

customElements.get(SplitView.is) || window.customElements.define(SplitView.is, SplitView);