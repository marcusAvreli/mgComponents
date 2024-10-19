import { default as WJElement, WjElementUtils,event } from "../wj-element/wj-element.js";

import { elementPrefix } from '../shared/index.js';
import  "./layout-transfer.scss";
/**
 * @injectHTML
 */
export class LayoutTransfer extends WJElement {
    constructor() {
        super();
    }
	static get className(){
		return "LayoutTransfer";
	}

	static get is() {
		return `${elementPrefix}-layout-transfer`;
	}
	static set cssStyleSheet(inStyle) {		
		this.styles = inStyle;
	}
    static get cssStyleSheet() {		
        return this.styles;
    }
    

    

    static get observedAttributes() {
        return [];
    }

    setupAttributes() {
        this.isShadowRoot = "open";
    }

    draw(context, store, params) {
	
        let fragment = document.createDocumentFragment();
			this.classList.add("layout-transfer-container");
		let wrapperDiv  = document.createElement("div");
		wrapperDiv.classList.add("transfer-wrapper");
		let formDiv  = document.createElement("div");
		formDiv.classList.add("transfer-grid");
		
		
		
        let slotLeft = document.createElement("slot");
		slotLeft.setAttribute("name","left");
		
		
		let transferGridLeft  = document.createElement("div");
		transferGridLeft.classList.add("transfer-grid-left");
		transferGridLeft.appendChild(slotLeft);
		
		
		
		
		let slotTransfer = document.createElement("slot");
		slotTransfer.setAttribute("name","transfer");
		
		let transferGridTransfer  = document.createElement("div");
		transferGridTransfer.classList.add("transfer-grid-transfer");
		//transferGridTransfer.appendChild(slotTransfer);
		
		
		let transferGridTransferWrapper  = document.createElement("div");
		transferGridTransferWrapper.classList.add("transfer-grid-transfer-wrapper");
		transferGridTransfer.appendChild(transferGridTransferWrapper);
		
		let transferGridTransferWrapperGrid= document.createElement("div");
		transferGridTransferWrapperGrid.classList.add("transfer-grid-transfer-wrapper-grid");
		transferGridTransferWrapper.appendChild(transferGridTransferWrapperGrid);
		this.transferGridTransferWrapperGrid = transferGridTransferWrapperGrid;
		this.fillUpTranferPanel();
		
		
		
		
		let slotRight = document.createElement("slot");
		slotRight.setAttribute("name","right");
		
		let transferGridRight  = document.createElement("div");
		transferGridRight.classList.add("transfer-grid-right");
		transferGridRight.appendChild(slotRight);
		
		formDiv.appendChild(transferGridLeft);
		formDiv.appendChild(transferGridTransfer);
		formDiv.appendChild(transferGridRight);
		
		
		
		
		
		wrapperDiv.appendChild(formDiv);
		
        fragment.appendChild(wrapperDiv);

        return fragment;
    }
	
	fillUpTranferPanel(){
		//let mixWrapper  = document.createElement("div");
		//mixWrapper.classList.add("mix-wrapper");
		//this.transferGridTransferWrapperGrid.appendChild(mixWrapper);
		
		let mix1  = document.createElement("div");
		mix1.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix1);
		
		let wjButton1  = document.createElement("wj-button");	
		mix1.appendChild(wjButton1);
		wjButton1.classList.add("button-make-flex");
		wjButton1.setDisplayLabel(">");
		wjButton1.setAttribute("disabled" , "");
		//mixWrapper.appendChild(mix1);
		//wjButton1.textContent=">";
		wjButton1.addEventListener("wj:button-click", (e) => {
			this.moveToDestination(e);
			
		})
		this.wjButton1 = wjButton1;
		
