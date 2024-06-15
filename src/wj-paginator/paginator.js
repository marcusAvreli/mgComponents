import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
///https://www.darins.page/articles/designing-a-reorderable-list-component#text-input

/**
 * @injectHTML
 */
export class Paginator extends WJElement {
	// set initial vars
	
	/*curName = '';
	curItem = 0;
	curButton = null;
	grabCoords = {x: 0, y: 0};
	*/
	constructor() {
		super();
		console.log("constructor_item");
		
	}

	isClickable() {
		return this.hasAttribute('href') || this.button;
	}

	static get className(){
		return "Paginator";
	}

	static get is() {
		return `${elementPrefix}-paginator`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }

	setupAttributes() {
		this.isShadowRoot = 'open';
	}

	beforeDraw( context, store, params ) {}

	draw( context, store, params ) {
		 this.selectedValues = [];
		//this._totalCounter = -1;
		
		if(this.hostContext('wj-list', this)) {
			console.log("paginator","hostContext");
			//this.classList.add('wj-item-list');
		}
	
		return `<div class="container">
			<slot name="start"></slot>
				<div class="container">
					<div >
							<slot></slot>
					</div>
					<slot name="end"></slot>
						<div class="item-inner">
					</div>
					<wj-label id="title"></wj-label>
					<wj-label id="counter"></wj-label>
					<wj-label id="numberOfPagesTitle"></wj-label>
					<wj-label id="numberOfPages"></wj-label>
		`;
	}
	
	clickGoEnd(e){
		console.log("paginator","clickGoEnd");
	}
	clickGoNext(e){
		console.log("paginator","clickGoNext");
		var pageNum = this.currentPage();
		pageNum = pageNum+1;
		if(pageNum > this.numOfPages){
			pageNum = pageNum -1;
		}
		this.setCurrentPage(pageNum);
		var end = this._take*pageNum
		var start = end-this._take;
		console.log("paginator","pageNum:"+pageNum+" take:"+this._take+" start:"+start+" end:"+end);
		this.showPage(start,end);
	}
	
	clickGoBack(e){
		console.log("paginator","clickGoBack");
		
		var pageNum = this.currentPage();
		pageNum = pageNum-1;
		if(pageNum==0){
			pageNum = 1;
		}
		this.setCurrentPage(pageNum);
		var end = this._take*pageNum
		var start = end-this._take;
		console.log("paginator","pageNum:"+pageNum+" take:"+this._take+" start:"+start+" end:"+end);
		this.showPage(start,end);
	}
clickGoStart(e){
		console.log("paginator","clickGoStart");
}

	hostContext(selector, el){
		return el.closest(selector) !== null;
	}
	set keepItem(elem){
		this.curDraggedEl = elem;
	}
	get keepItem(){
		return this.curDraggedEl;
	}
	afterDraw() {	

		const titleLabel  = this.shadowRoot.querySelector("#title");
		titleLabel.value="Number Of Items";
		
		const counterLabel  = this.shadowRoot.querySelector("#counter");
		counterLabel.value=this._totalCounter;
		const numberOfPagesTitle  = this.shadowRoot.querySelector("#numberOfPagesTitle");
		numberOfPagesTitle.value = "Number of Pages";
		
		const numberOfPages  = this.shadowRoot.querySelector("#numberOfPages");
		numberOfPages.value =  this.numOfPages
		
		const navigatortxt  = this.querySelector("#navigatortxt");
		//navigatortxt.value =10;
		this.addEventListener('list-next-page', ( e ) => this.clickGoNext(e));
	}
	currentPage(){
		const navigatortxt  = this.querySelector("#navigatortxt");
		var currentValue = navigatortxt.value
		if(!currentValue){
			currentValue = navigatortxt.getAttribute("defaultvalue");
		}
		console.log("paginator","navigatortxt:"+navigatortxt.value);
		console.log("paginator","navigatortxt:"+currentValue);
		console.log("paginator","navigatortxt:"+navigatortxt.outerHTML);
		return parseInt(currentValue);
	}
	setCurrentPage(inValue){
		const navigatortxt  = this.querySelector("#navigatortxt");
		navigatortxt.value = inValue
	}
	totalCount(counter){		
		this._totalCounter = counter;
	}
	get numOfPages(){
		return Math.ceil(this._totalCounter/this._take);
	}
	take(numberOfItemsPerPage){
		this._take= numberOfItemsPerPage;
	}
	set items(items){
		this._collection = items;
	}
	get items(){
		return this._collection;
	}
	
	showPage(start,end){
		console.log("paginator","showPage start:"+start);
		console.log("paginator","showPage end:"+end);
		console.log("paginator","showPage take:"+this._take);
		console.log("paginator","showPage_2:"+this._collection.length);
		for(var i=0;i<this._collection.length;i++){
			const child = this._collection[i];
			if(i>=start && i<end){
				//show
				if (child.classList.contains('hide')) {
					child.classList.remove('hide');
					child.classList.add('wj-item-list');
				} 
			}else{
			if (child.classList.contains('wj-item-list')) {
				child.classList.remove('wj-item-list');
				child.classList.add('hide');
			} 
			}
		}
	}
	
	

	
	


	afterDisconnect(){}
	unregister(){}

}


customElements.get(Paginator.is) || window.customElements.define(Paginator.is, Paginator);