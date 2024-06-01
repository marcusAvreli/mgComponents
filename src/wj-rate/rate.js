import { default as WJElement, event } from "../wj-element/wj-element.js";


import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Rate extends WJElement {
    constructor() {
        super();
    }

    set precision(value) {
        this.setAttribute("precision", value);
    }

    get precision() {
        return this.hasAttribute("precision") ? +this.getAttribute("precision") : 1;
    }

    set max(value) {
        this.setAttribute("max", value);
    }

    get max() {
        return this.hasAttribute("icons") ? this.icons.length : +this.getAttribute("max");
    }

    set icons(value) {
        return value;
    }

    get icons() {
        return this.hasAttribute("icons") ? JSON.parse(this.getAttribute("icons").replace(/'/g, '\"')) : ['star-filled'];
    }

    set value(value) {
        this.setAttribute("value", value);
    }

    get value() {
        return this.hasAttribute("value") ? +this.getAttribute("value") : 0;
    }

     static get is() {
		return `${elementPrefix}-rate`;
	}
	static get className(){
		return "Rate";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }


    static get observedAttributes() {
        return ["is-hover"];
    }

    attributeChangedCallback(name, old, newName) {
        if(name === "is-hover") {
            // this.draw();
        }
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.setAttribute("part", "native");
        native.classList.add("native-rate");

        this.native = native;

        if(this.hasAttribute("icons")) {
            let icons = this.icons;
            for(let i = 0; i < icons.length; i++) {
                native.appendChild(this.createIcons(i));
            }
        } else {
            for(let i = 0; i < this.max; i++) {
                native.appendChild(this.createIcons(i));
            }
        }

        this.changeRate();

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw() {
        if(this.hasAttribute('disabled') || this.hasAttribute('readonly')) {
            return;
        }

        this.addEventListener("mouseenter", this.onMouseEnter);
        this.addEventListener("mouseleave", this.onMouseLeave);
        this.addEventListener("mousemove", this.onMouseMove);
        this.addEventListener("touchstart", this.onTouchStart);
        this.addEventListener("touchend", this.onTouchEnd);
        this.addEventListener("touchmove", this.onTouchMove);
        this.addEventListener("click", this.onClick);
    }

    createIcons(i) {
        let div = document.createElement("div");
        div.classList.add("wj-rate-icon");

        let icon = this.getIcons(i);

        div.appendChild(icon);

        if(this.value > i  && this.value < i + 1) {
            let clone = icon.cloneNode(true);
            div.appendChild(clone);
        }

        return div;
    }
    changeRate() {
        const icons = this.native.children;
        const rateValue = this.value !== this.hoverValue && this.hoverValue !== 0 && this.hoverValue !== undefined ? this.hoverValue : this.value;

        for(let i = 0; i < icons.length; i++) {
            icons[i].classList.remove("selected", "hovered");

            if(icons[i].children.length > 1) {
                icons[i].classList.remove("half");
                icons[i].querySelector("wj-icon:first-child").removeAttribute("style");
                icons[i].querySelector("wj-icon:last-child").remove();
            }

            if (i < rateValue) {
                icons[i].classList.add("selected");
            }
            if (rateValue > i  && rateValue < i + 1 && icons[i].children.length === 1) {
                let clone = icons[i].querySelector("wj-icon").cloneNode(true);
                icons[i].appendChild(clone);
                let percent = (rateValue - i) * 100;

                icons[i].classList.add("half");
                icons[i].querySelector("wj-icon:first-child").style.clipPath = `inset(0 0 0 ${percent}%)`;
                icons[i].querySelector("wj-icon:last-child").style.clipPath = `inset(0 ${percent}% 0 0)`;
            }
        }
    }

    /*
     * Events - Mouse
     */
    onMouseEnter = (e) => {
        e.preventDefault();

        this.hoverValue = this.getValueFromXPosition(e.clientX);
        this.changeRate();
    }

    onMouseLeave = (e) => {
        e.preventDefault();

        this.hoverValue = 0;
        this.changeRate();
    }

    onMouseMove = (e) => {
        e.preventDefault();

        let newValue = this.getValueFromXPosition(e.clientX);
        if(newValue != this.hoverValue) {
            this.hoverValue = newValue;
            this.changeRate();
        }
    }

    /*
     * Events - Touch
     */
    onTouchStart = (e) => {
        e.preventDefault();

        this.hoverValue = this.getValueFromXPosition(e.touches[0].clientX);
        this.changeRate();
    }

    onTouchEnd = (e) => {
        e.preventDefault();

        this.hoverValue = 0;
        this.changeRate();
    }

    onTouchMove = (e) => {
        e.preventDefault();

        this.hoverValue = this.getValueFromXPosition(e.touches[0].clientX);
        this.changeRate();
    }

    onClick = (e) => {
        e.preventDefault();

        this.value = +this.hoverValue;
    }

    getIcons(index) {
        let icon = document.createElement("wj-icon");
        icon.setAttribute("name", this.max ? this.icons[0] : this.icons[index]);
        return icon;
    }

    getValueFromXPosition(coordinate) {
        const { left, right, width } = this.native.getBoundingClientRect();
        const value = this.roundToPrecision(((coordinate - left) / width) * this.max, this.precision);

        return Math.min(Math.max(value, 0), this.max);
    }

    roundToPrecision(numberToRound, precision = 0.5) {
        const multiplier = 1 / precision;
        return Math.ceil(numberToRound * multiplier) / multiplier;
    }
	unregister(){}
}

customElements.get(Rate.is) || window.customElements.define(Rate.is, Rate);