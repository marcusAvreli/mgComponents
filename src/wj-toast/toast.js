import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { simple, bar, flip, circle } from "./service/service.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Toast extends WJElement {
    constructor() {
        super();
    }

    static get is() {
		return `${elementPrefix}-toast`;
	}
	static get className(){
		return "Toast";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let options = {
            message: "Záznam bol úspešne uložený.",
            // onClosed: function onClosed(),
            // onShown: function onShown(),
            position: this.position,
            showClose: true,
            style: this.design || "simple",
            timeout: this.duration || 4000,
            type: this.type || "success",
            title: this.title || "John Doe",
        }

        this.container = document.querySelector("body"); // 'body' recommended

        this.notification = document.createElement("div");
        this.notification.classList.add("pgn", "push-on-sidebar-open");

        // this.notification = $('<div class="pgn push-on-sidebar-open"></div>');
        // this.options = $.extend(true, {}, $.fn.pgNotification.defaults, options);

        // if (!this.container.find('.pgn-wrapper[data-position=' + options.position + ']').length) {

            this.classList.add("pgn-wrapper");
            this.setAttribute("data-position", options.position);

            // this.wrapper = $('<div class="pgn-wrapper" data-position="' + options.position + '"></div>');
            // this.container.append(this.wrapper);
        // } else {
        //     this.wrapper = $('.pgn-wrapper[data-position=' + options.position + ']');
        // }

        // this.alert = $('<div class="alert"></div>');
        this.alert = document.createElement("div");
        this.alert.classList.add("alert");
        this.alert.classList.add("alert-" + options.type);

        if (options.style == 'bar') {
            bar(this.notification, this.alert, options);
        } else if (options.style == 'flip') {
            flip(this.notification, this.alert, options);
        } else if (options.style == 'circle') {
            circle(this.notification, this.alert, options);
        } else if (options.style == 'simple') {
            simple(this.notification, this.alert, options);
        } else {
            simple(this.notification, this.alert, options);
        }

        this.notification.appendChild(this.alert);

        fragment.appendChild(this.notification);

        return fragment;
    }
	unregister(){}
}

customElements.get(Toast.is) || window.customElements.define(Toast.is, Toast);