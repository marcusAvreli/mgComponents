import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
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
		return "Form";
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
		//mixWrapper.appendChild(mix1);
		//wjButton1.textContent=">";
		wjButton1.addEventListener("wj:button-click", (e) => {
			this.moveToDestination(e);
		})
		
		
		let mix2  = document.createElement("div");
		mix2.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix2);
		
		let wjButton2  = document.createElement("wj-button");	
		mix2.appendChild(wjButton2);
		wjButton2.classList.add("button-make-flex");
		wjButton2.setDisplayLabel(">>>>");
		wjButton2.addEventListener("wj:button-click", (e) => {
			this.moveAllToDestination(e);
		})
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
		wjButton4.addEventListener("wj:button-click", (e) => {
			this.moveToSource(e);
		})
		
		
		
		//wjButton4.textContent="<";
		let mix5  = document.createElement("div");
		mix5.classList.add("mix");
		this.transferGridTransferWrapperGrid.appendChild(mix5);
		
		let wjButton5  = document.createElement("wj-button");	
		mix5.appendChild(wjButton5);
		wjButton5.classList.add("button-make-flex");
		wjButton5.setDisplayLabel("<<<<");
		wjButton5.addEventListener("wj:button-click", (e) => {
			this.moveAllToSource(e);
		})
		//wjButton5.textContent="<<<<";
	}
	
	moveToDestination(e){
		console.log("move_to_destination_clicked");
	
		var elems = document.querySelectorAll("#sourceList > [checked]");
		//https://stackoverflow.com/questions/47754415/how-to-get-all-child-elements-with-specific-attribute-in-javascript
		//theParentSelector theChildsAttribute
		console.log(elems.length);
		elems[0].removeAttribute("checked");
		var destinationList = document.querySelector("#destinationList");
		Array.from(elems).forEach( function (el) {
		   //console.log(el.getAttribute("theChildsAttribute"))
		   el.removeAttribute("checked");
		   destinationList.appendChild(el);
		});
		
		
	}
	moveAllToDestination(e){
		console.log("move_all_to_destination_clicked");
	}
	moveToSource(e){
		console.log("move_to_source_clicked");
	}
	moveAllToSource(e){
		console.log("move_all_to_source_clicked");
	}
	afterDraw(){
		
		   
            
	}
	
}

customElements.get(LayoutTransfer.is) || window.customElements.define(LayoutTransfer.is, LayoutTransfer);