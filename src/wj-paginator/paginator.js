import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import {Label} from '../wj-label/label.js';
import {Button} from '../wj-button/button.js';
import {Divider} from '../wj-divider/divider.js';
import {Input} from '../wj-input/input.js';

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

	beforeDraw( context, store, params ) {
		console.log("paginator","before_draw");
		
	}

	draw( context, store, params ) {
		this.selectedValues = [];
		this._showedCounter =0;

		let fragment = document.createDocumentFragment();
		
		let container = document.createElement("div");
		container.classList.add("container");
		this.container = container;
		
		this.addPaginator();
		this.addButtonBar();
		
		
	
		
		
		const wjLabelItemsT = document.createElement(Label.is);
		///wjLabelItemsT.setAttribute("slot","end");
		this.paginatorStatus.appendChild(wjLabelItemsT);
		
		const wjLabelItemsTV = document.createElement(Label.is);
		//wjLabelItemsTV.value =this.itemsLength;
		//wjLabelItemsTV.setAttribute("slot","end");
		this.paginatorStatus.appendChild(wjLabelItemsTV);
		
		
		
		wjLabelItemsT.classList.add('itemsPerPage');
		wjLabelItemsTV.classList.add('itemsPerPage');
		
		this.lblItemsT = wjLabelItemsT;
		this.lblItemsTV =wjLabelItemsTV;
		
		
		
		fragment.appendChild(container);
		return fragment;
	
	}
	addButtonBar(){
		let button = document.createElement(Button.is);
		button.setAttribute("slot","start");
		button.setAttribute("zeropadtop","");
		button.classList.add("button1");
	
		button.setDisplayLabel("<<<");		
		
		button.addEventListener('click', (e) => {this.clickGoStart(e);});
		this.appendChild(button);
		
		const mybutton2 = document.createElement(Button.is);
		mybutton2.classList.add("button1");
		mybutton2.setAttribute("slot","start");
		mybutton2.setAttribute("zeropadtop","");
		mybutton2.setDisplayLabel("<");
		mybutton2.addEventListener('click', (e) => {this.clickGoBack(e);});
		this.appendChild(mybutton2);
		
		const myinput = document.createElement("wj-input");
		myinput.setAttribute("slot","start");
		myinput.classList.add("button1");
		myinput.setAttribute("standard","");
		myinput.value="";
		/*myinput.classList.add("content");
		myinput.setAttribute("id","navigatortxt");
		myinput.setAttribute("type","text");
		myinput.setAttribute("intTextBox","");
		//myinput.setAttribute("custom-error-display","");
		myinput.setAttribute("validate-on-change","");
		myinput.setAttribute("defaultValue",1);
		myinput.setAttribute("variant","centered");
		*/
		myinput.value=1;
		myinput.addEventListener(Input.is+":input",  (e) => {this.inputPage(e);});
		
	
		/*
		myinput.setAttribute("message","Must be an integer");	
		*/
		this.appendChild(myinput);
		this.input=myinput;
		
		
		const mybutton4 = document.createElement(Button.is);
		mybutton4.setAttribute("slot","start");
		mybutton4.setDisplayLabel(">");
		mybutton4.classList.add("button1");
		mybutton4.addEventListener('click', (e) => {this.clickGoNext(e);});
		this.appendChild(mybutton4);
		
		const mybutton3 = document.createElement(Button.is);
		mybutton3.setAttribute("slot","start");
		mybutton3.classList.add("button1");
		mybutton3.setDisplayLabel(">>>");
		mybutton3.addEventListener('click', (e) => {this.clickGoEnd(e);});
		this.appendChild(mybutton3);
	}
	addPaginator(){
		let paginator = document.createElement("div");
		paginator.classList.add("paginator");
		
		
		let paginatorActions = document.createElement("div");
		paginatorActions.classList.add("paginator-actions");
		
		let slotStart = document.createElement("slot");
		slotStart.setAttribute("name", "start");
		paginatorActions.appendChild(slotStart);
		
		let paginatorStatus = document.createElement("div");
		
		paginatorStatus.classList.add("paginator-status");
		
		paginator.appendChild(paginatorActions);
		paginator.appendChild(paginatorStatus);
		//paginatorStatus.textContent="Test Status";
		this.container.appendChild(paginator);
		this.paginatorActions = paginatorActions;
		this.paginatorStatus = paginatorStatus;
		
		
	}
	reload(){

		var pageNum = this.currentPage();		
		
		var end = this._take*pageNum
		var start = end-this._take;
		this.showPage(start,end);
		this.lblItemsTV.value = this.itemsLength.toString();
		

	}
	clickGoEnd(e){
		
		const endPage = this.numOfPages;
		this.setCurrentPage(endPage);
		this.reload();
		
	}
	clickGoNext(e){		
		console.log("click_go_next")
		var pageNum = this.currentPage();
		pageNum = pageNum+1;
		if(pageNum > this.numOfPages){
			pageNum = pageNum -1;
		}
		
		this.setCurrentPage(pageNum);
		this.reload();
	
	}
	
	clickGoBack(e){		
		console.log("click_go_back")
		var pageNum = this.currentPage();
		pageNum = pageNum-1;
		if(pageNum==0){
			pageNum = 1;
		}
		this.setCurrentPage(pageNum);
		this.reload();
		
	}
	clickGoStart(e){		
		const startPage = 1
		this.setCurrentPage(startPage);
		this.reload();
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
		
	
		
		//buttonNative.classList.add('standrad');
		this.addEventListener("wj-paginator:reload",  (e) => {this.reload();});			
		this.reload();
	}
	currentPage(){	
		if(	this.input){
				return parseInt(this.input.value);	
		}
		return 1;
	}
	
	setCurrentPage(inValue){
		if(inValue  < 1){
			inValue =1;
		}
		if(inValue > this.numOfPages){
			inValue = this.numOfPages;
		}		
		this.input.value =inValue.toString(); 		
	}
	
	totalCount(counter){		
		this._totalCounter = counter;
	}
	get numOfPages(){
		return Math.ceil(this._totalCounter/this._take);
	}
	get isLastPage(){
		return this.numOfPages == this.currentPage();
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
	get itemsLength(){
		if(this._collection){
			return this._collection.length;
		}
		return 0;
	}
	inputPage(e){		
		var pageNum = e.detail.value;
		const component = e.detail.component;
		if(pageNum){
			if(pageNum<1){
				pageNum =1;
			}else{
				if(pageNum > this.numOfPages){
					pageNum = this.numOfPages;
				}
			}		
			component.value =  pageNum.toString();
			var end = this._take*pageNum
			var start = end-this._take;
			this.showPage(start,end);
		}else{			
			component.value = "1";			
		}
	}
	
	
	
	
	showPage(start,end){
		let tempStart = 1;
		let tempEnd = 1;		
		if(this.lblItemsT){
				
			tempStart = start+1;
			if(end > this._collection.length){
				tempEnd = end -1;
			}else{
				tempEnd = end;
			}
			
		
		}
		
		this._showedCounter=0;
		for(var i=0;i<this._collection.length;i++){
			const child = this._collection[i];
			if(i>=start && i<end){
				//show
				if (child.classList.contains('hide')) {
					child.classList.remove('hide');
					child.classList.add('wj-item-list');
					this._showedCounter=this._showedCounter+1;
				} 
			}else{
				if (child.classList.contains('wj-item-list')) {
					child.classList.remove('wj-item-list');
					child.classList.add('hide');
				} 
			}
		}
			if(this.isLastPage){
				
				
				this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} `;
			
				if(this._showedCounter==1){
					if(this.lblItemsT){
						this.lblItemsT.value =`Showing ${tempStart} `;
					}
				}else{
					if(this.numOfPages == this.currentPage()){
						if(this.lblItemsT){
							if(this._showedCounter>1){
							
								this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} `;
							}
						}
					}
				}
			}else{
				
				if(this.numOfPages >= this.currentPage()){
						if(this.lblItemsT){							
							this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} `;
						}
				}
			}
	}
	
	

	
	


	afterDisconnect(){}
	unregister(){}

}


customElements.get(Paginator.is) || window.customElements.define(Paginator.is, Paginator);