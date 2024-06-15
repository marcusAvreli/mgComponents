import WJElement from "../wj-element/wj-element.js";
import { elementPrefix } from '../shared/index.js';
import  "./list.scss";

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
		return [ 'searchable', 'disabled'];
	}
    draw(context, store, params) {
		this.selectedValues=[];
			
        let fragment = document.createDocumentFragment();

        let element = document.createElement("slot");
		
		let slotEnd = document.createElement("slot");
		 slotEnd.setAttribute("name", "end");
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
		
		fragment.appendChild(element);
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
			const mybutton = document.createElement("wj-button");
			mybutton.setAttribute("slot","start");
			mybutton.classList.add("content");
			mybutton.setDisplayLabel("<<<");
			mybutton.addEventListener('click', (e) => {paginationBar.clickGoStart(e);});
			paginationBar.appendChild(mybutton);
			const mybutton2 = document.createElement("wj-button");
			mybutton2.classList.add("content");
			mybutton2.setAttribute("slot","start");
			mybutton2.setDisplayLabel("<");
			mybutton2.addEventListener('click', (e) => {paginationBar.clickGoBack(e);});
			paginationBar.appendChild(mybutton2);
			const myinput = document.createElement("wj-input");
			myinput.setAttribute("slot","start");
			myinput.classList.add("content");
			myinput.setAttribute("id","navigatortxt");
			myinput.setAttribute("type","text");
			myinput.setAttribute("intTextBox","");
			myinput.setAttribute("custom-error-display","");
			myinput.setAttribute("validate-on-change","");
			myinput.setAttribute("defaultValue",1);
			//myinput.setAttribute("required","");
			//positive numbers only
			
			myinput.setAttribute("message","Must be an integer");
		
		//	myinput.setAttribute("value","");
		//	myinput.setAttribute("invalid","");
		//	myinput.setAttribute("error","");
			paginationBar.appendChild(myinput);
			
			const mybutton4 = document.createElement("wj-button");
			mybutton4.setAttribute("slot","start");
			mybutton4.setDisplayLabel(">");
			mybutton4.classList.add("content");
			mybutton4.addEventListener('click', (e) => {paginationBar.clickGoNext(e);});
			//mybutton4.addEventListener('click', (e) => this._dispatchNext(e));
			
			paginationBar.appendChild(mybutton4);
			const mybutton3 = document.createElement("wj-button");
			mybutton3.setAttribute("slot","start");
			mybutton3.classList.add("content");
			mybutton3.setDisplayLabel(">>>");
			paginationBar.appendChild(mybutton3);
			 mybutton3.addEventListener('click', (e) => {paginationBar.clickGoEnd(e);});
			//native.setAttribute("slot","end");
			native.appendChild(paginationBar);
			fragment.appendChild(native);
			
			this.paginationBar = paginationBar;
		}
		
        return fragment;
    }
		_dispatchNext(e){
			console.log("list","next item");
		e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
			  this.dispatchEvent(new CustomEvent('list-next-page', {
            bubbles: true,
            composed: true,
            detail: {
                tab: this
               
            },
        }));
		}
    afterDraw() {
		console.log("finished_draw_list");
		if(this.isPaginated()){
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
	/*
	showPage(inPageNum){
		console.log("list","showPage:"+inPageNum);
		console.log("list","showPage_1:"+this.itemsPerPage());
		console.log("list","showPage_2:"+this.children.length);
		for(var i=this.itemsPerPage();i<this.children.length;i++){
			const child = this.children[i];
			
			if (child.classList.contains('wj-item-list')) {
				child.classList.remove('wj-item-list');
				child.classList.add('hide');
			} 
		}
	}*/
	addSelectedValues(e){
		if(!this.selectedValues.includes(e,0)){
			this.selectedValues.push(e);
		}
		console.log("size_of_selected:"+this.selectedValues.length);
	}
	getSelectedValues(){
		
		return this.selectedValues;
	}
	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'searchable':
				this.updateSearchable(newValue);
				break;    
		}
	}
	updateSearchable(newValue) {
		console.log("list","update_searchable_called");
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