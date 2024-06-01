import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class InfiniteScroll extends WJElement {
    constructor(options = {}) {
        super();

        this.totalPages = 0;
        this.isLoading = [];

        String.prototype.interpolate = function(params) {
            let template = this;
            let keys = template.match(/\{{.*?\}}/g);

            if(keys) {
                for (let key of keys) {
                    let cleanKey = key.replace('{{', '').replace('}}', '');
                    let val = '';

                    cleanKey.split('.').forEach(k => {
                        val = (val == '') ?  params[k] : val[k];
                    });

                    template = template.replace(key, val);
                }
            }
            return template;
        };
    }

   static get is() {
		return `${elementPrefix}-infinite-scroll`;
	}
	static get className(){
		return "InfiniteScroll";
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

    beforeDraw(context, store, params) {
        this.iterate = this.querySelector("[iterate]");
        this.infiniteScrollTemplate = this.iterate.outerHTML;
        this.iterate.remove(); // remove template

        this.setAttribute("style", "height: " + this.height);
    }

    draw(context, store, params) {
        let fragment = document.createDocumentFragment();

        let slot = document.createElement("slot");

        let loader = document.createElement("div");
        loader.classList.add("loader");

        fragment.appendChild(loader);
        fragment.appendChild(slot);

        this.loaderEl = loader;

        return fragment;
    }

    async afterDraw() {
        this.queryParams = this.queryParams || '';
        this.size = +this.size || 10;
        this.currentPage = 0;

        this.scrollEvent();
        await this.loadPages(this.currentPage);
    }

    scrollEvent = () => {
        this.addEventListener("scroll", this.onScroll);
    }

    unScrollEvent = () => {
        this.removeEventListener("scroll", this.onScroll);
    }

    onScroll = (e)=> {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        if (scrollTop + clientHeight >= scrollHeight - 300 && this.currentPage <= this.totalPages && this.isLoading.includes(this.currentPage)) {
            this.currentPage++;
            this.loadPages(this.currentPage);
        }
    }

    /** @function getPages
     * @description nacitanie dalsej stranky
     * @return response json
     */

    async getPages(page){
        let hasParams = this.url.includes('?');
        const response = await fetch(`${this.url}${hasParams ? '&' : '?'}page=${page}&size=${this.size}${this?.queryParams}`);
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    hideLoader(){
        this.loaderEl.classList.remove('show');
    }

    showLoader(){
        this.loaderEl.classList.add('show');
    }

    hasMorePages(page){
        return this.totalPages === 0 || page <= this.totalPages;
    }

    /** @function getPages
     * @description methoda zavola getPages a nasledne sa vykona callback funkcia draw. Ako a kde sa nieco vykresli sa deje v inicializacii lib-ky
     * @return response json
     */

    async loadPages (page){
        this.showLoader();
        try {
            if (this.hasMorePages(page) || typeof this.setCustomData === "function") {

                let result;
                let response;

                if (typeof this.setCustomData === "function") {
                    response = await this.setCustomData(page);
                } else {
                    response = await this.getPages(page);
                }

                this.totalPages = response.totalPages;
                this.currentPage = page;

                const parser = new DOMParser();

                let placement = this;

                // ak existuje attribut "container" tak sa vyhlada element
                if(this.hasAttribute("placement"))
                    placement = this.querySelector(this.placement);

                response.data.forEach((item) => {
                    const interpolateItem = this.infiniteScrollTemplate.interpolate(item);
                    const doc = parser.parseFromString(interpolateItem, 'text/html');
                    const element = doc.querySelector(this.iterate.tagName.toLowerCase()); //doc.querySelector(".icon-item");

                    event.addListener(element, "click", "wj-infinite-scroll:click-item", null, { stopPropagation: true });


                    placement.insertAdjacentElement("beforeend", element);
                });



                this.isLoading.push(page);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            this.hideLoader();
        }
    };
}

customElements.get(InfiniteScroll.is) || window.customElements.define(InfiniteScroll.is, InfiniteScroll);