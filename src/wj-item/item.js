import { default as WJElement, WjElementUtils } from "../wj-element/wj-element.js";
import  "./item.scss";
import { elementPrefix } from '../shared/index.js';
///https://www.darins.page/articles/designing-a-reorderable-list-component#text-input

/**
 * @injectHTML
 */
export class Item extends WJElement {
	// set initial vars
	
	/*curName = '';
	curItem = 0;
	curButton = null;
	grabCoords = {x: 0, y: 0};
	*/
	constructor() {
		super();
		console.log("constructor_item");
		this.labelColorStyles = {};
		this.itemStyles = new Map();
		this.inheritedAriaAttributes = {};
		this.multipleInputs = false;
		this.focusable = true;
		// set initial vars
		this.curName = '';
		this.curItem = 0;
		this.curButton = null;
		//this.curDraggedEl = null;
		this.grabCoords = {x: 0, y: 0};
		/**
		 * If `true`, a button tag will be rendered and the item will be tappable.
		 */
		this.button = false;
		/**
		 * The icon to use when `detail` is set to `true`.
		 */
		this.detailIcon = ``; // TODO icon
		/**
		 * If `true`, the user cannot interact with the item.
		 */
		this.disabled = false;
		/**
		 * If `true`, a character counter will display the ratio of characters used and the total character limit. Only applies when the `maxlength` property is set on the inner `ion-input` or `ion-textarea`.
		 * @deprecated Use the `counter` property on `ion-input` or `ion-textarea` instead.
		 */
		this.counter = false;
		/**
		 * When using a router, it specifies the transition direction when navigating to
		 * another page using `href`.
		 */
		this.routerDirection = 'forward';
		/**
		 * The type of the button. Only used when an `onclick` or `button` property is present.
		 */
		this.type = 'button';
	}

	isClickable() {
		return this.hasAttribute('href') || this.button;
	}

	static get className(){
		return "Item";
	}

	static get is() {
		return `${elementPrefix}-item`;
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
		const TagType = this.isClickable() ? this.hasAttribute('href') === undefined ? 'button' : 'a' : 'div';
		console.log("draw_item_start");
		if(this.hostContext('wj-list', this)) {
			this.classList.add('wj-item-list');
		}
	
		return `<${TagType} class="item-native" part="native">
			<slot name="start"></slot>
			<div class="item-inner">
					<div class="input-wrapper">
							<slot></slot>
					</div>
					<slot name="end"></slot>
			</div>
			<div class="item-highlight"></div>
    </${TagType}>
		<div class="item-bottom">
				<slot name="error"></slot>
				<slot name="helper"></slot>
		</div>`;
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
		console.log("finished_draw_item");
		this.addEventListener("dragstart", this.itemDragStart);
		this.addEventListener('dragend',this.itemDragEnd);
		this.addEventListener('dragenter', this.itemDragEnter);
		this.addEventListener('dragleave', this.itemDragLeave);
		this.addEventListener('dragover', this.itemDragOver);
		this.addEventListener('drop', this.itemDrop);
		this.addEventListener('focus', this.itemFocus);
		/*
		let buttonUp =	this.querySelector('#buttonUp');
		let buttonDown =	this.querySelector('#buttonDown');
		buttonUp.addEventListener("click", this.buttonUpClicked);		
		buttonDown.addEventListener("click",this.buttonDownClicked)
            */


		//this.addEventListener("slotchange", (event) => {console.log("slot_change_1")});
		let slots = this.shadowRoot.querySelectorAll("slot");
		slots[1].addEventListener("slotchange", (e) => {
		  let nodes = slots[1].assignedNodes();
		
		});
		
	}
	buttonUpClicked(e){		
		const targetTagName = e.target.tagName		
		if(targetTagName === 'wj-icon'.toUpperCase()){			
			const parentElement = e.target.parentElement;
			const wjButton = parentElement.tagName
			if(wjButton === 'wj-button'.toUpperCase()){
				const wjItem = parentElement.parentElement;
				const dataPos = wjItem.getAttribute('data-pos');
				const children =  wjItem.parentElement.children;
				//this.moveItemUp(children,dataPos);
			    if(dataPos > 0) {
					// get positions of items
					let pos1 = dataPos-1;
					let pos2 = dataPos;

					// get ref to up button
					//let button = items[pos2].querySelector('.rankingsItem--up');

					// swap items
					this.swapItems(children,pos2,pos1);
				}
        
			}
		}else{
			if(targetTagName === 'wj-button'.toUpperCase()){
				const wjItem = e.target.parentElement;
				const wjItemName = wjItem.tagName				
				if(wjItemName === 'wj-item'.toUpperCase()){
					const dataPos = wjItem.getAttribute('data-pos');
					const children =  wjItem.parentElement.children;
					//this.moveItemUp(children,dataPos);
					this.moveItemUp(1);
				}
			}
		}		
	}
	

	
	