		let mix2  = document.createElement("div");
		mix2.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix2);
		
		let wjButton2  = document.createElement("wj-button");	
		mix2.appendChild(wjButton2);
		wjButton2.classList.add("button-make-flex");
		wjButton2.setDisplayLabel(">>>>");
		wjButton2.setAttribute("disabled" , "");
		wjButton2.addEventListener("wj:button-click", (e) => {
			this.moveAllToDestination(e);
		})
		this.wjButton2 = wjButton2;
		//wjButton2.textContent=">>>>";
		//let multiSourceToDestination = document.createElement("slot");
		//multiSourceToDestination.setAttribute("name","multiSourceToDestination");
		//mix2.appendChild(multiSourceToDestination);
		
		
		let mix3  = document.createElement("div");
		mix3.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix3);
		
		let mix4  = document.createElement("div");
		mix4.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix4);
		
		let wjButton4  = document.createElement("wj-button");	
		mix4.appendChild(wjButton4);
		wjButton4.classList.add("button-make-flex");
		wjButton4.setDisplayLabel("<");
		wjButton4.setAttribute("disabled" , "");
		wjButton4.addEventListener("wj:button-click", (e) => {
			this.moveToSource(e);
		})
		this.wjButton4 = wjButton4;
		
		
		//wjButton4.textContent="<";
		let mix5  = document.createElement("div");
		mix5.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix5);
		
		let wjButton5  = document.createElement("wj-button");	
		mix5.appendChild(wjButton5);
		wjButton5.classList.add("button-make-flex");
		wjButton5.setDisplayLabel("<<<<");
		wjButton5.setAttribute("disabled" , "");
		wjButton5.addEventListener("wj:button-click", (e) => {
			this.moveAllToSource(e);
		})
		this.wjButton5 = wjButton5;
		//wjButton5.textContent="<<<<";
	}
	
	moveToDestination(e){
		console.log("move_to_destination_clicked");
	
		var elems = this.checkedSourceList;
		//https://stackoverflow.com/questions/47754415/how-to-get-all-child-elements-with-specific-attribute-in-javascript
		//theParentSelector theChildsAttribute
		console.log(elems.length);
	
		var destinationList =  document.querySelector('[name="destinationList"]');
		
		var el = elems[0];
		console.log("moveToDestination",el);
		var assigned = el.shadowRoot.querySelector("slot[name=end]").assignedElements();
	//	assigned[0].checked = false;
	   destinationList.appendChild(el);
	   console.log("move_to_destination_clicked before_dispatch");
	   //event.dispatchCustomEvent(this, "wj-list:input");
		 event.dispatchCustomEvent(destinationList, "wj-layout-transfer:test", {
            data: { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
            context: this,
            event: this
        });
		
		if(this.checkedSourceListCount == 0){
			this.wjButton1.disabled="";
			this.wjButton1.classList.add("wj-button-disabled");
			this.wjButton1.classList.add("wj-disabled");
			
			this.wjButton2.disabled="";
			this.wjButton2.classList.add("wj-button-disabled");
			this.wjButton2.classList.add("wj-disabled");
		}
		if(this.checkedSourceListCount == 1){
			this.wjButton2.disabled="";
			this.wjButton2.classList.add("wj-button-disabled");
			this.wjButton2.classList.add("wj-disabled");
		}
		
	}
	moveAllToDestination(e){
		console.log("move_all_to_destination_clicked");
		var elems = this.checkedSourceList;
		var destinationList =  document.querySelector('[name="destinationList"]');
		Array.from(elems).forEach( function (el) {
		   //console.log(el.getAttribute("theChildsAttribute"))
		   var assigned = el.shadowRoot.querySelector("slot[name=end]").assignedElements();
		   assigned[0].checked = false;
			//assigned.tagName
		   el.removeAttribute("checked");
		   destinationList.appendChild(el);
		});
		if(this.checkedSourceListCount == 0){
			this.wjButton1.disabled="";
			this.wjButton1.classList.add("wj-button-disabled");
			this.wjButton1.classList.add("wj-disabled");
			
			this.wjButton2.disabled="";
			this.wjButton2.classList.add("wj-button-disabled");
			this.wjButton2.classList.add("wj-disabled");
		}
	}
	moveToSource(e){
		console.log("move_to_source_clicked");
		var elems = this.checkedDestinationList;
		var destinationList = document.querySelector('[name="sourceList"]');
		console.log("move_to_source_clicked:"+destinationList);
		console.log("move_to_source_clicked checkedDestinationList:"+elems);
		var el = elems[0];
		console.log("move_to_source_clicked:"+el);
		var assigned = el.shadowRoot.querySelector("slot[name=end]").assignedElements();
		assigned[0].checked = false;
		destinationList.appendChild(el);
		
		
		if(this.checkedDestinationListCount == 0){
			this.wjButton4.disabled="";
			this.wjButton4.classList.add("wj-button-disabled");
			this.wjButton4.classList.add("wj-disabled");
			
			this.wjButton5.disabled="";
			this.wjButton5.classList.add("wj-button-disabled");
			this.wjButton5.classList.add("wj-disabled");
		}
		if(this.checkedDestinationListCount == 1){
			this.wjButton5.disabled="";
			this.wjButton5.classList.add("wj-button-disabled");
			this.wjButton5.classList.add("wj-disabled");
		}
	}
	moveAllToSource(e){
		console.log("move_all_to_source_clicked");
		
			console.log("move_all_to_destination_clicked");
		var elems = this.checkedDestinationList;
		var destinationList =  document.querySelector('[name="sourceList"]');
		Array.from(elems).forEach( function (el) {
		   //console.log(el.getAttribute("theChildsAttribute"))
		   var assigned = el.shadowRoot.querySelector("slot[name=end]").assignedElements();
		   assigned[0].checked = false;
			//assigned.tagName
		   el.removeAttribute("checked");
		   destinationList.appendChild(el);
		});
		if(this.checkedDestinationListCount == 0){
			this.wjButton4.disabled="";
			this.wjButton4.classList.add("wj-button-disabled");
			this.wjButton4.classList.add("wj-disabled");
			
			this.wjButton5.disabled="";
			this.wjButton5.classList.add("wj-button-disabled");
			this.wjButton5.classList.add("wj-disabled");
		}
	}
	afterDraw(){
		// event.dispatchCustomEvent(this, "wj-list:input");
		this.shadowRoot.addEventListener('wj:checkbox:change', ( e ) => {		 
			
			console.log("shadowRoot_checked:",e.target.checked);
			console.log("shadowRoot_checked:",e.target.parentElement.parentElement.tagName);
			if(e.target.parentElement.parentElement.tagName == 'WJ-LIST'){
				console.log("yes");
				if(e.target.parentElement.parentElement.name == 'sourceList'){
						console.log("yes");
				}
				console.log("coun_selected:"+this.checkedSourceListCount);
				if(this.checkedSourceListCount >= 1){
					console.log("yes");
					if(this.checkedSourceListCount == 1 && e.target.checked && this.wjButton1.disabled){
						console.log("open");
						this.wjButton1.removeAttribute("disabled");
						this.wjButton1.classList.remove("wj-button-disabled");
						this.wjButton1.classList.remove("wj-disabled");
					}else{
					
					}
					if(this.checkedSourceListCount > 1 && e.target.checked && this.wjButton2.disabled){
						console.log("open");
						this.wjButton2.removeAttribute("disabled");
						this.wjButton2.classList.remove("wj-button-disabled");
						this.wjButton2.classList.remove("wj-disabled");
					}else{
					
					}
				}
				if(this.checkedSourceListCount == 0){
					console.log("close");
					console.log("close checked",e.target.checked);
					console.log("close button",this.wjButton1.disabled);
					if(!e.target.checked && (!this.wjButton1.disabled || !this.wjButton2.disabled)){
						//unchecked enabled
						//so close all
						this.wjButton1.disabled="";
						this.wjButton1.classList.add("wj-button-disabled");
						this.wjButton1.classList.add("wj-disabled");
						
						this.wjButton2.disabled="";
						this.wjButton2.classList.add("wj-button-disabled");
						this.wjButton2.classList.add("wj-disabled");					
					}
				}
				
				if(this.checkedDestinationListCount >= 1){
					console.log("destination_list_selected");
					console.log("destination_list_selected:"+this.checkedDestinationListCount);
					console.log("destination_list_selected:"+e.target.checked);
					console.log("destination_list_selected:"+this.wjButton4.disabled);
					if(this.checkedDestinationListCount == 1 && e.target.checked && this.wjButton4.disabled){
						console.log("open");
						this.wjButton4.removeAttribute("disabled");
						this.wjButton4.classList.remove("wj-button-disabled");
						this.wjButton4.classList.remove("wj-disabled");
					}else{
					
					}
					if(this.checkedDestinationListCount > 1 && e.target.checked && this.wjButton5.disabled){
						console.log("open");
						this.wjButton5.removeAttribute("disabled");
						this.wjButton5.classList.remove("wj-button-disabled");
						this.wjButton5.classList.remove("wj-disabled");
					}else{
					
					}
					
				}
				if(this.checkedDestinationListCount == 0){
					console.log("destination_list_nothing_selected");
					console.log("close");
					console.log("close checked",e.target.checked);
					console.log("close button",this.wjButton4.disabled);
					if(!e.target.checked && (!this.wjButton4.disabled || !this.wjButton5.disabled)){
						//unchecked enabled
						//so close all
						this.wjButton4.disabled="";
						this.wjButton4.classList.add("wj-button-disabled");
						this.wjButton4.classList.add("wj-disabled");
						
						this.wjButton5.disabled="";
						this.wjButton5.classList.add("wj-button-disabled");
						this.wjButton5.classList.add("wj-disabled");					
					}
				}
			}
			
		});
            
	}
	
	get checkedSourceList(){
		var elems = document.querySelectorAll('[name="sourceList"] > [checked]');
		return elems;
	}
	get checkedSourceListCount(){
		var elems = this.checkedSourceList;
		var count = elems.length;
		return count;
	}
	get checkedDestinationList(){
		var elems = document.querySelectorAll('[name="destinationList"] > [checked]');
		return elems;
	}
	get checkedDestinationListCount(){
		var elems = this.checkedDestinationList;
		var count = elems.length;
		return count;
	}
	
	
}

customElements.get(LayoutTransfer.is) || window.customElements.define(LayoutTransfer.is, LayoutTransfer);