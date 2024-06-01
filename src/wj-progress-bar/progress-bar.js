import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class ProgressBar extends WJElement {
    constructor() {
        super();

        this.timerInterval = null;
        this.timeLimit = 60;
    }

    set radius(value) {
        this.setAttribute("radius", value);
    }

    get radius() {
        return +this.getAttribute("radius") || 70;
    }

    get diameter() {
        return this.radius * 2 + this.stroke;
    }

    set stroke(value) {
        this.setAttribute("stroke", value);
    }

    get stroke() {
        return +this.getAttribute("stroke") || 6;
    }

    get linecap() {
        return this.getAttribute("linecap") || "square";
    }

     static get is() {
		return `${elementPrefix}-progress-bar`;
	}
	static get className(){
		return "ProgressBar";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return ["progress"];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let xy = (this.radius + this.stroke/2);

        let fragment = document.createDocumentFragment();

        if(params.color)
            this.classList.add("wj-color-" + params.color, "wj-color");

        let element = document.createElement("div");
        element.classList.add("progress");

        let slot = document.createElement("slot");

        let slotWrapper = document.createElement("div");
        slotWrapper.classList.add("slot-wrapper");

        let slotStart = document.createElement("slot");
        slotStart.setAttribute("name", "start");

        let slotEnd = document.createElement("slot");
        slotEnd.setAttribute("name", "end");

        let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");

        let background;
        let bar;

        if(this?.type === "circle") {
            svg.setAttribute("width", this.diameter);
            svg.setAttribute("height", this.diameter);
            svg.setAttribute("viewBox", `0 0 ${this.diameter} ${this.diameter}`);
            svg.setAttribute("style", "transform: rotate(-90deg)");

            background = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            background.setAttribute("r", this.radius);
            background.setAttribute("cx", xy);
            background.setAttribute("cy", xy);
            background.setAttribute("fill", "transparent");

            bar = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            bar.setAttribute("r", this.radius);
            bar.setAttribute("cx", xy);
            bar.setAttribute("cy", xy);
            bar.setAttribute("fill", "transparent");
            bar.setAttribute("stroke-dasharray", "0");
            bar.setAttribute("stroke-dashoffset", "0");

            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "50%");
            text.setAttribute("y", "50%");
            text.innerHTML = this.progress + "%";

            svg.appendChild(text);
        } else {
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", this.stroke);
            svg.setAttribute("preserveAspectRatio", "none");

            background = document.createElementNS("http://www.w3.org/2000/svg", "line");
            background.setAttribute("x1", 0);
            background.setAttribute("y1", this.stroke / 2);
            background.setAttribute("x2", "100%");
            background.setAttribute("y2", this.stroke / 2);


            bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
            bar.setAttribute("x1", 0);
            bar.setAttribute("y1", this.stroke / 2);
            bar.setAttribute("x2", this.progress + "%");
            bar.setAttribute("y2", this.stroke / 2);
        }

        background.setAttribute("stroke", "#e0e0e0");
        background.setAttribute("stroke-linecap", this.linecap);
        background.setAttribute("stroke-width", this.stroke + "px");

        bar.setAttribute("stroke-linecap", this.linecap);
        bar.setAttribute("stroke-width", this.stroke + "px");
        bar.setAttribute("id", "bar");

        svg.appendChild(background);
        svg.appendChild(bar);

        slotWrapper.appendChild(slot);

        element.appendChild(slotStart);
        element.appendChild(slotWrapper);
        element.appendChild(svg);
        element.appendChild(slotEnd);

        fragment.appendChild(element);

        this.background = background;
        this.bar = bar;

        return fragment;
    }

    afterDraw(context, store, params) {
        if(this.type === "circle") {
            this.background.setAttribute("stroke-dasharray", this.getCircleDashoffset(100) + "px");
            this.background.setAttribute("stroke-dashoffset", "0px");
            this.bar.setAttribute("stroke-dasharray", this.getCircleDasharray(this.radius) + "px");
            this.bar.setAttribute("stroke-dashoffset", this.getCircleDashoffset(params.progress, this.radius) + "px");
        }
    }

    getCircleDasharray(radius = 70) {
        return 2 * Math.PI * radius;
    }

    getCircleDashoffset(progress = 0, radius) {
        return this.getCircleDasharray(radius) * ((100 - progress)/100);
    }
	unregister(){}
}

customElements.get(ProgressBar.is) || window.customElements.define(ProgressBar.is, ProgressBar);