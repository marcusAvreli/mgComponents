import { default as WJElement, event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
/**
 * @injectHTML
 */
export class Carousel extends WJElement {
    constructor() {
        super();

      //  this.activeSlide = 0;
      //  this.slidePerPage = 1;
		console.log("Carousel","constructor");
        // this.loop = false;
    }

    set activeSlide(value) {
        this.setAttribute("active-slide", value);
    }

    get activeSlide() {
        return +this.getAttribute("active-slide") || 0;
    }

    get pagination() {
        return this.hasAttribute("pagination");
    }

    get navigation() {
        return this.hasAttribute("navigation");
    }

    get thumbnails() {
        return this.hasAttribute("thumbnails");
    }

    get loop() {
        return this.hasAttribute("loop");
    }

    static get is() {
		return `${elementPrefix}-carousel`;
	}
	static get className(){
		return "Carousel";
	}
   	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}

    static get cssStyleSheet() {
        return this.styles;
    }
    static get observedAttributes() {
        return ["active-slide"];
    }

    attributeChangedCallback(name, old, newName) {
        if (name === "active-slide") {
            if(this.pagination)
                this.changePagination();

            if(this.thumbnails)
                this.changeThumbnails();
        }
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
		console.log("Carousel","draw_start");
        let fragment = document.createDocumentFragment();

        let native = document.createElement("div");
        native.classList.add("native-carousel");

        let slides = document.createElement("div");
        slides.classList.add("carousel-slides");

        let slot = document.createElement("slot");

        slides.appendChild(slot);
        native.appendChild(slides);

        if(this.navigation) {
            native.appendChild(this.createPreviousButton());
            native.appendChild(this.createNextButton());
        }

        if(this.pagination)
            native.appendChild(this.createPagination());

        if(this.thumbnails)
            native.appendChild(this.createThumbnails());

        fragment.appendChild(native);

        this.slides = slides;

        this.cloneFirstAndLastItems();
console.log("Carousel","draw_finish");
        return fragment;
    }

    setIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.entriesMap.set(entry.target, entry);
            });
        }, {
            root: this.context.querySelector('.carousel-slides'),
            threshold: 0.5
        });

        this.entriesMap = new Map();
        this.records = this.intersectionObserver.takeRecords();
        this.records.forEach(entry => {
            this.entriesMap.set(entry.target, entry);
        });
    }

    afterDraw() {
		console.log("Carousel","after_draw_start");
        this.setIntersectionObserver();
        this.getSlidesWithClones().forEach((slide, i) => {
            this.intersectionObserver.observe(slide);
        });

        this.slidePerPage = this.getAttribute("slide-per-page") || 1;
        let carouselSize = 100 / +this.slidePerPage;
        this.style.setProperty("--wj-carousel-size", carouselSize + "%");

        this.goToSlide(this.activeSlide, "auto");

        this.slides.addEventListener("scrollend", (e) => {

            const slides = this.getSlides();
            const entries = [...this.entriesMap.values()];
            const visibleEntries = entries.find(entry => entry.isIntersecting);

            if (visibleEntries?.target.classList.contains("clone")) {
                const cloneIndex = visibleEntries.target.getAttribute("clone-index");
                this.activeSlide = cloneIndex;
                this.goToSlide(+cloneIndex, "auto");
            }
            else if (visibleEntries) {
                let slideIndex = slides.indexOf(visibleEntries.target);
                this.activeSlide = slideIndex;
            }
        });
		console.log("Carousel","after_draw_finish");
    }

    goToSlide(index, behavior = "smooth", next = true) {
        const slides = this.getSlides();
        const slideWithClones = this.getSlidesWithClones();

        // remove active class from all slides
        slideWithClones.forEach((slide, i) => {
            slide.classList.remove("active");
        });

        let newActiveSlide = this.loop ? (index + slides.length) % slides.length : Math.min(Math.max(index, 0), slides.length - 1);
        this.activeSlide = newActiveSlide;

        const nextSlideIndex = Math.min(Math.max(index + (this.loop ? this.slidePerPage : 0), 0), slideWithClones.length - 1);
        const nextSlideEl = this.getSlidesWithClones()[nextSlideIndex];
        nextSlideEl.classList.add("active");

        let nextSlideRect = nextSlideEl.getBoundingClientRect();
        let slidesContainerRect = this.slides.getBoundingClientRect();

        this.slides.scrollTo({
            left: nextSlideRect.left - slidesContainerRect.left + this.slides.scrollLeft,
            top: nextSlideRect.top - slidesContainerRect.top + this.slides.scrollTop,
            behavior: behavior === "smooth" ? "smooth" : "auto"
        })
    }

    cloneFirstAndLastItems() {
        const items = this.getSlides();
        if (items.length && this.loop) {
            // Klonování prvního položky a přidání na konec
            const firstItemClone = items[0].cloneNode(true);
            firstItemClone.classList.add("clone");
            firstItemClone.setAttribute("clone-index", 0);

            this.appendChild(firstItemClone);

            // Klonování posledního položky a přidání na začátek
            const lastItemClone = items[items.length - 1].cloneNode(true);
            lastItemClone.classList.add("clone");
            lastItemClone.setAttribute("clone-index", items.length - 1);

            this.insertBefore(lastItemClone, this.firstChild);
        }
    }

    removeActiveSlide() {
        this.getSlidesWithClones().forEach((slide, i) => {
            slide.classList.remove("active");
        });

        if(this.pagination) {
            this.context.querySelectorAll(".pagination-item").forEach((item) => {
                item.classList.remove("active");
            });
        }

        if(this.thumbnails) {
            this.context.querySelectorAll("wj-thumbnail").forEach((item) => {
                item.classList.remove("active");
            });
        }
    }

    changePagination() {
        if(this.pagination) {
            this.removeActiveSlide();
            this.context.querySelectorAll(".pagination-item").forEach((item, i) => {
                if(i === this.activeSlide) {
                    item.classList.add("active");
                }
            });
        }
    }

    changeThumbnails() {
        if(this.thumbnails) {
            this.removeActiveSlide();
            this.context.querySelectorAll("wj-thumbnail").forEach((item, i) => {
                if(i === this.activeSlide) {
                    item.classList.add("active");
                }
            });
        }
    }

    createNextButton() {
        const nextButton = document.createElement("wj-button");
        nextButton.classList.add("next");
        nextButton.innerHTML = '<wj-icon name="chevron-right" size="large"></wj-icon';
        nextButton.setAttribute("circle", "");
        nextButton.setAttribute("fill", "link");
        nextButton.addEventListener("click", (e) => {
            this.nextSlide();
        });

        return nextButton;
    }

    createPreviousButton() {
        const previousButton = document.createElement("wj-button");
        previousButton.classList.add("prev");
        previousButton.innerHTML = '<wj-icon name="chevron-left" size="large"></wj-icon';
        previousButton.setAttribute("circle", "");
        previousButton.setAttribute("fill", "link");
        previousButton.addEventListener("click", (e) => {
            this.previousSlide();
        });

        return previousButton;
    }

    createPagination() {
        const pagination = document.createElement("div");
        pagination.classList.add("pagination");

        const slides = this.getSlides();
        slides.forEach((slide, i) => {
            const paginationItem = document.createElement("div");
            paginationItem.classList.add("pagination-item");
            paginationItem.addEventListener("click", (e) => {
                this.removeActiveSlide();
                e.target.classList.add("active");
                this.goToSlide(i);
            });
            pagination.appendChild(paginationItem);
        });

        return pagination;
    }

    createThumbnails() {
        const thumbnails = document.createElement("div");
        thumbnails.classList.add("thumbnails");

        const slides = this.getSlides();
        slides.forEach((slide, i) => {
            const thumbnail = document.createElement("wj-thumbnail");
            thumbnail.innerHTML = `<img src="${slide.querySelector("wj-img").getAttribute("src")}"></img>`;
            thumbnail.addEventListener("click", (e) => {
                this.removeActiveSlide();
                e.target.closest("wj-thumbnail").classList.add("active");
                this.goToSlide(i);
            });
            thumbnails.appendChild(thumbnail);
        });

        return thumbnails;
    }

    nextSlide() {
        this.goToSlide(this.activeSlide + this.slidePerPage);
    }

    previousSlide() {
        this.goToSlide(this.activeSlide - this.slidePerPage);
    }

    getSlides() {
        return Array.from(this.querySelectorAll("wj-carousel-item:not(.clone)"));
    }

    getSlidesWithClones() {
        return Array.from(this.querySelectorAll("wj-carousel-item"));
    }

    canGoNext() {
        return this.querySelector(".native-carousel").scrollLeft < this.querySelector(".native-carousel").scrollWidth;
    }

    canGoPrevious() {
        return this.querySelector(".native-carousel").scrollLeft > 0;
    }
		unregister(){}
}

customElements.get(Carousel.is) || window.customElements.define(Carousel.is, Carousel);