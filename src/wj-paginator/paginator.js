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

	beforeDraw( context, store, params ) {}

	draw( context, store, params ) {
		this.selectedValues = [];
		this._showedCounter =0;

		let fragment = document.createDocumentFragment();
		let native = document.createElement("div");
		native.classList.add("body");
		
		
		let paginatorPh = document.createElement("div");
		paginatorPh.classList.add("paginator");
		native.appendChild(paginatorPh);
		
		let paginatorActions = document.createElement("div");
		paginatorActions.classList.add("paginator-actions");
		
		let paginatorStatus = document.createElement("div");
		paginatorStatus.classList.add("paginator-status");
		
		paginatorPh.appendChild(paginatorActions);
		paginatorPh.appendChild(paginatorStatus);
		paginatorStatus.textContent="Test Status";
		paginatorActions.textContent="Test actions";
		
		/*
		let mainContainer = document.createElement("div");
		mainContainer.classList.add("main-container");
	
		
		
		let rightContainer  = document.createElement("div");
		rightContainer.classList.add("right-container");
		mainContainer.appendChild(rightContainer);
		
		let halfContainer1  = document.createElement("div");
		halfContainer1.classList.add("half-containers");
		rightContainer.appendChild(halfContainer1);
		
		let halfContainer2  = document.createElement("div");
		halfContainer2.classList.add("half-containers");
		rightContainer.appendChild(halfContainer2);
		*/
		
		/*let native2 = document.createElement("div");
		native.classList.add("container");
		native2.classList.add("container");
		let slot = document.createElement("slot");
		native2.appendChild(slot);
*/
/*
		let slotStart = document.createElement("slot");
		slotStart.setAttribute("name", "start");
		halfContainer1.appendChild(slotStart);
		let slotEnd = document.createElement("slot");
		slotEnd.setAttribute("name", "end");

		
		const mybutton = document.createElement("button");
		mybutton.setAttribute("slot","start");
		mybutton.classList.add("content");
		//mybutton.setDisplayLabel("<<<");
		mybutton.addEventListener('click', (e) => {this.clickGoStart(e);});
		//this.appendChild(mybutton);
		this.appendChild(mybutton);
		
		*/

/*
		const mybutton2 = document.createElement(Button.is);
		mybutton2.classList.add("content");
		mybutton2.setAttribute("slot","start");
		mybutton2.setDisplayLabel("<");
		mybutton2.addEventListener('click', (e) => {this.clickGoBack(e);});

		this.appendChild(mybutton2);


		const myinput = document.createElement(Input.is);
		myinput.setAttribute("slot","start");
		myinput.classList.add("content");
		myinput.setAttribute("id","navigatortxt");
		myinput.setAttribute("type","text");
		myinput.setAttribute("intTextBox","");
		myinput.setAttribute("custom-error-display","");
		myinput.setAttribute("validate-on-change","");
		myinput.setAttribute("defaultValue",1);
		myinput.setAttribute("variant","centered");
		myinput.value=1;
		myinput.addEventListener(Input.is+":input",  (e) => {this.inputPage(e);});
		console.log(Paginator.is,"register reload");
		
		myinput.setAttribute("message","Must be an integer");	
		this.appendChild(myinput);
		
		const mybutton4 = document.createElement(Button.is);
		mybutton4.setAttribute("slot","start");
		mybutton4.setDisplayLabel(">");
		mybutton4.classList.add("content");
		mybutton4.addEventListener('click', (e) => {this.clickGoNext(e);});
		this.appendChild(mybutton4);
		
		const mybutton3 = document.createElement(Button.is);
		mybutton3.setAttribute("slot","start");
		mybutton3.classList.add("content");
		mybutton3.setDisplayLabel(">>>");
		mybutton3.addEventListener('click', (e) => {this.clickGoEnd(e);});
		this.appendChild(mybutton3);

		const divItemsStatus = document.createElement("div");
		
		const divItemsStatusSub1 = document.createElement("div");
		divItemsStatusSub1.classList.add("status");
		

		const divItemsStatusPP = document.createElement("div");
		const divItemsStatusPPV = document.createElement("div");
		divItemsStatusPP.classList.add("itemsStatusBar");
		divItemsStatusPPV.classList.add("itemsStatusBar");
	
		divItemsStatusSub1.appendChild(divItemsStatusPP);
		divItemsStatusSub1.appendChild(divItemsStatusPPV);
		divItemsStatus.appendChild(divItemsStatusSub1);
		const wjLabelItemsPP = document.createElement(Label.is);
		wjLabelItemsPP.value ="Items Per Page: ";
		divItemsStatusPP.appendChild(wjLabelItemsPP);
		
		const divItemsStatusSub2 = document.createElement("div");
		divItemsStatusSub2.classList.add("status");
		const wjLabelItemsPPV = document.createElement(Label.is);
		wjLabelItemsPPV.value =this._take;
		divItemsStatusPPV.appendChild(wjLabelItemsPPV);
		
		const divItemsStatusT = document.createElement("div");
		const divItemsStatusTV = document.createElement("div");
		divItemsStatusT.classList.add("itemsStatusBar");
		divItemsStatusTV.classList.add("itemsStatusBar");
		
		divItemsStatusSub2.appendChild(divItemsStatusT);
		divItemsStatusSub2.appendChild(divItemsStatusTV);
		divItemsStatus.appendChild(divItemsStatusSub2);
		
		
		const wjLabelItemsT = document.createElement(Label.is);

		divItemsStatusT.appendChild(wjLabelItemsT);
		
		const wjLabelItemsTV = document.createElement(Label.is);
		wjLabelItemsTV.value =this.itemsLength;
		divItemsStatusTV.appendChild(wjLabelItemsTV);
		
		native.appendChild(slotStart);
		
		
		fragment.appendChild(native);
		fragment.appendChild(divItemsStatus);
		this.slotStart = slotStart;
		this.input = myinput;
		this.lblItemsT = wjLabelItemsT;
		this.lblItemsTV =wjLabelItemsTV;
		
		*/
		//	native.appendChild(slotStart);
		//native.appendChild(mainContainer);
		fragment.appendChild(native);
		return fragment;
	
	}
	reload(){
/*		
		var pageNum = this.currentPage();		
		
		var end = this._take*pageNum
		var start = end-this._take;
		this.showPage(start,end);
		this.lblItemsTV.value = this.itemsLength.toString();
		if(this.lblItemsT){
			
			if(this._take>this.itemsLength){
				this.lblItemsT.value =`Showing 1-${this.itemsLength} of:`;
			}else{
				this.lblItemsT.value =`Showing 1-${this._take} of:`;
			}
		}
		*/
	}
	clickGoEnd(e){
		
		const endPage = this.numOfPages;
		this.setCurrentPage(endPage);
		this.reload();
		
	}
	clickGoNext(e){		
		var pageNum = this.currentPage();
		pageNum = pageNum+1;
		if(pageNum > this.numOfPages){
			pageNum = pageNum -1;
		}
		
		this.setCurrentPage(pageNum);
		this.reload();
	
	}
	
	clickGoBack(e){		
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
				//this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} of:`;
			
				if(this._showedCounter==1){
					if(this.lblItemsT){
						this.lblItemsT.value =`Showing ${tempStart} of:`;
					}
				}else{
					if(this.numOfPages == this.currentPage()){
						if(this.lblItemsT){
							if(this._showedCounter>1){
								console.log("paginator","showed_counter:"+this._showedCounter);
								this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} of:`;
							}
						}
					}
				}
			}else{
				if(this.numOfPages >= this.currentPage()){
						if(this.lblItemsT){
					this.lblItemsT.value =`Showing ${tempStart}-${tempEnd} of:`;
						}
				}
			}
	}
	
	

	
	


	afterDisconnect(){}
	unregister(){}

}


customElements.get(Paginator.is) || window.customElements.define(Paginator.is, Paginator);