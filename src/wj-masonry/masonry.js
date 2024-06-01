import { default as WJElement, event } from "../wj-element/wj-element.js";
import { COL_COUNT_CSS_VAR_NAME, /*ColHeightMap,*/ debounce, DEFAULT_COLS, DEFAULT_DEBOUNCE_MS, DEFAULT_GAP_PX, DEFAULT_MAX_COL_WIDTH, ELEMENT_NODE_TYPE, findSmallestColIndex, GAP_CSS_VAR_NAME, getColCount, getNumberAttribute } from "./service/service.js";


import { bar, circle, flip, simple } from "../wj-toast/service/service.js";
import { Logger } from "sass";
import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Masonry extends WJElement {
    constructor() {
        super();
        
        this.debounceId = `layout_${Math.random()}`;
        this.ro = undefined;
        this.currentRequestAnimationFrameCallback = undefined;
        this.unsetSlot = undefined;
    }
    
    set maxColWidth (value) {
        this.setAttribute("max-col-width", value);
    }

    get maxColWidth () {
        return this.hasAttribute("max-col-width") ? +this.getAttribute("max-col-width") : +DEFAULT_MAX_COL_WIDTH;
    }
    
    set cols (value) {
        this.hasAttribute("cols") ? this.setAttribute("cols", value) : "auto";
    }

    get cols () {
        return getNumberAttribute(this, "cols", "auto");
    }
    
    set gap (value) {
        this.setAttribute("gap", value);
    }

    get gap () {
        return getNumberAttribute(this, "gap", "24");
    }
    
    set debounce (value) {
        this.setAttribute("debounce", value);
    }

    get debounce () {
        return getNumberAttribute(this, "debounce", DEFAULT_DEBOUNCE_MS);
    }

    get columns() {
        return Array.from(this.shadowRoot.querySelectorAll(`.column`));
    }

    debounceId = `layout_${Math.random()}`

    ro = undefined;

    static get is() {
		return `${elementPrefix}-masonry`;
	}
	static get className(){
		return "Masonry";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }

    static get observedAttributes () {
        return ["max-col-width", "gap", "cols"];
    }

    attributeChangedCallback(name, old, newName) {
        switch (name) {
            case "gap":
                this.style.setProperty(GAP_CSS_VAR_NAME, `${this.gap}px`);
                break;
        }

        this.scheduleLayout();
    }

    disconnectedCallback() {
        this.unsetSlot.removeEventListener("slotchange", this.onSlotChange)
        window.removeEventListener("resize", this.onResize)
        if (this.ro != null) {
            this.ro.unobserve(this)
        }
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.setAttribute("id", "unset-items");
        native.setAttribute("part", "native");

        let unsetSlot = document.createElement("slot");

        native.appendChild(unsetSlot);

        this.unsetSlot = unsetSlot;
        this.native = native;

        fragment.appendChild(native);

        return fragment;
    }

    afterDraw() {
        this.onSlotChange();
        this.onResize();
        this.layout();

        this.unsetSlot.addEventListener("slotchange", this.onSlotChange)

        if ("ResizeObserver" in window) {
            this.ro = new ResizeObserver(this.onResize);
            this.ro.observe(this);
        } else {
            window.addEventListener("resize", this.onResize);
        }
    }

    onSlotChange = () => {
        const $unsetElements = (this.unsetSlot.assignedNodes() || []).filter(node => node.nodeType === ELEMENT_NODE_TYPE);
        if ($unsetElements.length > 0) {
            this.layout();
        }
    }

    onResize = (entries) => {
        const { width } = entries != null && Array.isArray(entries) && entries.length > 0 ? entries[0].contentRect : { width: this.offsetWidth };
        const colCount = getColCount(width, this.cols, this.maxColWidth);

        if (colCount !== this.columns.length) {
            this.scheduleLayout();
        }
    }

    renderCols (colCount) {
        const columns = this.columns;

        if (columns.length === colCount) {
            return;
        }

        for (const column of columns) {
            column.parentNode && column.parentNode.removeChild(column);
        }

        for (let i = 0; i < colCount; i++) {
            const column = document.createElement("div");
            column.classList.add('column');
            column.setAttribute('part', `column column-${i}`);

            const slot = document.createElement("slot");
            slot.setAttribute('name', i);

            column.appendChild(slot);

            this.context.appendChild(column);
        }

        this.style.setProperty(COL_COUNT_CSS_VAR_NAME, colCount);
    }

    scheduleLayout (ms = this.debounce) {
        debounce(this.layout, ms, this.debounceId);
    }

    layout = () => {
        if (this.currentRequestAnimationFrameCallback != null) {
            window.cancelAnimationFrame(this.currentRequestAnimationFrameCallback);
        }

        this.currentRequestAnimationFrameCallback = requestAnimationFrame(() => {
            const gap = this.gap;
            const $elements = Array.from(this.children).filter(node => node.nodeType === ELEMENT_NODE_TYPE);
            const colCount = getColCount(this.offsetWidth, this.cols, this.maxColWidth);
            const colHeights = Array(colCount).fill(0);
            const writes = [];

            for (const elem of $elements) {
                const height = elem.getBoundingClientRect().height;
                let smallestColIndex = findSmallestColIndex(colHeights);

                colHeights[smallestColIndex] += height + +gap;

                const newSlot = smallestColIndex;

                if (elem.slot !== newSlot) {
                    writes.push(() => (elem.slot = newSlot));
                }
            }

            for (const write of writes) {
                write();
            }

            this.renderCols(colCount);
        });
    }
}

customElements.get(Masonry.is) || window.customElements.define(Masonry.is, Masonry);