import { default as WJElement } from "../wj-element/wj-element.js";
import { Localizer } from "../utils/localize.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class RelativeTime extends WJElement {
    constructor() {
        super();
        this.localizer = new Localizer(this);
    }

    get dateISO() {
        let date = new Date();
        let inputDate = this.getAttribute("date");

        if(this.hasAttribute("date")) {
            if(this.isISODate(inputDate)) {
                inputDate = inputDate;
            } else {
                inputDate = +inputDate * 1000;
            }

            date = new Date(inputDate);
        }
        return date.toISOString();
    }

      static get is() {
		return `${elementPrefix}-relative-time`;
	}
	static get className(){
		return "RelativeTime";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes() {
        return [""];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let element = document.createElement("div");
        element.setAttribute("part", "native");
        element.classList.add("native-relative-time");
        element.innerText = this.getRelativeTimeString(this.dateISO);

        // let span = document.createElement("span");
        // span.innerText = this.localizer.formatDate(this.dateISO);
        //
        // element.appendChild(span);
        fragment.appendChild(element)

        return fragment;
    }

    getRelativeTimeString(date, lang = navigator.language) {
        let dateObj = new Date(date);
        const timeMs = dateObj.getTime();

        const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

        const cutoffs = [
            60,
            3600,
            86400,
            86400 * 7,
            86400 * 30,
            86400 * 365,
            Infinity
        ];

        const units = ["second", "minute", "hour", "day", "week", "month", "year"];
        const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
        const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

        return this.localizer.relativeTime(Math.floor(deltaSeconds / divisor), units[unitIndex],{ numeric: "auto" });
    }

    isISODate(str) {
        let regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\+\d{2}:\d{2}|Z)$/;
        return regex.test(str);
    }
}

customElements.get(RelativeTime.is) || window.customElements.define(RelativeTime.is, RelativeTime);