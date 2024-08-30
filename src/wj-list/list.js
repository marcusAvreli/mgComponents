import WJElement from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import {event } from "../wj-element/wj-element.js";


/**
 * @injectHTML
 */
export class List extends WJElement {
    constructor() {
        super();
    }

    static get className(){
		return "List";
	}

	static get is() {
		return `${elementPrefix}-list`;
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
	isSearchable (){
		return this.hasAttribute("searchable")
	}
	isPaginated (){
		return this.hasAttribute("paginated")
	}
	itemsPerPage (){
		return  this.getAttribute("itemsPerPage") || 5;
	}
	static get observedAttributes() {
		return [ 'searchable', 'disabled','refresh'];
	}
    draw(context, store, params) {
		this.selectedValues=[];
			
        let fragment = document.createDocumentFragment();
		
		let listGridWrapper = document.createElement("div");
		listGridWrapper.classList.add("list-grid-wrapper");
		this.appendChild(listGridWrapper);
		
		let wrapper = document.createElement("div");
		wrapper.classList.add("list-grid-container");
		listGridWrapper.appendChild(wrapper);
		let listContainer   = document.createElement("div");
		let listContainerBox1   = document.createElement("div");
		listContainerBox1.classList.add("list-container-box1");
		let listContainerSubBox1   = document.createElement("div");
		listContainerSubBox1.classList.add("list-container-sub-box1");
		listContainerBox1.appendChild(listContainerSubBox1);
		listContainer.appendChild(listContainerBox1);
		wrapper.appendChild(listContainer);
		listContainer.classList.add("list-container");
		
		//this.appendChild(wrapper);
		//let page = document.createElement("div");
		//page.classList.add("list-page");
	//	wrapper.appendChild(page);
		
		let element = document.createElement("slot");
		
		 //element.classList.add("contentsub");
		 listContainerSubBox1.appendChild(element);
		/*
		let box1 = document.createElement("div");
		box1.classList.add("list-box1");
		page.appendChild(box1);
		
	
		this.wrapper = wrapper;
		this.box1 = box1;
		//this.addSearchBar();
		this.addHorizontalScroll();
		this.addScrollableList();
		//this.addPaginatorPanel();
		
		
		
		
	
		
	
		
		let scrollbarPH = document.createElement("div");
		//scrollbarPH.classList.add("scroll-bar");
		//leftScroll.appendChild(scrollbarPH);
		
		let body2PH = document.createElement("div");
		body2PH.classList.add("body2");
		
		let listWrapperPH = document.createElement("div");
		listWrapperPH.classList.add("list-wrapper");
		
		body2PH.appendChild(listWrapperPH);
		
		
		
		
		//this.appendChild(wrapper);
		
		
		//this.body2PH=contentsub;
		//this.scrollbarPH = scrollbarPH;
		this.wrapper = wrapper;
		if(this.isPaginated() && this.isSearchable()){
			

			this.addSearchBar();
			this.addPaginatorPanel();
		

			this.style.setProperty("--wrapper-grid-template-areas", "'leftSearch leftSearch leftSearch' 'leftScroll leftScroll leftScroll' 'leftList leftList leftList' 'leftPaginator leftPaginator leftPaginator'");
			this.style.setProperty("--wrapper-grid-template-rows", "6% 1% 85% 8%");
			
			
		
		}
		if(!this.isPaginated() && this.isSearchable()){
				this.addSearchBar();
				
			this.style.setProperty("--wrapper-grid-template-areas", "'leftSearch leftSearch leftSearch' 'leftScroll leftScroll leftScroll' 'leftList leftList leftList'");
			this.style.setProperty("--wrapper-grid-template-rows", "6% 1% 93%");
	
		}
		
		 let element = document.createElement("slot");
		 //element.classList.add("contentsub");
		 this.contentsub.appendChild(element);
		
		if(this.isPaginated() && !this.isSearchable()){
				this.addPaginatorPanel();
			this.style.setProperty("--wrapper-grid-template-areas", "'leftScroll leftScroll leftScroll' 'leftList leftList leftList' 'leftPaginator leftPaginator leftPaginator'");
			this.style.setProperty("--wrapper-grid-template-rows", "1% 88% 11%");
		
		
		}
		
	*/
		fragment.appendChild(listGridWrapper);
        return fragment;
    }
	addScrollableList(){
		let wrapperList = document.createElement("div");
		wrapperList.classList.add("wrapper-list");
		let list = document.createElement("div");
		list.classList.add("list");
		
		let contentsub = document.createElement("div");
		contentsub.classList.add("contentsub");
		list.appendChild(contentsub);
		wrapperList.appendChild(list);
		this.box1.appendChild(wrapperList);
		
		contentsub.addEventListener('scroll',  ( e ) => this.progress(e));
		this.contentsub = contentsub;
		
	}
	addHorizontalScroll(){
		
		let wrapperScroll = document.createElement("div");
		let scroll = document.createElement("div");
		scroll.classList.add("scroll");
		let scrollBar = document.createElement("div");
		scrollBar.classList.add("scroll-bar");
		scroll.appendChild(scrollBar);
		wrapperScroll.appendChild(scroll);
		wrapperScroll.classList.add("wrapper-scroll");
		this.box1.appendChild(wrapperScroll);
	
		this.wrapperScroll=wrapperScroll;
		this.scrollBar = scrollBar;
	}
	addSearchBar(){
		let search = document.createElement("div");
		search.classList.add("search");
		this.box1.appendChild(search);

		let searchBar = document.createElement("wj-input");
		searchBar.setAttribute("variant", "standard");
		searchBar.setAttribute("type", "text");
		searchBar.setAttribute("placeholder", "Search");
		searchBar.value="";
		this.searchBar = searchBar;
		search.appendChild(searchBar);
		//searchBar.textContent="Search Bar";
		/*let searchPH = document.createElement("div");
		searchPH.classList.add("left-search");
		this.wrapper.appendChild(searchPH);
		
		const searchBar = document.createElement("wj-input");
		searchBar.setAttribute("variant", "standard");
		searchBar.setAttribute("type", "text");
		searchBar.setAttribute("placeholder", "Search");
		// searchBar.setAttribute("readonly", "");
		searchPH.appendChild(searchBar);
		
		
		*/
	}
	addPaginatorPanel(){
		let paginatorDiv  = document.createElement("div");
		paginatorDiv.classList.add("wrapper-paginator");
		this.box1.appendChild(paginatorDiv);

		const paginationBar = document.createElement("wj-paginator");
		paginatorDiv.appendChild(paginationBar);
		this.paginationBar = paginationBar;
		
	}
    afterDraw() {
		console.log("list","after_draw_start");
		if(this.isPaginated()){
			
			event.dispatchCustomEvent(this, "wj-paginator:reload");
			
			this.paginationBar.totalCount(this.children.length);
			this.paginationBar.take(this.itemsPerPage());
			this.paginationBar.items = this.children;
			this.paginationBar.showPage(0,this.itemsPerPage());
			
		}
		/*this.shadowRoot.addEventListener(`${elementPrefix}-selected-values`, ( e ) => this.selectedChange(e));
		*/
		
		/*
		this.body2PH.addEventListener('scroll', ( e ) => this.progress(e));
		*/
		if(this.isSearchable()){
		   this.searchBar.addEventListener('wj-input:input', ( e ) => this.filterOptions(e));
		}
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
		/*
		*/
		console.log("list","after_draw_finish");
    }
	
	
	progress(e){		
	
		const scroll = this.contentsub.scrollTop;
		const height = this.contentsub.scrollHeight - this.contentsub.clientHeight;
		const percent = (scroll / height) * 100;
		this.scrollBar.style.width = percent + "%";	
	}
	
	async filterOptions(e) {		
		const typedValue = e.detail.value;		
			
		for (var i = 0; i < this.children.length; i++) {
			const child = this.children[i];
				console.log("child:"+child);
				console.log("child:"+child.value);
			if (!child.value.toUpperCase().includes(typedValue.toUpperCase())) {
				if (child.classList.contains('wj-item-list')) {
					child.classList.remove('wj-item-list');
					child.classList.add('hide');
				
				} 
			}else{
				if (child.classList.contains('hide')) {
					child.classList.remove('hide');
					child.classList.add('wj-item-list');
				
				} 
			}
		}
		
		
	}
	
	addSelectedValues(e){
		if(!this.selectedValues.includes(e,0)){
			this.selectedValues.push(e);
		}	
	}
	
	getSelectedValues(){		
		return this.selectedValues;
	}
	
	attributeChangedCallback(name, oldValue, newValue) {		
		switch (name) {
			case 'searchable':
				this.updateSearchable(newValue);
				break;
			case 'refresh':
				if(this.isPaginated()){
					this.showhingUpdated(newValue);
				}
				break;    				
		}
	}
	updateSearchable(newValue) {
		console.log("list","update_searchable_called");
	}
	showhingUpdated(newValue){		
		this.removeAttribute("refresh");
		this.refreshPaginator();
		
	
	}
	refreshPaginator(){		
		if(this.paginationBar){
		  this.paginationBar.dispatchEvent(
            new CustomEvent("wj-paginator:reload", {
                bubbles: true,
                
            })
        );
		}
		
	}
	selectedChange(e){
	
		const selectedOption = e.detail.data;
		const action = e.detail.action;
		if(action=="add"){
			this.addSelectedValues(selectedOption);
		}else{
			if(action=="remove"){
				const removedIem = this.getSelectedValues().splice(selectedOption, 1);
			}
		}
	}
	afterDisconnect(){
		this.removeEventListener(`${elementPrefix}-selected-values`, this.selectedChange);
		this.removeEventListener("input", this.filterOptions);
	}
}


customElements.get(List.is) || window.customElements.define(List.is, List);

//thanks to
//https://github.com/Memeticode/psm.custom-elements/blob/e1dc368a2478f8f387af707e473a932c6ddb5572/elements/select-list-async/select-list-async.js#L169
//https://github.com/lencys/wj-elements/blob/301c9e8cac3ff68ed8eee78cde6526feb446dca4/packages/wj-item/item.js#L56