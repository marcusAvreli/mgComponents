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
		
		let wrapper = document.createElement("div");
		wrapper.classList.add("page2");
		
/*
		let mainGridWrapper = document.createElement("div");
		mainGridWrapper.classList.add("main-grid-wrapper");
		wrapper.appendChild(mainGridWrapper);


			let mainGrid = document.createElement("div");
		mainGrid.classList.add("main-grid");
		mainGridWrapper.appendChild(mainGrid);
		*/
		
		let leftScroll = document.createElement("div");
		leftScroll.classList.add("scroll");
		wrapper.appendChild(leftScroll);
		
		
			let areaWrapper = document.createElement("div");
		areaWrapper.classList.add("area-wrapper");
		wrapper.appendChild(areaWrapper);
		
		/*
		let listWrapper = document.createElement("div");
		listWrapper.classList.add("list-wrapper");
		areaWrapper.appendChild(listWrapper);
		*/
		let contentsub = document.createElement("div");
		contentsub.classList.add("contentsub");
		areaWrapper.appendChild(contentsub);
		
		
		
		///contentsub
		
		//not shadowed
		//this.shadowRoot.appendChild(searchPH);
		
		//let wrapper = document.createElement("div");
		//wrapper.classList.add("left-page-wrapper");
		//let wrapper = document.createElement("div");
		/*
		wrapper.classList.add("wrapper2");
		
	
		
	
		
		let statusPH = document.createElement("div");
		statusPH.classList.add("footer2");
		statusPH.textContent="status";
		*/
		
		let scrollbarPH = document.createElement("div");
		scrollbarPH.classList.add("scroll-bar");
		leftScroll.appendChild(scrollbarPH);
		/*
		let body2PH = document.createElement("div");
		body2PH.classList.add("body2");
		
		let listWrapperPH = document.createElement("div");
		listWrapperPH.classList.add("list-wrapper");
		
		body2PH.appendChild(listWrapperPH);
		
		*/
		
		
		//this.appendChild(wrapper);
		
		
		this.body2PH=contentsub;
		this.scrollbarPH = scrollbarPH;
		this.wrapper = wrapper;
		if(this.isPaginated() && this.isSearchable()){
			

			this.addSearchBar();
			this.addPaginator();
		

			this.style.setProperty("--wrapper-grid-template-areas", "'leftSearch leftSearch leftSearch' 'leftScroll leftScroll leftScroll' 'leftList leftList leftList' 'leftPaginator leftPaginator leftPaginator'");
			this.style.setProperty("--wrapper-grid-template-rows", "6% 1% 82% 11%");
			
			
		
		}
		if(!this.isPaginated() && this.isSearchable()){
				this.addSearchBar();
				
				this.style.setProperty("--wrapper-grid-template-areas", "'leftSearch leftSearch leftSearch' 'leftScroll leftScroll leftScroll' 'leftList leftList leftList'");
			this.style.setProperty("--wrapper-grid-template-rows", "6% 1% 93%");
		/*
			let searchPH = document.createElement("div");
			searchPH.classList.add("left-search");
			wrapper.appendChild(searchPH);
			this.style.setProperty("--wrapper-grid-template-areas", "'leftSearch leftSearch leftSearch' 'leftScroll leftScroll leftScroll' 'leftList leftList leftList' ");
			this.style.setProperty("--wrapper-grid-template-rows", "6% 1% 93%");
			*/
			// Wrapper
			//let searchPH = document.createElement("div");
			//searchPH.classList.add("footer2");
			//let native = document.createElement("div");
		//	native.setAttribute("part", "native");
		//	native.classList.add("native-input-file", this.variant || "default");
			
			//searchPH.appendChild(searchBar);
			//fragment.appendChild(native);
			//wrapper.appendChild(searchPH);
			
			//this.searchBar = searchBar;
		}
		
		 let element = document.createElement("slot");
		 //element.classList.add("contentsub");
		 contentsub.appendChild(element);
		/*
		wrapper.appendChild(scrollPH);
		
       
		//element.classList.add("wrapper2");
		listWrapperPH.appendChild(element);
		body2PH.appendChild(listWrapperPH);
		
		wrapper.appendChild(body2PH);
		*/
		//wrapper.appendChild(statusPH);
		
		/*
		//container.appendChild(element);
		*/
		//leftList.appendChild(element);
	//	contentsub.appendChild(element);
	
		//fragment.appendChild(container);
		// fragment.appendChild(slotEnd);
		if(this.isPaginated() && !this.isSearchable()){
				this.addPaginator();
			this.style.setProperty("--wrapper-grid-template-areas", "'leftScroll leftScroll leftScroll' 'leftList leftList leftList' 'leftPaginator leftPaginator leftPaginator'");
			this.style.setProperty("--wrapper-grid-template-rows", "1% 88% 11%");
			//this.classList.add("container");
				//wrapper.appendChild(actionsPH);
				/*	let actionsPH = document.createElement("div");
		actionsPH.classList.add("footer3");
			console.log("list","paginated");
			const numberofItems = this.itemsPerPage();
			console.log("list","numberofItems:"+numberofItems);
			let native = document.createElement("div");
			native.setAttribute("part", "native");
			native.classList.add("native-input-file", this.variant || "default");
			const paginationBar = document.createElement("wj-paginator");
			*/
		//	native.appendChild(paginationBar);
		/*
		actionsPH.appendChild(paginationBar);
		wrapper.appendChild(actionsPH);
		*/
		//	fragment.appendChild(native);
			//wjFooter.appendChild(native);
			//fragment.appendChild(wjFooter);
		//	this.paginationBar = paginationBar;
		
		
		}
		
	
		fragment.appendChild(wrapper);
        return fragment;
    }
	
	addSearchBar(){
		let searchPH = document.createElement("div");
		searchPH.classList.add("left-search");
		this.wrapper.appendChild(searchPH);
		
		const searchBar = document.createElement("wj-input");
		searchBar.setAttribute("variant", "standard");
		searchBar.setAttribute("type", "text");
		searchBar.setAttribute("placeholder", "Search");
		// searchBar.setAttribute("readonly", "");
		searchPH.appendChild(searchBar);
		this.searchBar = searchBar;
	}
	addPaginator(){
		let paginatorDiv  = document.createElement("div");
		paginatorDiv.classList.add("paginator-wrapper");
		this.wrapper.appendChild(paginatorDiv);

		const paginationBar = document.createElement("wj-paginator");
		paginatorDiv.appendChild(paginationBar);
		
	}
    afterDraw() {
		console.log("list","after_draw_start");
		if(this.isPaginated()){
			//event.dispatchCustomEvent(this, "wj-paginator:reload");
			/*
			this.paginationBar.totalCount(this.children.length);
			this.paginationBar.take(this.itemsPerPage());
			this.paginationBar.items = this.children;
			this.paginationBar.showPage(0,this.itemsPerPage());
			*/
		}
		/*this.shadowRoot.addEventListener(`${elementPrefix}-selected-values`, ( e ) => this.selectedChange(e));
		*/
		this.body2PH.addEventListener('scroll', ( e ) => this.progress(e));
		
		if(this.isSearchable()){
		   this.searchBar.addEventListener('wj-input:input', ( e ) => this.filterOptions(e));
		}
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
		
		console.log("list","after_draw_finish");
    }
	
	
	progress(e){		
	
		const scroll = this.body2PH.scrollTop;
		const height = this.body2PH.scrollHeight - this.body2PH.clientHeight;
		const percent = (scroll / height) * 100;
		this.scrollbarPH.style.width = percent + "%";	
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