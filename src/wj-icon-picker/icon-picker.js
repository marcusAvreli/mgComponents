import { default as WJElement, event } from "../wj-element/wj-element.js";
import { InfiniteScroll } from "../wj-infinite-scroll/infinite-scroll.js";
import { Tooltip } from "../wj-tooltip/tooltip.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class IconPicker extends WJElement {
    constructor() {
        super();

        this.size = 48;
    }

    set markerPosition(value) {
        this._markerPosition = value;
    }

    get markerPosition() {
        return this._markerPosition;
    }

    set swatches(value) {
        this.setAttribute("swatches", value.split(","));
    }

    get swatches() {

        return this._swatches;
    }

     static get is() {
		return `${elementPrefix}-icon-picker`;
	}
	static get className(){
		return "IconPicker";
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

    async beforeDraw() {
        this.tags =  Object.values(await this.getTags());
        this.category = this.getCategory(this.tags);
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.classList.add("native-color-picker");

        // ANCHOR
        let anchor = document.createElement("div");
        anchor.setAttribute("slot", "anchor");
        anchor.classList.add("anchor");

        // PICKER
        let picker = document.createElement("div");
        picker.classList.add("picker");

        // let select = document.createElement("wj-select");
        // select.setAttribute("placeholder", "Category");
        // select.setAttribute("variant", "standard");
        // select.setAttribute("max-options", "1");
        // select.setAttribute("variant", "standard");
        // select.setAttribute("max-height", "180px");
        // select.setAttribute("clearable", "");
        // this.createOptions(select);

        let input = document.createElement("wj-input");
        input.classList.add("input");
        input.setAttribute("variant", "standard");
        input.setAttribute("placeholder", "type to filter...");
        input.setAttribute("clearable", "");
        input.addEventListener("wj-input:input", this.searchIcon);


        let infiniteScroll = new InfiniteScroll();

        infiniteScroll.setAttribute("url", "/demo/assets/data/tags.json");
        infiniteScroll.setAttribute("placement", ".icon-items");
        infiniteScroll.setAttribute("size", this.size);
        infiniteScroll.setAttribute("height", "223px");
        infiniteScroll.innerHTML = `<div class="icon-items">
            <div class="icon-item" iterate>
                <wj-tooltip content="{{name}}">
                    <wj-icon name="{{name}}" size="large"></wj-icon>
                </wj-tooltip>
            </div>
        </div>`;

        // APPEND
        // picker.appendChild(select);
        picker.appendChild(input);

        picker.appendChild(infiniteScroll);

        // POPUP
        let popup = document.createElement("wj-popup");
        popup.setAttribute("placement", this.placement || "bottom-start");
        popup.setAttribute("offset", this.offset);
        popup.setAttribute("manual", "");
        popup.appendChild(anchor);
        popup.appendChild(picker);

        native.appendChild(popup);

        fragment.appendChild(native);

        this.popup = popup;
        this.input = input;
        this.anchor = anchor;
        this.picker = picker;
        this.infiniteScroll = infiniteScroll;

        return fragment;
    }

    afterDraw() {
        this.setupInfiniteScroll();
        this.addEventListener("wj-popup:show", (e) => {
            this.initial();
        });

        // udalost po vymazani inputu
        this.addEventListener("wj-input:clear", (e) => {
            this.setupInfiniteScroll(); // reset infinite scroll
            this.clearIconsContainer(); // clear icons container
            this.infiniteScroll.scrollEvent(); // bind scroll event
            this.infiniteScroll.loadPages(0); // load first page
        });


        this.addEventListener("wj-infinite-scroll:click-item", (e) => {
            const icon = e.detail.context.querySelector("wj-icon");
            const name = icon.getAttribute("name");
            const object = this.tags.find(i => i.name === name);
            const iconElement = document.createElement("wj-icon");
            iconElement.setAttribute("name", name);

            object.icon = iconElement;

            this.value = object;

            this.anchor.innerHTML = "";
            this.anchor.appendChild(iconElement);

            event.dispatchCustomEvent(this, "wj-icon-picker:select", object); // odpalenie custom eventu
        });

        this.init = false;
    }

    initial() {
        this.infiniteScroll.scrollEvent();
    }

    setupInfiniteScroll() {
        this.infiniteScroll.setCustomData = (page = 0) => {

            let data = Object.values(this.tags);
            let result = {
                data: data.slice(page * this.size, page * this.size + this.size),
                page: page,
                size: this.size,
                totalPages: Math.round(data.length / this.size)
            }
            return result;
        };
    }

    createIconItem(i) {
        let item = document.createElement("div");
        item.classList.add("icon-item");
        // item.innerText = i.name;

        let icon = document.createElement("wj-icon");
        icon.setAttribute("name", i.name);
        icon.classList.add("lazy-loaded-image", "lazy");

        item.appendChild(icon);

        return item;
    }

    createOption(item) {
        let option = document.createElement("wj-option");
        option.setAttribute("value", item);
        option.innerText = item;

        return option;
    }

    getCategory(tags) {
        let category = [...new Set(tags.map(obj => obj.category))];
        return category;
    }

    async getTags() {
        const response = await fetch(`/demo/assets/data/tags.json`);
        return response.json();
    }

    disconnectedCallback() {
        this.init = false;
    }

    /*
    * @description event handler pre vyhladavanie ikon
    * @param e
     */
    searchIcon = (e) => {
        this.infiniteScroll.unScrollEvent(); // unbind scroll event
        this.infiniteScroll.setCustomData = (page = 0) => {
            let data = this.tags.filter(i => i.tags.includes(e.detail.value));
            let result = {
                data: data,
                page: page,
                size: this.size,
                totalPages: Math.round(data.length / this.size)
            }

            return result;
        };

        this.clearIconsContainer(); // clear icons container
        this.infiniteScroll.loadPages(); // load only
    }

    /*
    * @description vymazanie ikon z kontajnera
     */
    clearIconsContainer() {
        this.context.querySelector(".icon-items").innerHTML = "";
    }

    onClose = () => {
        this.popup.onHide();
    }
}

customElements.get(IconPicker.is) || window.customElements.define(IconPicker.is, IconPicker);