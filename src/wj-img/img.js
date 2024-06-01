import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';

/**
 * @injectHTML
 */
export class Img extends WJElement {
    constructor() {
        super();
    }

  static get is() {
		return `${elementPrefix}-img`;
	}
	static get className(){
		return "Img";
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

        let img = document.createElement("img");
        img.setAttribute("src", "./assets/img/image-loader.gif");
        img.classList.add("lazy-loaded-image", "lazy");
        img.setAttribute("alt", this.alt || "");

        this.img = img;
        fragment.appendChild(img);

        return fragment;
    }

    afterDraw(context, store, params) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.src = this.src;
                    this.classList.remove("lazy");
                    lazyImageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImageObserver.observe(this.img);
    }
}

customElements.get(Img.is) || window.customElements.define(Img.is, Img);