	buttonDownClicked(e){
		const targetTagName = e.target.tagName
		if(targetTagName === 'wj-icon'.toUpperCase()){		
			const parentElement = e.target.parentElement;
			const wjButton = parentElement.tagName
			if(wjButton === 'wj-button'.toUpperCase()){
				const wjItem = parentElement.parentElement;
				const dataPos = wjItem.getAttribute('data-pos');
				const children =  wjItem.parentElement.children;
				//this.moveItemUp(children,dataPos);
			}
		}else{
			if(targetTagName === 'wj-button'.toUpperCase()){
				const wjItem = e.target.parentElement;
				const wjItemName = wjItem.tagName
				if(wjItemName === 'wj-item'.toUpperCase()){
					const dataPos = wjItem.getAttribute('data-pos');
					const children =  wjItem.parentElement.children;
					//this.moveItemUp(children,dataPos);
				}
			}
		}
	}
	moveItemUp(a) {
		console.log("moveItemUp:");
		/*
		pos = parseInt(pos);
		if(pos > 0) {
			
		}
		*/
	}
	itemFocus(e){
		console.log("update item focus:"+e.target.id);
		this.updateFocusInfo();
	}
	
	buttonFocus(e) {
		console.log("focus_button");
		
	}
	updateFocusInfo(pos){
		console.log("focus info updated");
		
	}
	itemDragStart(e) {
	//	e.preventDefault();
		console.log("item","drag_start_updated");
		const parentElement = e.target.parentElement.parentElement;
		parentElement.classList.add('__itemDrag');
		//parent.children is not an array. It is HTMLCollection
		//let items = parentElement.children; 
		[...parentElement.children].forEach((item) => {
			item.classList.remove('__itemDragover');
		});
const dataPos = e.target.getAttribute('data-pos');
console.log("dataPos:"+dataPos);
		// set currently dragged item
		this.keepItem=e.target;
		this.curDraggedEl = e.target;
		this.setAttribute("dragging", "");
		
		this.grabCoords = {x: 0, y: 0};
		// set mouse coords of grab
		this.grabCoords.x = e.layerX;
		this.grabCoords.y = e.layerY;

		// set drag data
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', dataPos);
	
        
    }
	itemDragEnd(e){
		console.log("item","drag_end");
		const parentElement = e.target.parentElement.parentElement;
		parentElement.classList.remove('__itemDrag');
		parentElement.classList.remove('__itemGrab');

		[...parentElement.children].forEach((item) => {
			item.classList.remove('__itemDragover');
		});
	}
	 itemDragEnter(e) {
		console.log("item","dragenter");
		 // get position of item dragged over
    let pos = parseInt(e.target.parentElement.dataset.pos)+1;

    // check that item isn't being dragged over itself
    if(pos !== this.curItem+1) {
        // add drag over styling
        e.target.parentElement.classList.add('__itemDragover');

        // set drag data
        e.dataTransfer.dropEffect = 'move';

        // feedback message
        //announceStatus(`Entered drag area for #${pos}, ${e.target.dataset.name}. Drop to swap positions.`);
    } else {
        // set drag data
        e.dataTransfer.dropEffect = 'none';
    }

	}
	itemDragLeave(e){
		console.log("item","dragleave");
		e.target.parentElement.classList.remove('__itemDragover');
		//we leaved source element
		//e.target.classList.remove('dragging');
	}
itemDragOver(e) {
    if (e.preventDefault) e.preventDefault();

    return false;
}
 itemDrop(e) {
    console.log("item","item_drop_start");

    // stop browser redirect
    e.preventDefault();
    e.stopPropagation();
	const dragging = document.querySelector("[dragging]");
	// remove drag styling
	console.log("item","drop:"+this.curDraggedEl);
	console.log("item","drop_2:"+this.keepIem);
	
	dragging.parentElement.classList.remove('__itemDrag');
	dragging.parentElement.classList.remove('__itemGrab');
	dragging.removeAttribute('dragging');
	//curDraggedEl.parentElement.classList = 'rankingsItem';
//https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
//var list = document.getElementsByClassName("events");

    // check that item was dropped on a different one
    if(dragging !== e.target) {
        // get #'s of items we're swapping
        let pos1 = parseInt(e.dataTransfer.getData('text/plain'));
        let pos2 = parseInt(e.target.getAttribute('data-pos'));
		console.log("item","checkPost_1");
        // update grab coordinates
        this.grabCoords.x = this.grabCoords.x - e.layerX;
        this.grabCoords.y = this.grabCoords.y - e.layerY;
		console.log("item","checkPost_2");
        // swap items
		const childen =  dragging.parentElement.children;
		console.log("dargging children:"+childen.length);
        this.swapItems(childen,pos1,pos2);

        // move focus to item
        childen[pos2].focus();
		console.log("item","checkPost_3");
        // do drop transition
       // transitionDropItem(pos2,grabCoords.x,grabCoords.y);

        // do slide transition
        //transitionSlideItem(pos1,pos2 - pos1,false,.35);

        // feedback message
        // item [pos1] moved to [pos2], item [pos2] moved to [pos1]
       // announceStatus(`Items ${pos1+1} and ${pos2+1} swapped: ${curName} moved to #${pos2+1}.`);
    }
  	console.log("item","item_drop_finish");
    // some browsers need this to prevent redirect
    return false;
}
 swapItems(children,pos1,pos2) {	
    // get items in question
    let item1 = children[pos1];
    let item2 = children[pos2];
	    
	let slot1=item1.querySelector('[slot="test"]')
	let slot2=item2.querySelector('[slot="test"]')
	item1.appendChild(slot2);
	item2.appendChild(slot1);
	
	
	
}
 transitionSlideItem(pos,dis,front=true,decay) {
    // vars
    let cls;
    // get item
    let item = items[pos];
    // get duration css var to use as setTimeout duration later
    let dur = parseFloat(getComputedStyle(item).getPropertyValue('--dur'))*1000 || 0;
    
    // var to keep track of rate of change
    let rate;

    // check if we're moving an item more than 1 row and if a decay number was passed in
    if(Math.abs(dis) > 1 && decay) {
        rate = 0;
        // loop through number of rows we're moving item and add a decay to the rate of change
        for(let i = 0; i < Math.abs(dis); i++) {
            rate += 1 - (i * decay);
        }
        // set duration to match rate
        dur *= rate;

    // if moving only one row
    } else {
        // set rate var to have no change
        rate = Math.abs(dis);
    }

    // determine if row should be in front or back and add relevant class
    if(front) {
        cls = '__slideFront';
    } else {
        cls = '__slideBack';
    }
    
    // set value of css vars so item knows which direction to move and how far
    item.style.setProperty('--dis',dis);
    item.style.setProperty('--abs',rate);

    // add class to kick off animationn
    item.classList.add(cls);

    // remove class after animation has finished so as to not affect future animations
    setTimeout(() => {
        item.classList.remove(cls);
    }, dur);
}

