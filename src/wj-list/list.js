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
	get draggable (){
		return this.hasAttribute("customDraggable")
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
		return [ 'searchable', 'disabled','refresh','customDraggable'];
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
		listContainerSubBox1.setAttribute("id","singleListContainer");
		this.listContainerSubBox1 = listContainerSubBox1;
		listContainerBox1.appendChild(listContainerSubBox1);
		listContainer.appendChild(listContainerBox1);
		
		
		let listFilter = document.createElement("div");
		listFilter.classList.add("list-filter");
		wrapper.appendChild(listFilter);
		
		/*
		let searchBar = document.createElement("wj-input");
		searchBar.setAttribute("variant", "custom");
		searchBar.setAttribute("type", "text");
		searchBar.setAttribute("placeholder", "Search");
		searchBar.value="";
		this.searchBar = searchBar;
		*/
		//listFilter.appendChild(searchBar);
		this.listFilter = listFilter;
		if(!this.isPaginated() && this.isSearchable()){
			this.addSearchBar();
			
			this.style.setProperty("--grid-template-rows", "0.06fr 1.0fr");
			this.style.setProperty("--grid-template-areas", '"list-filter"   "list-container"');
		}
		
		wrapper.appendChild(listContainer);
		listContainer.classList.add("list-container");
		/*
		let listPaginator = document.createElement("div");
		listPaginator.classList.add("list-paginator");
		wrapper.appendChild(listPaginator);
		this.listPaginator = listPaginator;
		this.addPaginatorPanel();
		*/
		let element = document.createElement("slot");
		listContainerSubBox1.appendChild(element);
		
		
		if(this.draggable){
			console.log("list_is_draggable");
			this.makeChildrenDraggable();
		}
		//this.addEventListener('wj-list:input', (e  ) => {this.listChanged(e)});
		/*
	
		
	
		
		let scrollbarPH = document.createElement("div");
		
		
		let body2PH = document.createElement("div");
		body2PH.classList.add("body2");
		
		let listWrapperPH = document.createElement("div");
		listWrapperPH.classList.add("list-wrapper");
		
		body2PH.appendChild(listWrapperPH);	
		
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
	input(e){
		console.log("move_to_destination_clicked after_dispatch");
		console.log("list_component_changed");
		if(this.draggable){
			this.makeChildrenDraggable();
		}
	}
	makeChildrenDraggable(){
		var counter = 0;
		console.log("children:"+this.children.length);
		console.log("root_children:"+this.shadowRoot.children.length);
		[...this.children].forEach((item) => {
			console.log("setting_draggable");
			item.setAttribute("draggable","true");
			item.setAttribute("data-pos",counter);
			counter=counter+1;
		});
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
		this.listFilter.appendChild(search);

		let searchBar = document.createElement("wj-input");
		searchBar.setAttribute("variant", "custom");
		searchBar.setAttribute("type", "text");
		searchBar.setAttribute("placeholder", "Search");
		searchBar.value="";
		this.searchBar = searchBar;
		search.appendChild(searchBar);
		//this.style.setProperty("--wrapper-grid-template-rows", "1% 88% 11%");
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
		this.listPaginator.appendChild(paginatorDiv);

		const paginationBar = document.createElement("wj-paginator");
		paginatorDiv.appendChild(paginationBar);
		this.paginationBar = paginationBar;
		
	}
    afterDraw() {
		console.log("list","after_draw_start");
		this.addEventListener('wj-layout-transfer:test', (e) => {this.input(e);});
		//this.addEventListener("wj-paginator:reload",  (e) => {this.reload();});		
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
			console.log("search_yes");
		   this.searchBar.addEventListener('wj-input:input', ( e ) => {
		   this.filterOptions(e);
		   console.log("search_yes_1");
		   });
		}
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
		/*
		*/
		console.log("list","after_draw_finish");
    }
	setHeight(){
		//var test = leftList.querySelectorAll('.list-container-sub-box1')
		//var test2 = leftList.querySelectorAll('[id="singleListContainer"]');
		var test3 = this.querySelectorAll('[id="singleListContainer"]');
		var test4 = this.shadowRoot.querySelectorAll('[id="singleListContainer"]');
		var test5 = document.getElementById("singleListContainer");
		//var test6 = document.shadowRoot.getElementById("singleListContainer");
		this.style.setProperty("--list-container-sub-box1-max-height","none");
		
	}
	
	progress(e){		
	
		const scroll = this.contentsub.scrollTop;
		const height = this.contentsub.scrollHeight - this.contentsub.clientHeight;
		const percent = (scroll / height) * 100;
		this.scrollBar.style.width = percent + "%";	
	}
	
	async filterOptions(e) {		
		const typedValue = e.detail.value;		
			console.log("!!!!! filter options");
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
			case 'customDraggable':
				console.log("customDraggable_oldValue:"+oldValue);
				console.log("customDraggable_newValue:"+newValue);
				if(this.draggable){
					console.log("list_is_draggable");
					this.makeChildrenDraggable();
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