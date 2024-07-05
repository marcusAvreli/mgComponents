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


        let element = document.createElement("slot");
	
		
		if(this.isSearchable()){
			// Wrapper
			
			let native = document.createElement("div");
			native.setAttribute("part", "native");
			native.classList.add("native-input-file", this.variant || "default");
			const searchBar = document.createElement("wj-input");
			searchBar.setAttribute("variant", "standard");
			searchBar.setAttribute("type", "text");
			searchBar.setAttribute("placeholder", "Search");
			// searchBar.setAttribute("readonly", "");
			native.appendChild(searchBar);
			fragment.appendChild(native);
			
			
			this.searchBar = searchBar;
		}
		//container.appendChild(element);
		fragment.appendChild(element);

		//fragment.appendChild(container);
		// fragment.appendChild(slotEnd);
		if(this.isPaginated()){
			//this.classList.add("container");
			console.log("list","paginated");
			const numberofItems = this.itemsPerPage();
			console.log("list","numberofItems:"+numberofItems);
			let native = document.createElement("div");
			native.setAttribute("part", "native");
			native.classList.add("native-input-file", this.variant || "default");
			const paginationBar = document.createElement("wj-paginator");
			
			native.appendChild(paginationBar);
			fragment.appendChild(native);
			//wjFooter.appendChild(native);
			//fragment.appendChild(wjFooter);
			this.paginationBar = paginationBar;
		}
		
        return fragment;
    }
	
    afterDraw() {
		console.log("finished_draw_list");
		if(this.isPaginated()){
			//event.dispatchCustomEvent(this, "wj-paginator:reload");
			this.paginationBar.totalCount(this.children.length);
			this.paginationBar.take(this.itemsPerPage());
			this.paginationBar.items = this.children;
			this.paginationBar.showPage(0,this.itemsPerPage());
		}
		this.shadowRoot.addEventListener(`${elementPrefix}-selected-values`, ( e ) => this.selectedChange(e));
		if(this.isSearchable()){
		   this.searchBar.addEventListener('wj-input:input', ( e ) => this.filterOptions(e));
		}
        this.classList.toggle("wj-lines-" + this.lines, this.hasAttribute("lines"));
        this.classList.toggle("wj-inset", this.hasAttribute("inset"));
    }
	async filterOptions(e) {		
		const typedValue = e.detail.value;		
		
		for (var i = 0; i < this.children.length; i++) {
			const child = this.children[i];
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