 transitionShakeItem(pos) {
    // get item
    let item = items[pos];
    
    // add class to kick off animation
    item.classList.add('__shake');

    // remove class after animation has finished
    setTimeout(() => {
        item.classList.remove('__shake');
    }, 400);
}

 transitionDropItem(pos,dropX=0,dropY=0) {
    // get item
    let item = items[pos];
    
    // update css vars so row will slide from dropped position
    item.style.setProperty('--dropX',-dropX);
    item.style.setProperty('--dropY',-dropY);
    
    // add class to kick off animation
    item.classList.add('__drop');
    
    // remove class after animation has finished
    setTimeout(() => {
        item.classList.remove('__drop');
    }, 300);
}
 afterDisconnect() {
      //  document.removeEventListener("photo-crop-after", this.photoCropAfter);
	  
		this.removeEventListener("dragstart", this.itemDragStart);
		this.removeEventListener('dragend',this.itemDragEnd);
		this.removeEventListener('dragenter', this.itemDragEnter);
		this.removeEventListener('dragleave', this.itemDragLeave);
		this.removeEventListener('dragover', this.itemDragOver);
		this.removeEventListener('drop', this.itemDrop);
		this.removeEventListener("slotchange", (event) => {console.log("slot_change")});
		
    }

}


customElements.get(Item.is) || window.customElements.define(Item.is, Item);